import { NextResponse } from 'next/server'

export async function POST() {
  try {
    const res = NextResponse.json({ ok: true })
    // Clear cookie by setting Max-Age=0
    res.headers.set('Set-Cookie', 'token=; Path=/; HttpOnly; Max-Age=0; SameSite=Lax')
    return res
  } catch (err) {
    console.error('logout error', err)
    return NextResponse.json({ ok: false }, { status: 500 })
  }
}
