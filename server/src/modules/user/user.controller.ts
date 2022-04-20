import { Request, Response } from 'express'
import { StatusCodes } from 'http-status-codes'

// User Model Schema
import { RegisterUserBody } from './user.schema'

// Database interact action
import { createUser } from './user.service'

export async function registerUserHandler(
  req: Request<{}, {}, RegisterUserBody>,
  res: Response
) {
  const { username, email, password } = req.body

  try {
    await createUser({ username, email, password })

    return res.status(StatusCodes.CREATED).send('User created successfully')
  } catch (err) {
    if (err.code === 11000) {
      return res.status(StatusCodes.CONFLICT).send('User already exists')
    }

    return res.status(StatusCodes.INTERNAL_SERVER_ERROR).send(err.message)
  }
}
