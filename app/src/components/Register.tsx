"use client"
import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { Button, Checkbox, Description, FieldError, Form, Input, Label, TextField } from '@heroui/react'
import { registerUser } from '@/app/src/services/authClient'

const RegisterComponent = () => {
  const router = useRouter()
  const [error, setError] = useState<string | null>(null)
  const [success, setSuccess] = useState<string | null>(null)
  const [loading, setLoading] = useState(false)

  const validateEmail = (value: string) => {
    return /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i.test(value)
  }

  const handleSubmit = async (ev: React.FormEvent<HTMLFormElement>) => {
    ev.preventDefault()
    setError(null)
    setSuccess(null)

    const form = ev.currentTarget
    const formData = new FormData(form)
    const email = (formData.get('email') || '').toString().trim()
    const password = (formData.get('password') || '').toString()
    const confirmPassword = (formData.get('confirmPassword') || '').toString()

    if (!email || !password || !confirmPassword) {
      setError('All fields are required.')
      return
    }
    if (!validateEmail(email)) {
      setError('Enter a valid email address.')
      return
    }
    if (password.length < 8) {
      setError('Password must be at least 8 characters.')
      return
    }
    if (!/[A-Z]/.test(password)) {
      setError('Password must contain at least one uppercase letter.')
      return
    }
    if (!/[0-9]/.test(password)) {
      setError('Password must contain at least one number.')
      return
    }
    if (password !== confirmPassword) {
      setError('Passwords do not match.')
      return
    }

    setLoading(true)
    try {
      const { ok, data } = await registerUser(email, password, confirmPassword)
      if (!ok) {
        setError(data.error || 'No se pudo registrar el usuario.')
        return
      }
      setSuccess('Registration successful. Redirecting to login...')
      setTimeout(() => router.push('/auth/login'), 1500)
    } catch (err: any) {
      setError(err?.message || 'Network error, please try again.')
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="w-full min-h-screen flex items-center justify-center bg-slate-50 p-4">
      <div className="w-full max-w-md bg-white rounded-xl shadow-lg p-8">
        <h1 className="text-2xl font-bold mb-4">Register</h1>
        <Form className="flex flex-col gap-4" onSubmit={handleSubmit}>
          <TextField
            name="email"
            type="email"
            validate={(value) => {
              if (!validateEmail(value)) return 'Enter a valid email'
              return null
            }}
          >
            <Label>Email</Label>
            <Input name="email" placeholder="john@example.com" />
            <FieldError />
          </TextField>

          <TextField
            name="password"
            type="password"
            validate={(value) => {
              if (value.length < 8) return 'Password must be at least 8 characters'
              if (!/[A-Z]/.test(value)) return 'Must contain at least one uppercase letter'
              if (!/[0-9]/.test(value)) return 'Must contain at least one number'
              return null
            }}
          >
            <Label>Password</Label>
            <Input name="password" placeholder="Enter your password" />
            <Description>At least 8 characters, one uppercase letter, and one number</Description>
            <FieldError />
          </TextField>

          <TextField
            name="confirmPassword"
            type="password"
            validate={(value) => {
              if (value.length < 8) return 'Confirm your password'
              return null
            }}
          >
            <Label>Confirm password</Label>
            <Input name="confirmPassword" placeholder="Repeat your password" />
            <FieldError />
          </TextField>

          {error && <div className="text-red-600">{error}</div>}
          {success && <div className="text-green-600">{success}</div>}

          <div className="flex gap-2 pt-4">
            <Button type="submit" isDisabled={loading}>
              <Checkbox />
              {loading ? 'Registering...' : 'Register'}
            </Button>
            <Button type="reset" variant="secondary" isDisabled={loading}>
              Reset
            </Button>
          </div>
        </Form>
        <a href="/auth/login" className="text-sm text-blue-500 hover:text-blue-700 mt-4 block">
          Already have an account? Sign in
        </a>
      </div>
    </div>
  )
}

export default RegisterComponent