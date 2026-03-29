import { createContext, useContext, useState } from 'react'
import { getToken, setToken, removeToken, isAuthenticated } from '../utils/tokenHelper'

const AuthContext = createContext(null)

export const AuthProvider = ({ children }) => {
  const [isLoggedIn, setIsLoggedIn] = useState(isAuthenticated())

  const login = (newToken) => {
    setToken(newToken)
    setIsLoggedIn(true)
  }

  const logout = () => {
    removeToken()
    setIsLoggedIn(false)
  }

  return (
    <AuthContext.Provider value={{ isLoggedIn, login, logout }}>
      {children}
    </AuthContext.Provider>
  )
}

export const useAuth = () => {
  const context = useContext(AuthContext)
  if (!context) {
    throw new Error('useAuth must be used within AuthProvider')
  }
  return context
}

export default AuthContext