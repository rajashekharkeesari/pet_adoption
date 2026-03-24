const MY_APPLICATIONS = [
    { _id: '1', petName: 'Charlie', breed: 'Beagle', status: 'pending', date: '2024-12-01' },
    { _id: '2', petName: 'Tweety', breed: 'Canary', status: 'approved', date: '2024-11-20' },
    { _id: '3', petName: 'Luna', breed: 'Persian', status: 'rejected', date: '2024-11-10' },
]

const statusStyle = {
    pending: 'bg-yellow-100 text-yellow-600',
    approved: 'bg-green-100 text-green-600',
    rejected: 'bg-red-100 text-red-500',
}

export default function MyApplications() {
    return (
        <div className="min-h-screen bg-orange-50 px-6 py-10">
            <div className="max-w-4xl mx-auto">
                <h1 className="text-2xl font-bold text-gray-800 mb-6">My Adoption Applications</h1>
                <div className="grid gap-4">
                    {MY_APPLICATIONS.map(app => (
                        <div key={app._id} className="bg-white rounded-2xl shadow px-6 py-4 flex justify-between items-center">
                            <div>
                                <h3 className="font-semibold text-gray-800">{app.petName}</h3>
                                <p className="text-sm text-gray-500">{app.breed} · Applied on {app.date}</p>
                            </div>
                            <span className={`text-xs px-3 py-1 rounded-full font-medium ${statusStyle[app.status]}`}>
                                {app.status}
                            </span>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    )
}