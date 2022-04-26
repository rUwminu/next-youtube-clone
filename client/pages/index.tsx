import { ReactElement } from 'react'
import Head from 'next/head'
import tw from 'twin.macro'
import styled from 'styled-components'
import HomePageLayout from '../layout/Home'
import { useVideo } from '../context/VideoContext'
import VideoTeaser from '../components/VideoTeaser'

const Home = () => {
  const { videos } = useVideo()

  return (
    <MainContainer>
      {videos &&
        (videos || []).map((video) => (
          <VideoTeaser key={video.videoId} video={video} />
        ))}
    </MainContainer>
  )
}

Home.getLayout = function (page: ReactElement) {
  return <HomePageLayout>{page}</HomePageLayout>
}

const MainContainer = styled.div`
  ${tw`
    grid
    gap-3
    grid-cols-1
    sm:grid-cols-2
    md:grid-cols-3
    lg:grid-cols-4
  `}
`

export default Home
