import React from 'react'
import { AxiosError } from 'axios'
import { useForm } from '@mantine/hooks'
import { loginUser } from '../../api'
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

const LoginPage: React.FC = () => {
  const router = useRouter()

  const form = useForm({
    initialValues: {
      email: '',
      password: '',
    },
  })

  const mutation = useMutation<
    string,
    AxiosError,
    Parameters<typeof loginUser>[0]
  >(loginUser, {
    onMutate: () => {
      showNotification({
        id: 'login',
        title: 'Login Account',
        message: 'Please wait...',
        loading: true,
      })
    },
    onSuccess: () => {
      router.push('/')
      updateNotification({
        id: 'login',
        title: 'Success',
        message: `Welcome back!`,
        loading: false,
      })
    },
    onError: (err) => {
      updateNotification({
        id: 'login',
        title: 'Error',
        message: `Ops! There Error!`,
        loading: false,
      })
    },
  })

  return (
    <>
      <Head>
        <title>Login User</title>
      </Head>
      <Container>
        <Title>Login</Title>
        <Paper withBorder shadow='md' p={30} mt={30} radius='md'>
          <form onSubmit={form.onSubmit((value) => mutation.mutate(value))}>
            <Stack>
              <TextInput
                label='Email'
                placeholder='john@example.com'
                required
                {...form.getInputProps('email')}
              />
              <PasswordInput
                label='Password'
                placeholder='Atleast 6 Charater'
                {...form.getInputProps('password')}
              />
              <Button type='submit'>Login</Button>
            </Stack>
          </form>
        </Paper>
      </Container>
    </>
  )
}

export default LoginPage
