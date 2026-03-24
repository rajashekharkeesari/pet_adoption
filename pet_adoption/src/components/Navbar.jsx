import { Link } from 'react-router-dom'

export default function Navbar() {
    return (
        <nav className="bg-white shadow-md px-6 py-4 flex justify-between items-center">
            <Link to="/" className="text-2xl font-bold text-orange-500">🐾 PetAdopt</Link>
            <div className="flex gap-6 text-sm font-medium text-gray-600">
                <Link to="/" className="hover:text-orange-500">Home</Link>
                <Link to="/list-pet" className="hover:text-orange-500">List a Pet</Link>
                <Link to="/dashboard" className="hover:text-orange-500">Dashboard</Link>
                <Link to="/my-applications" className="hover:text-orange-500">My Applications</Link>
                <Link to="/login" className="bg-orange-500 text-white px-4 py-1.5 rounded-full hover:bg-orange-600">Login</Link>
            </div>
        </nav>
    )
}