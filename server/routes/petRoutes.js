import express from 'express'
import multer from 'multer'
import { getAllPets, getPetById, createPet, deletePet, getMyPets } from '../Controllers/petController.js'
import protect from '../Middleware/authMiddleware.js'

const router = express.Router()

const storage = multer.diskStorage({
    destination: (req, file, cb) => cb(null, 'uploads/'),
    filename: (req, file, cb) => cb(null, `${Date.now()}-${file.originalname}`)
})
const upload = multer({ storage })

router.get('/', getAllPets)
router.get('/my', protect, getMyPets)
router.get('/:id', getPetById)
router.post('/', protect, upload.single('image'), createPet)
router.delete('/:id', protect, deletePet)

export default router