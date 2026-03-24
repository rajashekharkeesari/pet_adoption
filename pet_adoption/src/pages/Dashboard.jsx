const MY_PETS = [
    { _id: '1', name: 'Bruno', breed: 'Labrador', category: 'dog', status: 'available' },
    { _id: '2', name: 'Milo', breed: 'Persian', category: 'cat', status: 'pending' },
]

export default function Dashboard() {
    return (
        <div className="min-h-screen bg-orange-50 px-6 py-10">
            <div className="max-w-4xl mx-auto">
                <h1 className="text-2xl font-bold text-gray-800 mb-6">My Listed Pets</h1>
                <div className="grid gap-4">
                    {MY_PETS.map(pet => (
                        <div key={pet._id} className="bg-white rounded-2xl shadow px-6 py-4 flex justify-between items-center">
                            <div>
                                <h3 className="font-semibold text-gray-800">{pet.name}</h3>
                                <p className="text-sm text-gray-500">{pet.breed} · {pet.category}</p>
                            </div>
                            <div className="flex items-center gap-4">
                                <span className={`text-xs px-3 py-1 rounded-full font-medium ${pet.status === 'available' ? 'bg-green-100 text-green-600' : 'bg-yellow-100 text-yellow-600'}`}>
                                    {pet.status}
                                </span>
                                <button className="text-sm text-red-400 hover:text-red-600">Remove</button>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    )
}