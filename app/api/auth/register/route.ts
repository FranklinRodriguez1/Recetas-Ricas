import { NextResponse } from 'next/server';
import { createUser, findUserByEmail } from '@/app/src/services/authService';
import { sendRegistrationEmail } from '../../../src/services/emails';

const emailRegex = /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i;

function validatePayload(email: unknown, password: unknown) {
  if (typeof email !== 'string' || typeof password !== 'string') {
    return 'Email and password are required';
  }
  if (!email.trim()) {
    return 'Email is required';
  }
  if (!emailRegex.test(email)) {
    return 'Invalid email';
  }
  if (password.length < 8) {
    return 'Password must be at least 8 characters';
  }
  if (!/[A-Z]/.test(password)) {
    return 'Password must contain at least one uppercase letter';
  }
  if (!/[0-9]/.test(password)) {
    return 'Password must contain at least one number';
  }
  return null;
}

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { email, password, confirmPassword } = body || {};
    const validationError = validatePayload(email, password);
    if (validationError) {
      return NextResponse.json({ ok: false, error: validationError }, { status: 400 });
    }
    if (password !== confirmPassword) {
      return NextResponse.json({ ok: false, error: 'Passwords do not match.' }, { status: 400 });
    }

    const existing = await findUserByEmail(email);
    if (existing) {
      return NextResponse.json({ ok: false, error: 'User already exists' }, { status: 409 });
    }

    const user = await createUser(email.trim(), password);
    const safe = { id: (user as any)._id, email: (user as any).email };

    try {
      await sendRegistrationEmail(safe.email);
    } catch (emailError) {
      console.error('Registration email failed:', emailError);
    }

    return NextResponse.json({ ok: true, user: safe }, { status: 201 });
  } catch (error: any) {
    console.error('Register error:', error);
    if (error?.code === 11000) {
      return NextResponse.json({ ok: false, error: 'Email already registered' }, { status: 409 });
    }
    return NextResponse.json({ ok: false, error: 'Internal server error' }, { status: 500 });
  }
}
