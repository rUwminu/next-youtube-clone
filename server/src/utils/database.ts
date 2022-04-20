import mongoose from 'mongoose'
import logger from './logger'

const DB_CONNECTION_STRING =
  process.env.DB_CONNECTION_STRING || 'mongodb://localhost:27017/youtube-db'

export async function connectToDatabase() {
  try {
    await mongoose.connect(DB_CONNECTION_STRING)
    logger.info('Connect to MongoDB')
  } catch (err) {
    logger.error(err, 'Failed to connect to MongoDB')
    process.exit(1)
  }
}

export async function disconnectFromDatabase() {
  await mongoose.connection.close()

  logger.info('Disconnect from MongoDB')

  return
}
