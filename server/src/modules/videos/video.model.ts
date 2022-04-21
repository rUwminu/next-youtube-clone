import { getModelForClass, prop as Prop, Ref } from '@typegoose/typegoose'
import { customAlphabet } from 'nanoid'
import { User } from '../user/user.model'

const nanoid = customAlphabet('1234567890abcdefghijklnmopqrstuvwxyz', 10)

export class Video {
  @Prop()
  public title: string

  @Prop()
  public description: string

  @Prop({ enum: ['mp4'] })
  public extension: string

  @Prop({ required: true, ref: () => User })
  public owner: Ref<User>

  @Prop({ unique: true, default: () => nanoid() })
  public videoId: string

  @Prop({ default: false })
  public published: boolean
}

export const VideoModel = getModelForClass(Video, {
  schemaOptions: { timestamps: true },
})
