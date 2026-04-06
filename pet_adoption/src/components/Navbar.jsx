import { useState, useRef, useEffect } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { FaBars, FaTimes } from "react-icons/fa"
import { useAuth } from '../context/AuthContext'

export default function Navbar() {
    const [isopen, setIsopen] = useState(false)
    const closeref = useRef()
    const { user, logout } = useAuth()
    const navigate = useNavigate()

    useEffect(() => {
        function handleClickOutside(e) {
            if (closeref.current && !closeref.current.contains(e.target)) {
                setIsopen(false)
            }
        }
        document.addEventListener("mousedown", handleClickOutside)
        return () => {
            document.removeEventListener("mousedown", handleClickOutside)
        }
    }, [])

    const handleLogout = () => {
        logout()
        setIsopen(false)
        navigate('/login')
    }

    return (
        <nav className="sticky bg-white shadow-md px-6 py-4 h-15 flex justify-between ">
            <Link to="/" className="text-2xl font-bold text-orange-500">
                🐾 PetAdopt
            </Link>

            {/* Desktop menu */}
            <div className="hidden sm:flex gap-6 text-sm font-medium text-gray-600 items-center">
                <Link to="/">Home</Link>
                {user?.role === 'owner' && (
                    <>
                        <Link to="/list-pet">List a Pet</Link>
                        <Link to="/dashboard">Dashboard</Link>
                    </>
                )}
                {user?.role === 'adopter' && (
                    <Link to="/my-applications">My Applications</Link>
                )}
                {user ? (
                    <>
                        <span className="text-gray-400">Hi, {user.name}</span>
                        <button onClick={handleLogout} className="bg-red-400 text-white px-4 py-1.5 rounded-full">
                            Logout
                        </button>
                    </>
                ) : (
                    <Link to="/login" className="bg-orange-500 text-white px-4 py-1.5 rounded-full">
                        Login
                    </Link>
                )}
            </div>

            {/* Mobile hamburger button */}
            <button
                className='mr-3 sm:hidden text-xl'
                onClick={() => setIsopen(!isopen)}
            >
                {isopen ? <FaTimes /> : <FaBars />}
            </button>

            {/* Mobile dropdown menu */}
            {isopen && (
                <div
                    ref={closeref}
                    className='absolute top-15 flex flex-col gap-3 text-sm font-medium text-gray-600 items-center pt-3 right-0 w-52 bg-amber-50 shadow-md'
                >
                    <Link to="/" onClick={() => setIsopen(false)}>Home</Link>
                    {user?.role === 'owner' && (
                        <>
                            <Link to="/list-pet" onClick={() => setIsopen(false)}>List a Pet</Link>
                            <Link to="/dashboard" onClick={() => setIsopen(false)}>Dashboard</Link>
                        </>
                    )}
                    {user?.role === 'adopter' && (
                        <Link to="/my-applications" onClick={() => setIsopen(false)}>My Applications</Link>
                    )}
                    {user ? (
                        <>
                            <span className="text-gray-400">Hi, {user.name}</span>
                            <button onClick={handleLogout} className="bg-red-400 text-white px-4 py-1.5 rounded-full mb-3">
                                Logout
                            </button>
                        </>
                    ) : (
                        <Link to="/login" onClick={() => setIsopen(false)} className="bg-orange-500 text-white px-4 py-1.5 rounded-full mb-3">
                            Login
                        </Link>
                    )}
                </div>
            )}
        </nav>
    )
}