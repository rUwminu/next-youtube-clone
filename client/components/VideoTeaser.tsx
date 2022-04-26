import Link from 'next/link'
import React from 'react'
import { Card, Text } from '@mantine/core'

// Types
import { Video } from '../types'

const VideoTeaser = ({ video }: { video: Video }) => {
  return (
    <Link href={`/watch/${video.videoId}`} passHref>
      <Card shadow='sm' p='xl' component='a' href={`/watch/${video.videoId}`}>
        <Text weight={500} size='lg'>
          {video.title}
        </Text>
        <Text>{video.description}</Text>
      </Card>
    </Link>
  )
}

export default VideoTeaser
