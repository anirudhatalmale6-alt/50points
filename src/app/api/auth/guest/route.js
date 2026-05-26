import { NextResponse } from 'next/server';
import prisma from '@/lib/db';
import { signToken, generateGuestToken, generateGuestUsername } from '@/lib/auth';

export async function POST() {
  try {
    const guestToken = generateGuestToken();
    let username = generateGuestUsername();

    let attempts = 0;
    while (attempts < 10) {
      const exists = await prisma.user.findUnique({ where: { username } });
      if (!exists) break;
      username = generateGuestUsername();
      attempts++;
    }

    const colors = ['#7c3aed', '#e11d48', '#2563eb', '#16a34a', '#ea580c', '#0891b2', '#d946ef'];
    const avatarColor = colors[Math.floor(Math.random() * colors.length)];

    const user = await prisma.user.create({
      data: {
        username,
        isGuest: true,
        guestToken,
        avatarColor,
      },
    });

    await prisma.userStats.create({
      data: { userId: user.id },
    });

    const token = signToken({ userId: user.id, username: user.username, isGuest: true });

    return NextResponse.json({
      token,
      guestToken,
      user: {
        id: user.id,
        username: user.username,
        avatarColor: user.avatarColor,
        isGuest: true,
      },
    });
  } catch (error) {
    console.error('Guest creation error:', error);
    return NextResponse.json({ error: 'Failed to create guest account' }, { status: 500 });
  }
}
