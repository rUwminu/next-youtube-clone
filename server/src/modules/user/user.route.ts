import express from 'express'
import { processRequestBody } from 'zod-express-middleware'

// Custom Middleware functions
import requireUser from '../../middleware/requireUser'

import { registerUserHandler } from './user.controller'
import { registerUserSchema } from './user.schema'

const router = express.Router()

router.get('/', requireUser, (req, res) => {
  return res.send(res.locals.user)
})

router.post(
  '/',
  processRequestBody(registerUserSchema.body), // <-- this will remove any extra field sended from body
  registerUserHandler
)

export default router
