import React from 'react'
import { AxiosError } from 'axios'
import { useForm } from '@mantine/hooks'
import { registerUser } from '../../api'
import { useMutation } from 'react-query'
import Head from 'next/head'
import {
  Button,
  Container,
  Paper,
  PasswordInput,
  Stack,
  TextInput,
  Title,
} from '@mantine/core'
import { showNotification, updateNotification } from '@mantine/notifications'
import { useRouter } from 'next/router'

const RegisterPage: React.FC = () => {
  const router = useRouter()

  const form = useForm({
    initialValues: {
      email: '',
      username: '',
      password: '',
      confirmPassword: '',
    },
  })

  const mutation = useMutation<
    string,
    AxiosError,
    Parameters<typeof registerUser>[0]
  >(registerUser, {
    onMutate: () => {
      showNotification({
        id: 'register',
        title: 'Creating Account',
        message: 'Please wait...',
        loading: true,
      })
    },
    onSuccess: () => {
      updateNotification({
        id: 'register',
        title: 'Success',
        message: 'Successfully create account!',
        loading: false,
      })

      router.push('/auth/login')
    },
    onError: () => {
      updateNotification({
        id: 'register',
        title: 'Error',
        message: `Ops! There Error!`,
        loading: false,
      })
    },
  })

  return (
    <>
      <Head>
        <title>Regidter User</title>
      </Head>
      <Container>
        <Title>Register</Title>
        <Paper withBorder shadow='md' p={30} mt={30} radius='md'>
          <form onSubmit={form.onSubmit((value) => mutation.mutate(value))}>
            <Stack>
              <TextInput
                label='Email'
                placeholder='john@example.com'
                required
                {...form.getInputProps('email')}
              />
              <TextInput
                label='Username'
                placeholder='John Doe'
                required
                {...form.getInputProps('username')}
              />
              <PasswordInput
                label='Password'
                placeholder='Atleast 6 Charater'
                {...form.getInputProps('password')}
              />
              <PasswordInput
                label='Confirm Password'
                placeholder='Atleast 6 Charater'
                {...form.getInputProps('confirmPassword')}
              />
              <Button type='submit'>Register</Button>
            </Stack>
          </form>
        </Paper>
      </Container>
    </>
  )
}

export default RegisterPage
