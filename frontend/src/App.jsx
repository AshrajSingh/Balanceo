import { Toaster } from 'react-hot-toast'
import './index.css'
import './styleSheets/loginPage.css'
import LoginPage from './component/LogInPage.jsx'
import { useSetRecoilState } from 'recoil'
import Dashboard from './component/Dashboard'
import { BrowserRouter, Navigate, Route, Routes } from 'react-router-dom'
import PrivateRoute, { PublicRoute } from './component/PrivateRoute.jsx'
import { authAtom } from './store/userAtom.jsx'
import { useEffect } from 'react'
import Footer from './component/Footer.jsx'

function App() {
  const setAuth = useSetRecoilState(authAtom)

  useEffect(() => {
    const savedUser = localStorage.getItem("user")
    console.log("saved User: ", savedUser)
    if (savedUser) {
      setAuth(JSON.parse(savedUser));
    }
    else{
      setAuth({
        isLoggedIn: false,
        user: null
      })
    }

  }, [setAuth])

  return (
    <div>
      <BrowserRouter>
        <Routes>
          {/* default route */}
          <Route path="/" element={<Navigate to="/login" />} />

          <Route path="/login" element={
            <PublicRoute>
              <LoginPage />
            </PublicRoute>
          } />
          <Route path="/dashboard" element={
            <PrivateRoute>
              <Dashboard />
            </PrivateRoute>
          } />
        </Routes>
      </BrowserRouter>
      <Toaster position="top-right" reverseOrder={false} />
      <Footer />
    </div>
  )
}

export default App
