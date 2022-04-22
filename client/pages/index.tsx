import { ReactElement } from 'react'

import Head from 'next/head'
import tw from 'twin.macro'
import styled from 'styled-components'
import HomePageLayout from '../layout/Home'

const Home = () => {
  return <MainContainer>Hello</MainContainer>
}

Home.getLayout = function (page: ReactElement) {
  return <HomePageLayout>{page}</HomePageLayout>
}

const MainContainer = styled.div`
  ${tw`
  `}
`

export default Home
