export enum QueryKeys {
  ME = 'ME',
  VIDEOS = 'VIDEOS',
}

export interface Me {
  _id: string
  email: string
  username: string
}

export interface Video {
  _id: string
  title: string
  description: string
  published: boolean
  owner: string
  videoId: string
  extension: string
  createdAt: Date
  updatedAt: Date
  __v: number
}
