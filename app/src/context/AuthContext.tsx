"use client"

import React, { createContext, useState, useContext, useEffect } from 'react'
import { fetchCurrentUser, logoutUser } from '@/app/src/services/authClient'

interface AuthContextType {
  isLogin: boolean
  user: { id: string; email: string } | null
  setIsLogin: (value: boolean) => void
  setUser: (user: { id: string; email: string } | null) => void
  logout: () => Promise<void>
}

const AuthContext = createContext<AuthContextType | undefined>(undefined)

export const useAuth = () => {
  const context = useContext(AuthContext)
  if (context === undefined) {
    throw new Error('useAuth debe ser usado dentro de AuthProvider')
  }
  return context
}

export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
  const [isLogin, setIsLogin] = useState(false)
  const [user, setUser] = useState<{ id: string; email: string } | null>(null)

  async function logout() {
    try {
      await logoutUser()
    } catch (e) {
      console.error('Logout error', e)
    }
    try {
      if (typeof window !== 'undefined') {
        localStorage.removeItem('userToken')
      }
    } catch {}
    setIsLogin(false)
    setUser(null)
  }

  useEffect(() => {
    let mounted = true
    async function check() {
      try {
        const { ok, data } = await fetchCurrentUser()
        if (!mounted) return
        if (ok) {
          setIsLogin(true)
          setUser(data.user || null)
          return
        }
      } catch (e) {
        console.error('Auth check failed', e)
      }
      setIsLogin(false)
      setUser(null)
    }
    check()
    return () => {
      mounted = false
    }
  }, [])

  return (
    <AuthContext.Provider value={{ isLogin, user, setIsLogin, setUser, logout }}>
      {children}
    </AuthContext.Provider>
  )
}

export default AuthContext
