import { NextResponse } from 'next/server';
import prisma from '@/lib/db';

export async function GET(request) {
  try {
    const { searchParams } = new URL(request.url);
    const limit = parseInt(searchParams.get('limit') || '100');
    const page = parseInt(searchParams.get('page') || '1');

    const stats = await prisma.userStats.findMany({
      where: { totalPoints: { gt: 0 } },
      include: {
        user: {
          select: { id: true, username: true, avatarColor: true, isGuest: true },
        },
      },
      orderBy: [
        { totalPoints: 'desc' },
        { bestStreak: 'desc' },
        { totalRaces: 'desc' },
      ],
      take: limit,
      skip: (page - 1) * limit,
    });

    const total = await prisma.userStats.count({
      where: { totalPoints: { gt: 0 } },
    });

    const legends = stats.map((s, index) => ({
      rank: (page - 1) * limit + index + 1,
      userId: s.user.id,
      username: s.user.username,
      avatarColor: s.user.avatarColor,
      isGuest: s.user.isGuest,
      totalPoints: s.totalPoints,
      tournamentsPlayed: s.tournamentsPlayed,
      totalRaces: s.totalRaces,
      winRate: s.winRate,
      bestStreak: s.bestStreak,
      titles: s.titles,
    }));

    return NextResponse.json({ legends, total, page, limit });
  } catch (error) {
    console.error('Global leaderboard error:', error);
    return NextResponse.json({ error: 'Failed to fetch leaderboard' }, { status: 500 });
  }
}
