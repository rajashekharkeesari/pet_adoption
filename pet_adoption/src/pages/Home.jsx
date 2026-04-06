import { useState, useEffect } from 'react'
import PetCard from '../components/PetCard'
import FilterSidebar from '../components/Filter_sidebar'
import { useAuth } from '../context/AuthContext'
import axios from 'axios'

const DEMO_PETS = [
    { _id: '1', name: 'Bruno', breed: 'Labrador', age: 2, category: 'dog', location: 'Hyderabad', image: 'https://placedog.net/400/300?id=1' },
    { _id: '2', name: 'Milo', breed: 'Persian', age: 1, category: 'cat', location: 'Bangalore', image: 'https://placedog.net/400/300?id=2' },
    { _id: '3', name: 'Charlie', breed: 'Beagle', age: 3, category: 'dog', location: 'Chennai', image: 'https://placedog.net/400/300?id=3' },
    { _id: '4', name: 'Tweety', breed: 'Canary', age: 1, category: 'bird', location: 'Pune', image: 'https://placedog.net/400/300?id=4' },
]

export default function Home() {
    const { user } = useAuth()

    const [pets, setPets] = useState(DEMO_PETS)   // ← DEMO_PETS as initial value
    const [search, setSearch] = useState('')
    const [filters, setFilters] = useState({ category: '', age: '', location: '' })
    const [loading, setLoading] = useState(true)
    const [error, setError] = useState('')

    useEffect(() => {
        const fetchPets = async () => {
            try {
                setLoading(true)
                const params = {}
                if (filters.category) params.category = filters.category
                if (filters.age) params.age = filters.age
                if (filters.location) params.location = filters.location

                const { data } = await axios.get('http://localhost:5000/api/pets', { params })
                setPets(data.length > 0 ? data : DEMO_PETS)  // ← use DEMO_PETS if backend empty
            } catch (err) {
                console.error(err)
                setPets(DEMO_PETS)   // ← fallback to DEMO_PETS if backend is offline
            } finally {
                setLoading(false)
            }
        }
        fetchPets()
    }, [filters])

    const filtered = pets.filter(pet => {
        const matchSearch = pet.name.toLowerCase().includes(search.toLowerCase())
        const matchCategory = filters.category ? pet.category === filters.category : true
        const matchAge = filters.age ? pet.age <= Number(filters.age) : true
        const matchLocation = filters.location ? pet.location.toLowerCase().includes(filters.location.toLowerCase()) : true
        return matchSearch && matchCategory && matchAge && matchLocation
    })

    return (
        <div className="min-h-screen bg-orange-50 px-6 py-8 ">

            <div className="text-center mb-8">
                <h1 className="text-4xl font-bold text-gray-800">Find Your Perfect Pet 🐾</h1>
                <p className="text-gray-500 mt-2">Give a loving home to a pet that needs one</p>
                <input
                    type="text"
                    placeholder="Search by name..."
                    className="mt-4 w-full max-w-md px-4 py-2 rounded-full border shadow-sm focus:outline-none focus:ring-2 focus:ring-orange-400"
                    value={search}
                    onChange={e => setSearch(e.target.value)}
                />
            </div>

            <div className="flex gap-6 max-w-6xl mx-auto flex-col sm:flex-row ">
                <FilterSidebar filters={filters} setFilters={setFilters} />
                <div className="flex-1 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                    {loading
                        ? <p className="text-gray-400 col-span-3 text-center mt-10">Loading pets...</p>
                        : filtered.length > 0
                            ? filtered.map(pet => <PetCard key={pet._id} pet={pet} />)
                            : <p className="text-gray-400 col-span-3 text-center mt-10">No pets found.</p>
                    }
                </div>
            </div>
        </div>
    )
}