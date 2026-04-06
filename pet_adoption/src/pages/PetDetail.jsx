import { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import { getPetById, applyForAdoption } from '../api/index'
import { useAuth } from '../context/AuthContext'

export default function PetDetail() {
    const { id } = useParams()
    const { user } = useAuth()
    const [pet, setPet] = useState(null)
    const [message, setMessage] = useState('')
    const [success, setSuccess] = useState('')
    const [error, setError] = useState('')
    const [loading, setLoading] = useState(true)

    useEffect(() => {
        const fetchPet = async () => {
            try {
                const { data } = await getPetById(id)
                setPet(data)
            } catch (err) {
                console.error(err)
            } finally {
                setLoading(false)
            }
        }
        fetchPet()
    }, [id])

    const handleApply = async () => {
        setError('')
        setSuccess('')
        try {
            await applyForAdoption({ petId: id, message })
            setSuccess('Application submitted successfully!')
            setMessage('')
        } catch (err) {
            setError(err.response?.data?.message || 'Failed to apply')
        }
    }

    if (loading) return <p className="text-center mt-20 text-gray-400">Loading...</p>
    if (!pet) return <p className="text-center mt-20 text-gray-400">Pet not found.</p>

    return (
        <div className="min-h-screen bg-orange-50 px-6 py-10">
            <div className="max-w-3xl mx-auto bg-white rounded-2xl shadow overflow-hidden">
                <img src={`http://localhost:5000${pet.image}`} alt={pet.name} className="w-full h-72 object-cover" />
                <div className="p-6">
                    <div className="flex justify-between items-center mb-2">
                        <h1 className="text-3xl font-bold text-gray-800">{pet.name}</h1>
                        <span className="bg-orange-100 text-orange-600 px-3 py-1 rounded-full text-sm">{pet.category}</span>
                    </div>
                    <p className="text-gray-500 mb-4">{pet.breed} · {pet.age} yrs · {pet.location}</p>
                    <p className="text-gray-600 mb-2">{pet.description}</p>
                    <p className="text-sm text-gray-400 mb-6">Listed by: {pet.owner?.name}</p>

                    {user?.role === 'adopter' && pet.status === 'available' && (
                        <div className="bg-orange-50 rounded-xl p-4">
                            <h2 className="font-semibold text-gray-700 mb-2">Send Adoption Request</h2>
                            {success && <p className="text-green-600 text-sm mb-2">{success}</p>}
                            {error && <p className="text-red-500 text-sm mb-2">{error}</p>}
                            <textarea rows={3} placeholder="Why do you want to adopt this pet?"
                                className="w-full border rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-orange-400"
                                value={message} onChange={e => setMessage(e.target.value)} />
                            <button onClick={handleApply}
                                className="mt-3 bg-orange-500 text-white px-6 py-2 rounded-xl hover:bg-orange-600 text-sm">
                                Apply to Adopt
                            </button>
                        </div>
                    )}

                    {pet.status !== 'available' && (
                        <p className="text-center text-gray-400 bg-gray-100 py-3 rounded-xl">
                            This pet is {pet.status}
                        </p>
                    )}
                </div>
            </div>
        </div>
    )
}