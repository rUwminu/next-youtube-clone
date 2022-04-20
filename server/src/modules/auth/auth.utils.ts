import jwt from 'jsonwebtoken'

const JWT_SERCET = process.env.JWT_SERCET || 'Some Secret'
const EXPIRES_IN = process.env.EXPIRES_IN || '10d'

export function signJwt(payload: string | Buffer | object) {
  return jwt.sign(payload, JWT_SERCET, {
    expiresIn: EXPIRES_IN,
  })
}

export function verifyJwt(token: string) {
  try {
    const decoded = jwt.verify(token, JWT_SERCET)
    return decoded
  } catch (err) {
    return null
  }
}
