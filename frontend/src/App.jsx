import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom'
import { useAuth } from './context/AuthContext'
import Navbar from './components/Navbar'
import Home from './pages/Home'
import Login from './pages/Login'
import Register from './pages/Register'
import Upload from './pages/Upload'
import Result from './pages/Result'

// Protects pages that need login
const PrivateRoute = ({ children }) => {
  const { isLoggedIn } = useAuth()
  return isLoggedIn ? children : <Navigate to="/login" />
}

function App() {
  return (
    <BrowserRouter>
      <Navbar />
      <Routes>
        <Route path="/"        element={<Home />} />
        <Route path="/login"   element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/upload"  element={
          <PrivateRoute><Upload /></PrivateRoute>
        } />
        <Route path="/result/:id" element={
          <PrivateRoute><Result /></PrivateRoute>
        } />
      </Routes>
    </BrowserRouter>
  )
}

export default App
/*Ctrl+S`



 📍 After All 6 Files — Test This Flow
```
1. Visit localhost:5173/upload
   → Should redirect to /login ✅

2. Visit localhost:5173/register
   → Should show register form ✅

3. Register with new email
   → Should redirect to /login ✅

4. Login with that email
   → Should redirect to /upload ✅

5. Navbar should show:
   Not logged in → "Sign in" + "Get Started"
   Logged in     → "Upload" + "Logout" ✅

6. Click Logout
   → Should redirect to /login ✅
   → /upload now blocked again ✅*/