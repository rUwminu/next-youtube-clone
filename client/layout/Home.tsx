import React from 'react'
import { AppShell, Navbar, Header, Box, Text, Anchor } from '@mantine/core'
import { useMe } from '../context/MeContext'
import Link from 'next/link'

// Components
import UploadVideo from '../components/UploadVideo'

const HomePageLayout = ({ children }: { children: React.ReactNode }) => {
  const { user, refetch } = useMe()

  return (
    <AppShell
      padding='md'
      navbar={
        <Navbar width={{ base: 300 }} height={500} p='xs'>
          Side Items
        </Navbar>
      }
      header={
        <Header height={60} p='xs'>
          <Box sx={() => ({ display: 'flex' })}>
            <Box sx={() => ({ flex: '1' })}>
              <Text size='xl' weight={500}>
                Youtube Clone
              </Text>
            </Box>
            <Box>
              {!user && (
                <>
                  <Link href='/auth/login' passHref>
                    <Anchor>Login</Anchor>
                  </Link>
                  <Link href='/auth/register' passHref>
                    <Anchor>Register</Anchor>
                  </Link>
                </>
              )}

              {user && <UploadVideo />}
            </Box>
          </Box>
        </Header>
      }
    >
      {children}
    </AppShell>
  )
}

export default HomePageLayout
