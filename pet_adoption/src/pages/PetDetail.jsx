import { useParams } from 'react-router-dom'

const DEMO_PETS = [
    { _id: '1', name: 'Bruno', breed: 'Labrador', age: 2, category: 'dog', location: 'Hyderabad', description: 'Bruno is a friendly and energetic Labrador who loves to play fetch and cuddle.', image: 'https://placedog.net/600/400?id=1' },
]

export default function PetDetail() {
    const { id } = useParams()
    const pet = DEMO_PETS.find(p => p._id === id)

    if (!pet) return <p className="text-center mt-20 text-gray-400">Pet not found.</p>

    return (
        <div className="min-h-screen bg-orange-50 px-6 py-10">
            <div className="max-w-3xl mx-auto bg-white rounded-2xl shadow overflow-hidden">
                <img src={pet.image} alt={pet.name} className="w-full h-72 object-cover" />
                <div className="p-6">
                    <div className="flex justify-between items-center mb-2">
                        <h1 className="text-3xl font-bold text-gray-800">{pet.name}</h1>
                        <span className="bg-orange-100 text-orange-600 px-3 py-1 rounded-full text-sm">{pet.category}</span>
                    </div>
                    <p className="text-gray-500 mb-4">{pet.breed} · {pet.age} yrs · {pet.location}</p>
                    <p className="text-gray-600 mb-6">{pet.description}</p>

                    <div className="bg-orange-50 rounded-xl p-4 mb-6">
                        <h2 className="font-semibold text-gray-700 mb-2">Send Adoption Request</h2>
                        <textarea
                            rows={3}
                            placeholder="Why do you want to adopt this pet?"
                            className="w-full border rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-orange-400"
                        />
                        <button className="mt-3 bg-orange-500 text-white px-6 py-2 rounded-xl hover:bg-orange-600 text-sm">
                            Apply to Adopt
                        </button>
                    </div>
                </div>
            </div>
        </div>
    )
}