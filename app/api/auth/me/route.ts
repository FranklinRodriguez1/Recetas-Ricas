import { NextResponse } from 'next/server'
import { verifyTokenFromHeader } from '@/app/src/services/favoritesService'

export async function GET(request: Request) {
  try {
    const cookieHeader = request.headers.get('cookie')
    const user = verifyTokenFromHeader(cookieHeader)
    if (!user) {
      return NextResponse.json({ ok: false }, { status: 401 })
    }
    return NextResponse.json({ ok: true, user }, { status: 200 })
  } catch (err) {
    console.error('me error', err)
    return NextResponse.json({ ok: false }, { status: 500 })
  }
}
