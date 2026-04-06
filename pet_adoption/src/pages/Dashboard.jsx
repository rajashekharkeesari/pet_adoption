import { useEffect, useState } from 'react'
import { getMyPets, deletePet } from '../api/index'

export default function Dashboard() {
    const [pets, setPets] = useState([])
    const [loading, setLoading] = useState(true)

    useEffect(() => {
        const fetchPets = async () => {
            try {
                const { data } = await getMyPets()
                setPets(data)
            } catch (err) {
                console.error(err)
            } finally {
                setLoading(false)
            }
        }
        fetchPets()
    }, [])

    const handleRemove = async (id) => {
        try {
            await deletePet(id)
            setPets(pets.filter(pet => pet._id !== id))
        } catch (err) {
            console.error(err)
        }
    }

    if (loading) return <p className="text-center mt-20 text-gray-400">Loading...</p>

    return (
        <div className="min-h-screen bg-orange-50 px-6 py-10">
            <div className="max-w-4xl mx-auto">
                <h1 className="text-2xl font-bold text-gray-800 mb-6">My Listed Pets</h1>
                {pets.length === 0
                    ? <p className="text-gray-400 text-center mt-10">No pets listed yet.</p>
                    : <div className="grid gap-4">
                        {pets.map(pet => (
                            <div key={pet._id} className="bg-white rounded-2xl shadow px-6 py-4 flex justify-between items-center">
                                <div>
                                    <h3 className="font-semibold text-gray-800">{pet.name}</h3>
                                    <p className="text-sm text-gray-500">{pet.breed} · {pet.category}</p>
                                </div>
                                <div className="flex items-center gap-4">
                                    <span className={`text-xs px-3 py-1 rounded-full font-medium ${pet.status === 'available' ? 'bg-green-100 text-green-600' : 'bg-yellow-100 text-yellow-600'}`}>
                                        {pet.status}
                                    </span>
                                    <button onClick={() => handleRemove(pet._id)} className="text-sm text-red-400 hover:text-red-600">
                                        Remove
                                    </button>
                                </div>
                            </div>
                        ))}
                    </div>
                }
            </div>
        </div>
    )
}