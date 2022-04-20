import { Request, Response } from 'express'
import { StatusCodes } from 'http-status-codes'

// Auth Model Schema
import { LoginBody } from './auth.schema'

// Helper functions
import { omit } from '../../helpers/omit'

// Database Action
import { findUserByEmail } from '../user/user.service'

// Utils Jwt function
import { signJwt } from './auth.utils'

export async function loginHandler(
  req: Request<{}, {}, LoginBody>,
  res: Response
) {
  const { email, password } = req.body

  const user = await findUserByEmail(email)

  if (!user || !user.comparePassword(password)) {
    return res
      .status(StatusCodes.UNAUTHORIZED)
      .send('Invalid email or password')
  }

  const payload = omit(user.toJSON(), ['password', '__v'])

  const token = signJwt(payload)

  res.cookie('accessToken', token, {
    maxAge: 3.154e10, // 1 year to expire
    httpOnly: true,
    domain: 'localhost', // Change to client domain https://youtube
    path: '/',
    sameSite: true, // Change to
    secure: false,
  })

  res.status(StatusCodes.OK).send(token)
}
