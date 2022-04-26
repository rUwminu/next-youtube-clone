import { createContext, ReactNode, useContext } from 'react'
import { RefetchOptions, RefetchQueryFilters, useQuery } from 'react-query'
import { getVideos } from '../api'
import { QueryKeys, Video } from '../types'
import { Loader } from '@mantine/core'

const VideoContext = createContext<{
  videos: Video[]
  refetch: <TPageData>(
    options?: (RefetchOptions & RefetchQueryFilters<TPageData>) | undefined
  ) => any
  // @ts-ignore
}>(null)

function VideoContextProvider({ children }: { children: ReactNode }) {
  const { data, isLoading, refetch } = useQuery(QueryKeys.VIDEOS, getVideos)

  return (
    <VideoContext.Provider value={{ videos: data, refetch }}>
      {isLoading ? <Loader /> : children}
    </VideoContext.Provider>
  )
}

const useVideo = () => useContext(VideoContext)

export { VideoContextProvider, useVideo }
