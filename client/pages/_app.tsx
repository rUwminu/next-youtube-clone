import { ReactElement, ReactNode } from 'react'

import '../styles/globals.css'
import Head from 'next/head'
import { NextPage } from 'next'
import type { AppProps } from 'next/app'
import { MantineProvider } from '@mantine/core'
import { NotificationsProvider } from '@mantine/notifications'
import { QueryClient, QueryClientProvider } from 'react-query'
import { MeContextProvided } from '../context/MeContext'

const queryClient = new QueryClient()

type NextPageWithLayout = NextPage & {
  getLayout?: (page: ReactElement) => ReactNode
}

type AppPropsWithLayout = AppProps & {
  Component: NextPageWithLayout
}

function MyApp({ Component, pageProps }: AppPropsWithLayout) {
  const getLayout = Component.getLayout || ((page) => page)

  return (
    <>
      <Head>
        <title>Youtube Clone</title>
        <meta
          name='viewport'
          content='minimum-scale-1, initial-scale-1, width=device-width'
        />
      </Head>
      <MantineProvider
        withGlobalStyles
        withNormalizeCSS
        theme={{ colorScheme: 'light' }}
      >
        <NotificationsProvider>
          <QueryClientProvider client={queryClient}>
            <MeContextProvided>
              {getLayout(
                <main>
                  <Component {...pageProps} />
                </main>
              )}
            </MeContextProvided>
          </QueryClientProvider>
        </NotificationsProvider>
      </MantineProvider>
    </>
  )
}

export default MyApp
