export enum QueryKeys {
  ME = 'ME',
  VIDEOS = 'VIDEOS',
}

export interface Me {
  _id: string
  email: string
  username: string
}
