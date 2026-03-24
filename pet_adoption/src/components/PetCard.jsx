import { Link } from 'react-router-dom'

export default function PetCard({ pet }) {
    return (
        <div className="bg-white rounded-2xl shadow hover:shadow-lg transition overflow-hidden">
            <img
                src={pet.image || 'https://placedog.net/400/300'}
                alt={pet.name}
                className="w-full h-48 object-cover"
            />
            <div className="p-4">
                <div className="flex justify-between items-center mb-1">
                    <h3 className="text-lg font-semibold text-gray-800">{pet.name}</h3>
                    <span className="text-xs bg-orange-100 text-orange-600 px-2 py-0.5 rounded-full">{pet.category}</span>
                </div>
                <p className="text-sm text-gray-500">{pet.breed} · {pet.age} yrs · {pet.location}</p>
                <Link
                    to={`/pets/${pet._id}`}
                    className="mt-3 block text-center bg-orange-500 text-white py-2 rounded-xl text-sm hover:bg-orange-600"
                >
                    View & Adopt
                </Link>
            </div>
        </div>
    )
}