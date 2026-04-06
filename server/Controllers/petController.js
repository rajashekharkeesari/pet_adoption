import Pet from '../Models/Pet.js'

// GET /api/pets
export const getAllPets = async (req, res) => {
    try {
        const { category, location, age } = req.query
        const filter = { status: 'available' }

        if (category) filter.category = category
        if (location) filter.location = new RegExp(location, 'i')
        if (age) filter.age = { $lte: Number(age) }

        const pets = await Pet.find(filter).populate('owner', 'name email')
        res.json(pets)
    } catch (error) {
        res.status(500).json({ message: error.message })
    }
}

// GET /api/pets/:id
export const getPetById = async (req, res) => {
    try {
        const pet = await Pet.findById(req.params.id).populate('owner', 'name email')
        if (!pet) return res.status(404).json({ message: 'Pet not found' })
        res.json(pet)
    } catch (error) {
        res.status(500).json({ message: error.message })
    }
}

// POST /api/pets
export const createPet = async (req, res) => {
    try {
        const { name, breed, age, category, location, description } = req.body
        const image = req.file ? `/uploads/${req.file.filename}` : ''

        const pet = await Pet.create({
            name, breed, age, category, location, description,
            image,
            owner: req.user._id
        })
        res.status(201).json(pet)
    } catch (error) {
        res.status(500).json({ message: error.message })
    }
}

// DELETE /api/pets/:id
export const deletePet = async (req, res) => {
    try {
        const pet = await Pet.findById(req.params.id)
        if (!pet) return res.status(404).json({ message: 'Pet not found' })

        if (pet.owner.toString() !== req.user._id.toString())
            return res.status(403).json({ message: 'Not authorized' })

        await pet.deleteOne()
        res.json({ message: 'Pet removed' })
    } catch (error) {
        res.status(500).json({ message: error.message })
    }
}

// GET /api/pets/my — owner's own listings
export const getMyPets = async (req, res) => {
    try {
        const pets = await Pet.find({ owner: req.user._id })
        res.json(pets)
    } catch (error) {
        res.status(500).json({ message: error.message })
    }
}