import React, { useState } from 'react'
import LoginForm from '../components/LoginForm'
import RegisterForm from '../components/registerForm'

const AuthPage = () => {
  const [login, setLogin] = useState(false)

  return (
   <div className="min-h-screen bg-gradient-to-br from-gray-900 via-emerald-900 to-gray-900 flex items-center justify-center p-4">
      {login ? <LoginForm state={setLogin} /> : <RegisterForm state={setLogin} />}
      </div>
  )
}

export default AuthPage