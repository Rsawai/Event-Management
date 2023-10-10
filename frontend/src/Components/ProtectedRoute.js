import React from 'react'
import { Outlet, Navigate } from 'react-router-dom'

const ProtectedRoute = () => {
  let auth = JSON.parse(localStorage.getItem('LoginKey'))
  return auth ? <Outlet /> : <Navigate to='/' />
}

export default ProtectedRoute
