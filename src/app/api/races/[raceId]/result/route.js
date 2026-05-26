import { NextResponse } from 'next/server';
import prisma from '@/lib/db';
import { scoreTicket } from '@/lib/scoring';

export async function POST(request, { params }) {
  try {
    const raceId = parseInt(params.raceId);
    const { results } = await request.json();

    if (!results || !Array.isArray(results) || results.length < 3) {
      return NextResponse.json({ error: 'At least 3 finishing positions required' }, { status: 400 });
    }

    const race = await prisma.race.findUnique({
      where: { id: raceId },
      include: { horses: true, tournament: true },
    });

    if (!race) {
      return NextResponse.json({ error: 'Race not found' }, { status: 404 });
    }

    for (const r of results) {
      await prisma.raceResult.upsert({
        where: { raceId_position: { raceId, position: r.position } },
        update: { horseId: r.horseId },
        create: { raceId, horseId: r.horseId, position: r.position },
      });
    }

    await prisma.race.update({
      where: { id: raceId },
      data: { status: 'finished' },
    });

    const tickets = await prisma.ticket.findMany({
      where: { raceId, isScored: false },
    });

    const scoredTickets = [];

    for (const ticket of tickets) {
      const points = scoreTicket(ticket.strategy, ticket.picks, results);

      await prisma.ticket.update({
        where: { id: ticket.id },
        data: { pointsEarned: points, isScored: true },
      });

      const entry = await prisma.leaderboardEntry.upsert({
        where: {
          userId_tournamentId: {
            userId: ticket.userId,
            tournamentId: race.tournamentId,
          },
        },
        update: {
          totalPoints: { increment: points },
          racesPlayed: { increment: 1 },
          ...(ticket.strategy === 'full_point' ? { fullPoints: { increment: points } } : {}),
          ...(ticket.strategy === 'dual_point' ? { dualPoints: { increment: points } } : {}),
          ...(ticket.strategy === 'smart_pick' ? { smartPoints: { increment: points } } : {}),
          ...(points > 0 ? { winStreak: { increment: 1 } } : { winStreak: 0 }),
        },
        create: {
          userId: ticket.userId,
          tournamentId: race.tournamentId,
          totalPoints: points,
          racesPlayed: 1,
          fullPoints: ticket.strategy === 'full_point' ? points : 0,
          dualPoints: ticket.strategy === 'dual_point' ? points : 0,
          smartPoints: ticket.strategy === 'smart_pick' ? points : 0,
          winStreak: points > 0 ? 1 : 0,
          bestStreak: points > 0 ? 1 : 0,
        },
      });

      if (entry.winStreak > entry.bestStreak) {
        await prisma.leaderboardEntry.update({
          where: { id: entry.id },
          data: { bestStreak: entry.winStreak },
        });
      }

      await prisma.userStats.upsert({
        where: { userId: ticket.userId },
        update: {
          totalPoints: { increment: points },
          totalRaces: { increment: 1 },
        },
        create: {
          userId: ticket.userId,
          totalPoints: points,
          totalRaces: 1,
        },
      });

      scoredTickets.push({
        ticketId: ticket.id,
        userId: ticket.userId,
        strategy: ticket.strategy,
        points,
      });
    }

    const nextRaceNum = race.raceNumber + 1;
    const nextRace = await prisma.race.findUnique({
      where: { tournamentId_raceNumber: { tournamentId: race.tournamentId, raceNumber: nextRaceNum } },
    });

    if (nextRace) {
      await prisma.tournament.update({
        where: { id: race.tournamentId },
        data: { currentRace: nextRaceNum, status: 'live' },
      });
      await prisma.race.update({
        where: { id: nextRace.id },
        data: { status: 'open' },
      });
    } else {
      await prisma.tournament.update({
        where: { id: race.tournamentId },
        data: { status: 'finished', currentRace: race.raceNumber },
      });
    }

    return NextResponse.json({
      message: `Race ${race.raceNumber} scored. ${scoredTickets.length} tickets processed.`,
      scoredTickets,
    });
  } catch (error) {
    console.error('Race result error:', error);
    return NextResponse.json({ error: 'Failed to process race results' }, { status: 500 });
  }
}
