import { NextResponse } from 'next/server';
import prisma from '@/lib/db';
import { getUserFromRequest } from '@/lib/auth';
import { STRATEGIES, getRequiredPicks } from '@/lib/scoring';

export async function POST(request) {
  try {
    const payload = getUserFromRequest(request);
    if (!payload) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const { raceId, strategy, picks } = await request.json();

    if (!raceId || !strategy || !picks) {
      return NextResponse.json({ error: 'raceId, strategy, and picks are required' }, { status: 400 });
    }

    if (!Object.values(STRATEGIES).includes(strategy)) {
      return NextResponse.json({ error: 'Invalid strategy' }, { status: 400 });
    }

    const required = getRequiredPicks(strategy);
    if (!Array.isArray(picks) || picks.length !== required) {
      return NextResponse.json({ error: `${strategy} requires exactly ${required} pick(s)` }, { status: 400 });
    }

    const race = await prisma.race.findUnique({
      where: { id: raceId },
      include: { horses: true, tournament: true },
    });

    if (!race) {
      return NextResponse.json({ error: 'Race not found' }, { status: 404 });
    }

    if (race.status !== 'upcoming' && race.status !== 'open') {
      return NextResponse.json({ error: 'Race is no longer accepting picks' }, { status: 400 });
    }

    const horseIds = race.horses.map(h => h.id);
    for (const pickId of picks) {
      if (!horseIds.includes(pickId)) {
        return NextResponse.json({ error: `Horse ${pickId} is not in this race` }, { status: 400 });
      }
    }

    const uniquePicks = new Set(picks);
    if (uniquePicks.size !== picks.length) {
      return NextResponse.json({ error: 'Duplicate picks not allowed' }, { status: 400 });
    }

    const existing = await prisma.ticket.findUnique({
      where: { userId_raceId: { userId: payload.userId, raceId } },
    });

    if (existing) {
      return NextResponse.json({ error: 'You already submitted a pick for this race' }, { status: 409 });
    }

    const ticket = await prisma.ticket.create({
      data: {
        userId: payload.userId,
        raceId,
        tournamentId: race.tournamentId,
        strategy,
        picks: JSON.stringify(picks),
      },
    });

    return NextResponse.json({
      ticket: {
        id: ticket.id,
        raceId: ticket.raceId,
        strategy: ticket.strategy,
        picks: JSON.parse(ticket.picks),
        pointsEarned: 0,
        isScored: false,
      },
    });
  } catch (error) {
    console.error('Ticket submit error:', error);
    return NextResponse.json({ error: 'Failed to submit ticket' }, { status: 500 });
  }
}

export async function GET(request) {
  try {
    const payload = getUserFromRequest(request);
    if (!payload) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const { searchParams } = new URL(request.url);
    const tournamentId = searchParams.get('tournamentId');

    const where = { userId: payload.userId };
    if (tournamentId) where.tournamentId = parseInt(tournamentId);

    const tickets = await prisma.ticket.findMany({
      where,
      include: {
        race: {
          include: {
            horses: true,
            results: true,
          },
        },
      },
      orderBy: { createdAt: 'desc' },
    });

    return NextResponse.json({
      tickets: tickets.map(t => ({
        id: t.id,
        raceId: t.raceId,
        raceNumber: t.race.raceNumber,
        raceName: t.race.name,
        raceStatus: t.race.status,
        strategy: t.strategy,
        picks: JSON.parse(t.picks),
        pointsEarned: t.pointsEarned,
        isScored: t.isScored,
        horses: t.race.horses,
        results: t.race.results,
        createdAt: t.createdAt,
      })),
    });
  } catch (error) {
    console.error('Tickets fetch error:', error);
    return NextResponse.json({ error: 'Failed to fetch tickets' }, { status: 500 });
  }
}
