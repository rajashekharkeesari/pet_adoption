import { useState } from 'react'

export default function ListPet() {
    const [form, setForm] = useState({ name: '', breed: '', age: '', category: '', location: '', description: '' })

    const handleSubmit = (e) => {
        e.preventDefault()
        console.log('New pet listing:', form)
    }

    return (
        <div className="min-h-screen bg-orange-50 px-6 py-10">
            <div className="max-w-xl mx-auto bg-white rounded-2xl shadow p-8">
                <h2 className="text-2xl font-bold text-gray-800 mb-1">List a Pet for Adoption</h2>
                <p className="text-gray-400 text-sm mb-6">Help your pet find a loving home</p>

                <form onSubmit={handleSubmit} className="space-y-4">
                    {[['Pet Name', 'name', 'text'], ['Breed', 'breed', 'text'], ['Age (years)', 'age', 'number'], ['Location', 'location', 'text']].map(([label, key, type]) => (
                        <div key={key}>
                            <label className="text-sm text-gray-600">{label}</label>
                            <input type={type} required className="w-full border rounded-lg px-3 py-2 mt-1 text-sm focus:outline-none focus:ring-2 focus:ring-orange-400"
                                value={form[key]} onChange={e => setForm({ ...form, [key]: e.target.value })} />
                        </div>
                    ))}

                    <div>
                        <label className="text-sm text-gray-600">Category</label>
                        <select className="w-full border rounded-lg px-3 py-2 mt-1 text-sm"
                            value={form.category} onChange={e => setForm({ ...form, category: e.target.value })}>
                            <option value="">Select</option>
                            <option value="dog">Dog</option>
                            <option value="cat">Cat</option>
                            <option value="bird">Bird</option>
                            <option value="rabbit">Rabbit</option>
                        </select>
                    </div>

                    <div>
                        <label className="text-sm text-gray-600">Description</label>
                        <textarea rows={3} className="w-full border rounded-lg px-3 py-2 mt-1 text-sm focus:outline-none focus:ring-2 focus:ring-orange-400"
                            value={form.description} onChange={e => setForm({ ...form, description: e.target.value })} />
                    </div>

                    <div>
                        <label className="text-sm text-gray-600">Pet Image</label>
                        <input type="file" accept="image/*" className="w-full mt-1 text-sm text-gray-500" />
                    </div>

                    <button type="submit" className="w-full bg-orange-500 text-white py-2 rounded-xl hover:bg-orange-600 font-medium">
                        Submit Listing
                    </button>
                </form>
            </div>
        </div>
    )
}