import { useEffect, useState } from 'react'
import { getMyApplications } from '../api/index'

const statusStyle = {
    pending: 'bg-yellow-100 text-yellow-600',
    approved: 'bg-green-100 text-green-600',
    rejected: 'bg-red-100 text-red-500',
}

export default function MyApplications() {
    const [applications, setApplications] = useState([])
    const [loading, setLoading] = useState(true)

    useEffect(() => {
        const fetchApplications = async () => {
            try {
                const { data } = await getMyApplications()
                setApplications(data)
            } catch (err) {
                console.error(err)
            } finally {
                setLoading(false)
            }
        }
        fetchApplications()
    }, [])

    if (loading) return <p className="text-center mt-20 text-gray-400">Loading...</p>

    return (
        <div className="min-h-screen bg-orange-50 px-6 py-10">
            <div className="max-w-4xl mx-auto">
                <h1 className="text-2xl font-bold text-gray-800 mb-6">My Adoption Applications</h1>
                {applications.length === 0
                    ? <p className="text-gray-400 text-center mt-10">No applications yet.</p>
                    : <div className="grid gap-4">
                        {applications.map(app => (
                            <div key={app._id} className="bg-white rounded-2xl shadow px-6 py-4 flex justify-between items-center">
                                <div>
                                    <h3 className="font-semibold text-gray-800">{app.pet?.name}</h3>
                                    <p className="text-sm text-gray-500">{app.pet?.breed} · Applied on {new Date(app.createdAt).toLocaleDateString()}</p>
                                </div>
                                <span className={`text-xs px-3 py-1 rounded-full font-medium ${statusStyle[app.status]}`}>
                                    {app.status}
                                </span>
                            </div>
                        ))}
                    </div>
                }
            </div>
        </div>
    )
}