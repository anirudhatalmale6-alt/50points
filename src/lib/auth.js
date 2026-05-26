import jwt from 'jsonwebtoken';
import bcrypt from 'bcryptjs';

const JWT_SECRET = process.env.JWT_SECRET || '50points-secret-key';

export function signToken(payload) {
  return jwt.sign(payload, JWT_SECRET, { expiresIn: '30d' });
}

export function verifyToken(token) {
  try {
    return jwt.verify(token, JWT_SECRET);
  } catch {
    return null;
  }
}

export async function hashPassword(password) {
  return bcrypt.hash(password, 10);
}

export async function comparePassword(password, hash) {
  return bcrypt.compare(password, hash);
}

export function getUserFromRequest(request) {
  const authHeader = request.headers.get('authorization');
  if (!authHeader?.startsWith('Bearer ')) return null;
  const token = authHeader.slice(7);
  return verifyToken(token);
}

export function generateGuestToken() {
  return 'guest_' + Math.random().toString(36).substring(2) + Date.now().toString(36);
}

export function generateGuestUsername() {
  const adjectives = ['Swift', 'Lucky', 'Bold', 'Wild', 'Royal', 'Golden', 'Silver', 'Iron', 'Dark', 'Brave'];
  const nouns = ['Rider', 'Runner', 'Phantom', 'Storm', 'Spirit', 'Arrow', 'Crown', 'Knight', 'Star', 'Blaze'];
  const adj = adjectives[Math.floor(Math.random() * adjectives.length)];
  const noun = nouns[Math.floor(Math.random() * nouns.length)];
  const num = Math.floor(Math.random() * 9999);
  return `${adj}${noun}${num}`;
}
