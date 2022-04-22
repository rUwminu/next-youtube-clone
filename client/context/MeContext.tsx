import React, { createContext, ReactNode, useContext } from 'react'
import {
  QueryObserverResult,
  RefetchOptions,
  RefetchQueryFilters,
  useQuery,
} from 'react-query'
import { Loader } from '@mantine/core'

import { getMe } from '../api'
import { Me, QueryKeys } from '../types'

const MeContext = createContext<{
  user: Me
  refetch: <TPageData>(
    options?: (RefetchOptions & RefetchQueryFilters<TPageData>) | undefined
  ) => any
  // @ts-ignore
}>(null)

const MeContextProvided = ({ children }: { children: ReactNode }) => {
  const { data, isLoading, refetch } = useQuery(QueryKeys.ME, getMe)

  return (
    <MeContext.Provider value={{ user: data, refetch }}>
      {isLoading ? <Loader /> : children}
    </MeContext.Provider>
  )
}

const useMe = () => useContext(MeContext)

export { MeContextProvided, useMe }
