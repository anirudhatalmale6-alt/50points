import { NextResponse } from 'next/server';
import prisma from '@/lib/db';
import { getUserFromRequest } from '@/lib/auth';

export async function GET(request) {
  try {
    const payload = getUserFromRequest(request);
    if (!payload) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const user = await prisma.user.findUnique({
      where: { id: payload.userId },
      include: {
        stats: true,
      },
    });

    if (!user) {
      return NextResponse.json({ error: 'User not found' }, { status: 404 });
    }

    return NextResponse.json({
      user: {
        id: user.id,
        username: user.username,
        email: user.email,
        avatarColor: user.avatarColor,
        isGuest: user.isGuest,
        gameMode: user.gameMode,
        stats: user.stats ? {
          totalPoints: user.stats.totalPoints,
          tournamentsPlayed: user.stats.tournamentsPlayed,
          totalRaces: user.stats.totalRaces,
          winRate: user.stats.winRate,
          bestStreak: user.stats.bestStreak,
          titles: user.stats.titles,
        } : null,
      },
    });
  } catch (error) {
    console.error('Me error:', error);
    return NextResponse.json({ error: 'Failed to fetch user' }, { status: 500 });
  }
}
