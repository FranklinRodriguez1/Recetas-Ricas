import { NextResponse } from 'next/server';
import { validateUser } from '@/app/src/services/authService';
import jwt from 'jsonwebtoken';
import { getJwtSecret } from '@/app/src/config/jwt'

const JWT_SECRET = getJwtSecret();

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { email, password } = body || {};
    if (!email) {
      return NextResponse.json({ error: 'Email is required' }, { status: 400 });
    }

    const user = await validateUser(email, password);
    if (!user) {
      return NextResponse.json({ ok: false, message: 'User not found' }, { status: 404 });
    }

    // Create JWT and set as HttpOnly cookie
    const token = jwt.sign({ id: (user as any)._id, email: (user as any).email }, JWT_SECRET, { expiresIn: '7d' });
    const maxAge = 7 * 24 * 60 * 60; // 7 days

    const safe = { id: (user as any)._id, email: (user as any).email };

    return NextResponse.json({ ok: true, user: safe }, {
      status: 200,
      headers: {
        'Set-Cookie': `token=${token}; HttpOnly; Path=/; Max-Age=${maxAge}; SameSite=Lax`
      }
    });
  } catch (error) {
    console.error('Login error:', error);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}
