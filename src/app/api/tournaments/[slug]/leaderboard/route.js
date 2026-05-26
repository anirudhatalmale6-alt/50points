import { NextResponse } from 'next/server';
import prisma from '@/lib/db';

export async function GET(request, { params }) {
  try {
    const { slug } = params;

    const tournament = await prisma.tournament.findUnique({
      where: { slug },
    });

    if (!tournament) {
      return NextResponse.json({ error: 'Tournament not found' }, { status: 404 });
    }

    const entries = await prisma.leaderboardEntry.findMany({
      where: { tournamentId: tournament.id },
      include: {
        user: {
          select: { id: true, username: true, avatarColor: true, isGuest: true },
        },
      },
      orderBy: [
        { totalPoints: 'desc' },
        { bestStreak: 'desc' },
        { racesPlayed: 'desc' },
      ],
    });

    const leaderboard = entries.map((entry, index) => ({
      rank: index + 1,
      userId: entry.user.id,
      username: entry.user.username,
      avatarColor: entry.user.avatarColor,
      isGuest: entry.user.isGuest,
      totalPoints: entry.totalPoints,
      racesPlayed: entry.racesPlayed,
      fullPoints: entry.fullPoints,
      dualPoints: entry.dualPoints,
      smartPoints: entry.smartPoints,
      winStreak: entry.winStreak,
      bestStreak: entry.bestStreak,
    }));

    return NextResponse.json({ leaderboard, tournamentName: tournament.name });
  } catch (error) {
    console.error('Leaderboard error:', error);
    return NextResponse.json({ error: 'Failed to fetch leaderboard' }, { status: 500 });
  }
}
