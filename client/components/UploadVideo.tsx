import React, { useState } from 'react'
import { Button, Group, Modal, Text } from '@mantine/core'
import { Dropzone, MIME_TYPES } from '@mantine/dropzone'

// Icons
import { ArrowBigUpLine } from 'tabler-icons-react'

const UploadVideo: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false)

  return (
    <>
      <Modal
        title='Upload Video'
        size='xl'
        opened={isOpen}
        closeOnClickOutside={true}
        onClose={() => setIsOpen(false)}
      >
        <Dropzone
          onDrop={(file) => {}}
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
      </Modal>
      <Button onClick={() => setIsOpen(true)}>Upload Video</Button>
    </>
  )
}

export default UploadVideo
