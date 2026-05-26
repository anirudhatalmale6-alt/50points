import { NextResponse } from 'next/server';
import prisma from '@/lib/db';
import { hashPassword, signToken } from '@/lib/auth';

export async function POST(request) {
  try {
    const { username, email, password } = await request.json();

    if (!username || !password) {
      return NextResponse.json({ error: 'Username and password are required' }, { status: 400 });
    }

    if (username.length < 3 || username.length > 20) {
      return NextResponse.json({ error: 'Username must be 3-20 characters' }, { status: 400 });
    }

    if (password.length < 6) {
      return NextResponse.json({ error: 'Password must be at least 6 characters' }, { status: 400 });
    }

    const existing = await prisma.user.findFirst({
      where: {
        OR: [
          { username },
          ...(email ? [{ email }] : []),
        ],
      },
    });

    if (existing) {
      if (existing.username === username) {
        return NextResponse.json({ error: 'Username already taken' }, { status: 409 });
      }
      return NextResponse.json({ error: 'Email already in use' }, { status: 409 });
    }

    const passwordHash = await hashPassword(password);
    const colors = ['#7c3aed', '#e11d48', '#2563eb', '#16a34a', '#ea580c', '#0891b2', '#d946ef'];
    const avatarColor = colors[Math.floor(Math.random() * colors.length)];

    const user = await prisma.user.create({
      data: {
        username,
        email: email || null,
        passwordHash,
        avatarColor,
      },
    });

    await prisma.userStats.create({
      data: { userId: user.id },
    });

    const token = signToken({ userId: user.id, username: user.username });

    return NextResponse.json({
      token,
      user: {
        id: user.id,
        username: user.username,
        email: user.email,
        avatarColor: user.avatarColor,
        isGuest: false,
      },
    });
  } catch (error) {
    console.error('Register error:', error);
    return NextResponse.json({ error: 'Registration failed' }, { status: 500 });
  }
}
