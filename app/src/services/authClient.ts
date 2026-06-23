export type AuthPayload = {
  email: string
  password: string
}

export type AuthUser = {
  id: string
  email: string
}

export async function registerUser(email: string, password: string, confirmPassword: string) {
  const res = await fetch('/api/auth/register', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ email, password, confirmPassword })
  })
  const data = await res.json()
  return { ok: res.ok && data.ok, status: res.status, data }
}

export async function loginUser(email: string, password: string) {
  const res = await fetch('/api/auth/login', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ email, password })
  })
  const data = await res.json()
  return { ok: res.ok && data.ok, status: res.status, data }
}

export async function fetchCurrentUser() {
  const res = await fetch('/api/auth/me')
  const data = await res.json()
  return { ok: res.ok && data.ok, status: res.status, data }
}

export async function logoutUser() {
  const res = await fetch('/api/auth/logout', {
    method: 'POST'
  })
  const data = await res.json()
  return { ok: res.ok && data.ok, status: res.status, data }
}
