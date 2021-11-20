import React from 'react'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import { Home } from '@pages/Home'
import { Register } from '@pages/Register'
import { Login } from '@pages/Login'
import { Header } from '@components/Header'

export const AppRoutes: React.FC = () => {
  return (
    <BrowserRouter>
      <Header />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/criar-conta" element={<Register />} />
        <Route path="/login" element={<Login />} />
      </Routes>
    </BrowserRouter>
  )
}
