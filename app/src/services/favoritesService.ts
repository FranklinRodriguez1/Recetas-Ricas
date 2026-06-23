import jwt from 'jsonwebtoken';
import { getJwtSecret } from '@/app/src/config/jwt'

const JWT_SECRET = getJwtSecret();

export function parseCookies(cookieHeader: string | null) {
  const cookies: Record<string, string> = {};
  if (!cookieHeader) return cookies;
  cookieHeader.split(';').forEach((c) => {
    const [k, ...v] = c.trim().split('=');
    cookies[k] = v.join('=');
  });
  return cookies;
}

export function verifyTokenFromHeader(cookieHeader: string | null) {
  const cookies = parseCookies(cookieHeader);
  const token = cookies['token'];
  if (!token) return null;
  try {
    const decoded = jwt.verify(token, JWT_SECRET);
    return decoded;
  } catch (e) {
    return null;
  }
}

export default { parseCookies, verifyTokenFromHeader };
