import express from 'express'
import requireUser from '../../middleware/requireUser'
import {
  updateVideoHandler,
  uploadVideoHandler,
  findAllVideosHandler,
  steamVideoHandler,
} from './video.controller'

const router = express.Router()

router.get('/', findAllVideosHandler)
router.get('/:videoId', steamVideoHandler)
router.post('/', requireUser, uploadVideoHandler)
router.patch('/:videoId', requireUser, updateVideoHandler)

export default router
