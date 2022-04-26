import busboy from 'busboy'
import fs from 'fs'
import { Request, Response } from 'express'
import { StatusCodes } from 'http-status-codes'

// Model
import { Video } from './video.model'
import { UpdateVideoBody, UpdateVideoParams } from './video.schema'

// Db Action
import { createVideo, findVideo, findVideos } from './video.service'

const VIDEO_TYPE = ['video/mp4']

const CHUNK_SIZE_IN_BYTES = 1000000 // <-- 1MB

// Utils for video path
function getPath({
  videoId,
  extension,
}: {
  videoId: Video['videoId']
  extension: Video['extension']
}) {
  return `${process.cwd()}/video/${videoId}.${extension}`
}

export async function uploadVideoHandler(req: Request, res: Response) {
  const bb = busboy({ headers: req.headers })

  const user = res.locals.user

  const video = await createVideo({ owner: user._id })

  bb.on('file', async (_, file, info) => {
    if (!VIDEO_TYPE.includes(info.mimeType)) {
      return res.status(StatusCodes.BAD_REQUEST).send('Invalid file type')
    }

    const extension = info.mimeType.split('/')[1]

    const filePath = getPath({ videoId: video.videoId, extension })

    video.extension = extension

    await video.save()

    const stream = fs.createWriteStream(filePath)

    file.pipe(stream)
  })

  bb.on('close', () => {
    res.writeHead(StatusCodes.CREATED, {
      connection: 'close',
      'Content-Type': 'application/json',
    })

    res.write(JSON.stringify(video))
    res.end()
  })

  return req.pipe(bb)
}

export async function updateVideoHandler(
  req: Request<UpdateVideoParams, {}, UpdateVideoBody>,
  res: Response
) {
  const { videoId } = req.params
  const { title, description, published } = req.body

  const { _id: userId } = res.locals.user

  const video = await findVideo(videoId)

  if (!video) {
    return res.status(StatusCodes.NOT_FOUND).send('Video Not Found')
  }

  if (String(video.owner) !== String(userId)) {
    return res.status(StatusCodes.UNAUTHORIZED).send('Unauthorize')
  }

  video.title = title
  video.description = description
  video.published = published

  await video.save()

  return res.status(StatusCodes.OK).send(video)
}

export async function findAllVideosHandler(_: Request, res: Response) {
  const videos = await findVideos()
  return res.status(StatusCodes.OK).send(videos)
}

export async function steamVideoHandler(req: Request, res: Response) {
  const { videoId } = req.params

  const range = req.headers.range

  if (!range) {
    return res.status(StatusCodes.BAD_REQUEST).send('Range not provided')
  }

  const video = await findVideo(videoId)

  if (!video) {
    return res.status(StatusCodes.NOT_FOUND).send('Video not found')
  }

  const filePath = getPath({
    videoId: video.videoId,
    extension: video.extension,
  })

  const fileSizeInBytes = fs.statSync(filePath).size

  const chunkStart = Number(range.replace(/\D/g, ''))

  const chunkEnd = Math.min(
    chunkStart + CHUNK_SIZE_IN_BYTES,
    fileSizeInBytes - 1
  )

  const contentLength = chunkEnd - chunkStart + 1

  const headers = {
    'Content-Range': `bytes ${chunkStart}-${chunkEnd}/${fileSizeInBytes}`,
    'Accept-Ranges': 'bytes',
    'Content-length': contentLength,
    'Content-type': `video/${video.extension}`,
    'Cross-Origin-Resource-Policy': 'cross-origin',
  }

  res.writeHead(StatusCodes.PARTIAL_CONTENT, headers)

  const videoStream = fs.createReadStream(filePath, {
    start: chunkStart,
    end: chunkEnd,
  })

  videoStream.pipe(res)
}
