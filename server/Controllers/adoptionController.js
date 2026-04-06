import AdoptionRequest from '../Models/AdoptionRequest.js'
import Pet from '../Models/Pet.js'

// POST /api/adoptions
export const applyForAdoption = async (req, res) => {
    try {
        const { petId, message } = req.body

        const pet = await Pet.findById(petId)
        if (!pet) return res.status(404).json({ message: 'Pet not found' })
        if (pet.status !== 'available')
            return res.status(400).json({ message: 'Pet is not available' })

        const existing = await AdoptionRequest.findOne({ pet: petId, applicant: req.user._id })
        if (existing) return res.status(400).json({ message: 'Already applied for this pet' })

        const request = await AdoptionRequest.create({
            pet: petId,
            applicant: req.user._id,
            message
        })

        // set pet status to pending
        pet.status = 'pending'
        await pet.save()

        res.status(201).json(request)
    } catch (error) {
        res.status(500).json({ message: error.message })
    }
}

// GET /api/adoptions/my — adopter sees their applications
export const getMyApplications = async (req, res) => {
    try {
        const requests = await AdoptionRequest.find({ applicant: req.user._id })
            .populate('pet', 'name breed category image')
        res.json(requests)
    } catch (error) {
        res.status(500).json({ message: error.message })
    }
}

// GET /api/adoptions/owner — owner sees requests on their pets
export const getRequestsForOwner = async (req, res) => {
    try {
        const myPets = await Pet.find({ owner: req.user._id }).select('_id')
        const petIds = myPets.map(p => p._id)

        const requests = await AdoptionRequest.find({ pet: { $in: petIds } })
            .populate('pet', 'name breed')
            .populate('applicant', 'name email')
        res.json(requests)
    } catch (error) {
        res.status(500).json({ message: error.message })
    }
}

// PUT /api/adoptions/:id — owner approves or rejects
export const updateRequestStatus = async (req, res) => {
    try {
        const { status } = req.body
        const request = await AdoptionRequest.findById(req.params.id).populate('pet')

        if (!request) return res.status(404).json({ message: 'Request not found' })

        if (request.pet.owner.toString() !== req.user._id.toString())
            return res.status(403).json({ message: 'Not authorized' })

        request.status = status
        await request.save()

        if (status === 'approved') {
            request.pet.status = 'adopted'
            await request.pet.save()
        }

        res.json(request)
    } catch (error) {
        res.status(500).json({ message: error.message })
    }
}