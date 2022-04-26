import React, { Dispatch, SetStateAction, useState } from 'react'
import { useForm } from '@mantine/hooks'
import { Dropzone, MIME_TYPES } from '@mantine/dropzone'
import {
  Button,
  Group,
  Modal,
  Progress,
  Stack,
  Switch,
  Text,
  TextInput,
} from '@mantine/core'
import { useMutation } from 'react-query'
import { AxiosError, AxiosResponse } from 'axios'
import { uploadVideo, updateVideo } from '../api'

// Context Action
import { useVideo } from '../context/VideoContext'

// Types
import { Video } from '../types'

// Icons
import { ArrowBigUpLine } from 'tabler-icons-react'

const EditVideoForm = ({
  videoId,
  setIsOpen,
}: {
  videoId: string
  setIsOpen: Dispatch<SetStateAction<boolean>>
}) => {
  const { refetch } = useVideo()

  const form = useForm({
    initialValues: {
      title: '',
      description: '',
      published: true,
    },
  })

  const mutation = useMutation<
    AxiosResponse<Video>,
    AxiosError,
    Parameters<typeof updateVideo>['0']
  >(updateVideo, {
    onSuccess: () => {
      setIsOpen(false)
      refetch()
    },
  })

  return (
    <form
      onSubmit={form.onSubmit((value) => {
        mutation.mutate({ videoId, ...value })
      })}
    >
      <Stack>
        <TextInput
          label='Ttile'
          placeholder='Title of the video'
          required
          {...form.getInputProps('title')}
        />
        <TextInput
          label='Description'
          placeholder='Title of the video'
          required
          {...form.getInputProps('description')}
        />

        <Switch label='Publiched' {...form.getInputProps('published')} />

        <Button type='submit'>Save</Button>
      </Stack>
    </form>
  )
}

const UploadVideo: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false)
  const [progress, setProgress] = useState(0)

  const mutation = useMutation(uploadVideo)

  const config = {
    onUploadProgress: (progressEvent: any) => {
      const percent =
        Math.round(progressEvent.loaded * 100) / progressEvent.total

      setProgress(percent)
    },
  }

  function upload(file: File[]) {
    const formData = new FormData()

    formData.append('video', file[0])

    mutation.mutate({ formData, config })
  }

  return (
    <>
      <Modal
        title='Upload Video'
        size='xl'
        opened={isOpen}
        closeOnClickOutside={true}
        onClose={() => setIsOpen(false)}
      >
        {progress === 0 && (
          <Dropzone
            onDrop={(file) => {
              upload(file)
            }}
            accept={[MIME_TYPES.mp4]}
            multiple={false}
          >
            {(status) => {
              return (
                <Group
                  position='center'
                  spacing='xl'
                  style={{
                    minHeight: '50vh',
                    justifyContent: 'center',
                  }}
                  direction='column'
                >
                  <ArrowBigUpLine />
                  <Text>Drag video here or click to find</Text>
                </Group>
              )
            }}
          </Dropzone>
        )}

        {progress > 0 && (
          <Progress size='xl' label={`${progress}%`} value={progress} mb='xl' />
        )}

        {mutation.data && (
          <EditVideoForm
            videoId={mutation.data.videoId}
            setIsOpen={setIsOpen}
          />
        )}
      </Modal>
      <Button onClick={() => setIsOpen(true)}>Upload Video</Button>
    </>
  )
}

export default UploadVideo
