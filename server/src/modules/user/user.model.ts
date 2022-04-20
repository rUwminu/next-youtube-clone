import argon2 from 'argon2'
import {
  getModelForClass,
  prop as Prop,
  pre as Pre,
} from '@typegoose/typegoose'

@Pre<User>('save', async function (next) {
  if (this.isModified('password') || this.isNew) {
    const hash = await argon2.hash(this.password)

    this.password = hash

    return next()
  }
})
export class User {
  @Prop({ required: true, unique: true })
  public username: string

  @Prop({ required: true, unique: true })
  public email: string

  @Prop({ required: true })
  public password: string

  public async comparePassword(password: string): Promise<boolean> {
    return await argon2.verify(this.password, password) // <--- this will compare user login password with password store in db
  }
}

export const UserModel = getModelForClass(User, {
  schemaOptions: { timestamps: true },
})
