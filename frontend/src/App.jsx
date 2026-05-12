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
import HomePage from './component/HomePage.jsx'
import IncomePage from './component/IncomePage.jsx'
import ExpensePage from './component/ExpensePage.jsx'
import ProfilePage from './component/ProfilePage'

function App() {
  const setAuth = useSetRecoilState(authAtom)

  useEffect(() => {
    const savedUser = localStorage.getItem("user")
    console.log("saved User: ", savedUser)

    if (savedUser) {
      setAuth({ isLoggedIn: true, isChecked: true, user: JSON.parse(savedUser) });
    }
    else {
      setAuth({
        isLoggedIn: false,
        isChecked: true,
        user: null
      })
    }

  }, [setAuth])

  return (
    <div>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={
            <PublicRoute allowWhenLoggedIn={true}>
              <HomePage />
            </PublicRoute>
          } />

          <Route path="/login" element={
            <PublicRoute>
              <LoginPage />
            </PublicRoute>
          } />
          <Route path="/dashboardPage" element={
            <PrivateRoute>
              <Dashboard />
            </PrivateRoute>
          } />

          <Route path='/incomePage' element={
            <PrivateRoute>
              <IncomePage />
            </PrivateRoute>
          } />
          <Route path='/expensePage' element={
            <PrivateRoute>
              <ExpensePage />
            </PrivateRoute>
          } />

          <Route path="/userProfile" element={
            <PrivateRoute>
              <ProfilePage />
            </PrivateRoute>
          } />
        </Routes>
      </BrowserRouter>
      <Toaster position="top-right" reverseOrder={false} />


    </div>
  )
}

export default App

