import React, { useState } from 'react'
import { Login } from './pages/login'
import { RenewPassword } from './pages/renew-password'
import { ResetPassword } from './pages/resetPassword'
import { RouterProvider } from 'react-router-dom'
import { router } from './router'

function App() {
  return (
    <RouterProvider router={router} />
  )
}

export default App
