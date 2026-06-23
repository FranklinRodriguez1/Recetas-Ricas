"use client"
import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { Button, Checkbox, Description, FieldError, Form, Input, Label, TextField } from '@heroui/react'
import { useAuth } from '@/app/src/context/AuthContext'
import { loginUser } from '@/app/src/services/authClient'

const LoginComponent = () => {
  const { setIsLogin, setUser } = useAuth()
  const [error, setError] = useState<string | null>(null)
  const router = useRouter()

  const handleSubmit = async (ev: any) => {
    ev.preventDefault()
    setError(null)
    const form = ev.target
    const formData = new FormData(form)
    const email = formData.get('email') as string
    const password = formData.get('password') as string

    try {
      const { ok, data, status } = await loginUser(email, password)
      if (!ok) {
        setError(data?.message || data?.error || 'Login failed')
        setIsLogin(false)
        setUser(null)
        return
      }

      setIsLogin(true)
      setUser(data.user || null)
      router.push('/')
    } catch (err: any) {
      setError(err?.message || 'Network error')
      setIsLogin(false)
      setUser(null)
    }
  }

  return (
    <div className='w-full flex flex-col items-center justify-center'>
      <Form className="flex flex-col gap-4 w-96" onSubmit={handleSubmit}>
        <label>Login</label>
        <TextField name="email" type="email" validate={(value) => {
          if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i.test(value)) return 'Please enter a valid email address'
          return null
        }}>
          <Label>Email</Label>
          <Input name="email" placeholder="john@example.com" />
          <FieldError />
        </TextField>

        <TextField minLength={8} name="password" type="password" validate={(value) => {
          if (value.length < 8) return 'Password must be at least 8 characters'
          if (!/[A-Z]/.test(value)) return 'Password must contain at least one uppercase letter'
          if (!/[0-9]/.test(value)) return 'Password must contain at least one number'
          return null
        }}>
          <Label>Password</Label>
          <Input name="password" placeholder="Enter your password" />
          <Description>Must be at least 8 characters with 1 uppercase and 1 number</Description>
          <FieldError />
          <a href="/auth/register" className='text-blue-500'>Don't have an account? Register</a>
        </TextField>

        {error && <div className='text-red-600'>{error}</div>}

        <div className="flex gap-2 pt-4">
          <Button type="submit">
            <Checkbox />
            Submit
          </Button>
          <Button type="reset" variant="secondary">
            Reset
          </Button>
        </div>
      </Form>
    </div>
  )
}

export default LoginComponent