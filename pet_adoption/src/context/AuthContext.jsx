import { createContext, useContext, useState, useEffect } from 'react'
import { loginUser, registerUser } from '../api/index'

const AuthContext = createContext()

export function AuthProvider({ children }) {
    const [user, setUser] = useState(
        JSON.parse(localStorage.getItem('user')) || null
    )

    const login = async (formData) => {
        const { data } = await loginUser(formData)
        localStorage.setItem('user', JSON.stringify(data))
        setUser(data)
    }

    const register = async (formData) => {
        const { data } = await registerUser(formData)
        localStorage.setItem('user', JSON.stringify(data))
        setUser(data)
    }

    const logout = () => {
        localStorage.removeItem('user')
        setUser(null)
    }

    return (
        <AuthContext.Provider value={{ user, login, register, logout }}>
            {children}
        </AuthContext.Provider>
    )
}

export const useAuth = () => useContext(AuthContext)