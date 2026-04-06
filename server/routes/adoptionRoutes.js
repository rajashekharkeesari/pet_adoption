import express from 'express'
import { applyForAdoption, getMyApplications, getRequestsForOwner, updateRequestStatus } from '../Controllers/adoptionController.js'
import protect from '../Middleware/authMiddleware.js'

const router = express.Router()

router.post('/', protect, applyForAdoption)
router.get('/my', protect, getMyApplications)
router.get('/owner', protect, getRequestsForOwner)
router.put('/:id', protect, updateRequestStatus)

export default router