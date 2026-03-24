export default function FilterSidebar({ filters, setFilters }) {
    return (
        <div className="bg-white rounded-2xl shadow p-5 w-60 shrink-0">
            <h2 className="font-semibold text-gray-700 mb-4">Filter Pets</h2>

            <label className="block text-sm text-gray-600 mb-1">Category</label>
            <select
                className="w-full border rounded-lg px-3 py-2 text-sm mb-4"
                value={filters.category}
                onChange={e => setFilters({ ...filters, category: e.target.value })}
            >
                <option value="">All</option>
                <option value="dog">Dog</option>
                <option value="cat">Cat</option>
                <option value="bird">Bird</option>
                <option value="rabbit">Rabbit</option>
            </select>

            <label className="block text-sm text-gray-600 mb-1">Max Age (yrs)</label>
            <input
                type="number"
                className="w-full border rounded-lg px-3 py-2 text-sm mb-4"
                value={filters.age}
                onChange={e => setFilters({ ...filters, age: e.target.value })}
                placeholder="e.g. 5"
            />

            <label className="block text-sm text-gray-600 mb-1">Location</label>
            <input
                type="text"
                className="w-full border rounded-lg px-3 py-2 text-sm"
                value={filters.location}
                onChange={e => setFilters({ ...filters, location: e.target.value })}
                placeholder="e.g. Hyderabad"
            />
        </div>
    )
}