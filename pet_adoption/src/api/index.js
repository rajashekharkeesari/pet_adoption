import axios from 'axios'

const API = axios.create({
    baseURL: 'http://localhost:5000/api'
})

// Automatically attach token to every request
API.interceptors.request.use((config) => {
    const user = JSON.parse(localStorage.getItem('user'))
    if (user?.token) {
        config.headers.Authorization = `Bearer ${user.token}`
    }
    return config
})

// Auth
export const registerUser = (data) => API.post('/auth/register', data)
export const loginUser = (data) => API.post('/auth/login', data)
export const getMe = () => API.get('/auth/me')

// Pets
export const getAllPets = (filters) => API.get('/pets', { params: filters })
export const getPetById = (id) => API.get(`/pets/${id}`)
export const createPet = (data) => API.post('/pets', data)
export const deletePet = (id) => API.delete(`/pets/${id}`)
export const getMyPets = () => API.get('/pets/my')

// Adoptions
export const applyForAdoption = (data) => API.post('/adoptions', data)
export const getMyApplications = () => API.get('/adoptions/my')
export const getRequestsForOwner = () => API.get('/adoptions/owner')
export const updateRequestStatus = (id, status) => API.put(`/adoptions/${id}`, { status })