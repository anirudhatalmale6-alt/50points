import { NextResponse } from 'next/server';
import prisma from '@/lib/db';

export async function GET() {
  try {
    const tournaments = await prisma.tournament.findMany({
      include: {
        races: {
          include: {
            horses: true,
            results: true,
          },
          orderBy: { raceNumber: 'asc' },
        },
        _count: {
          select: { tickets: true },
        },
      },
      orderBy: { date: 'desc' },
    });

    return NextResponse.json({
      tournaments: tournaments.map(t => ({
        id: t.id,
        slug: t.slug,
        name: t.name,
        track: t.track,
        location: t.location,
        status: t.status,
        totalRaces: t.totalRaces,
        currentRace: t.currentRace,
        date: t.date,
        description: t.description,
        imageUrl: t.imageUrl,
        players: t._count.tickets,
        races: t.races.map(r => ({
          id: r.id,
          raceNumber: r.raceNumber,
          name: r.name,
          status: r.status,
          scheduledTime: r.scheduledTime,
          distance: r.distance,
          surface: r.surface,
          raceClass: r.raceClass,
          purse: r.purse,
          horseCount: r.horses.length,
          hasResults: r.results.length > 0,
        })),
      })),
    });
  } catch (error) {
    console.error('Tournaments error:', error);
    return NextResponse.json({ error: 'Failed to fetch tournaments' }, { status: 500 });
  }
}
