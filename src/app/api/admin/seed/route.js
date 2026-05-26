import { NextResponse } from 'next/server';
import prisma from '@/lib/db';

const silkColors = [
  { primary: '#e11d48', secondary: '#fbbf24' },
  { primary: '#2563eb', secondary: '#ffffff' },
  { primary: '#16a34a', secondary: '#000000' },
  { primary: '#7c3aed', secondary: '#f59e0b' },
  { primary: '#dc2626', secondary: '#1d4ed8' },
  { primary: '#0891b2', secondary: '#fde047' },
  { primary: '#ea580c', secondary: '#1e293b' },
  { primary: '#4f46e5', secondary: '#f43f5e' },
  { primary: '#059669', secondary: '#fbbf24' },
  { primary: '#be185d', secondary: '#e2e8f0' },
  { primary: '#d97706', secondary: '#1e3a5f' },
  { primary: '#7c3aed', secondary: '#06b6d4' },
];

const horseNames = [
  'Thunder Strike', 'Golden Spirit', 'Midnight Runner', 'Silver Blaze',
  'Iron Warrior', 'Royal Command', 'Storm Chaser', 'Dark Phantom',
  'Blazing Star', 'Noble Quest', 'Wild Fortune', 'Diamond Edge',
  'Crimson Bolt', 'Shadow Dance', 'Lucky Phoenix', 'Brave Heart',
  'Regal Prince', 'Fast Legend', 'Sea Whisper', 'Titan Force',
  'Velvet Storm', 'Crystal Arrow', 'Scarlet Fury', 'Emerald Dream',
  'Alpine Thunder', 'Desert Wind', 'Cosmic Flare', 'Neptune Rising',
  'Falcon Ridge', 'Amber Blaze', 'Pacific Tide', 'Victory Lane',
  'Rebel Spirit', 'Onyx Knight', 'Sapphire Sky', 'Burning Desire',
  'Phantom Rider', 'Crown Jewel', 'Steel Tempest', 'River Stone',
  'Quantum Leap', 'Night Fury', 'Golden Compass', 'Crimson Tide',
  'Silent Arrow', 'Thunderbolt', 'Stellar Drift', 'Wild Horizon',
  'Iron Crown', 'Blazing Trail', 'Dark Sovereign', 'Royal Anthem',
  'Storm Legacy', 'Silver Phantom', 'Diamond Rush', 'Noble Flame',
  'Scarlet Runner', 'Emerald Knight', 'Desert Storm', 'Lightning Bolt',
  'Brave Venture', 'Midnight Gold', 'Regal Storm', 'Wild Card',
  'Crystal Reign', 'Cosmic Thunder', 'Alpine Spirit', 'Falcon Blaze',
  'Pacific Dream', 'Amber Storm', 'Victory Bound', 'Steel Heart',
  'Shadow Reign', 'Night Rider', 'Golden Arrow', 'Thunder Peak',
  'Crimson Star', 'Neptune Force', 'Rebel Crown', 'Silent Storm',
];

const jockeyNames = [
  'Luis Saez', 'Irad Ortiz Jr', 'Joel Rosario', 'Flavien Prat',
  'John Velazquez', 'Tyler Gaffalione', 'Jose Ortiz', 'Mike Smith',
  'Javier Castellano', 'Florent Geroux', 'Ricardo Santana Jr', 'Manny Franco',
];

const trainerNames = [
  'Todd Pletcher', 'Bob Baffert', 'Chad Brown', 'Steve Asmussen',
  'Brad Cox', 'Bill Mott', 'Mark Casse', 'Christophe Clement',
];

function generateOdds() {
  const ranges = [
    { min: 1.5, max: 3.0, weight: 15 },
    { min: 3.0, max: 6.0, weight: 30 },
    { min: 6.0, max: 12.0, weight: 30 },
    { min: 12.0, max: 25.0, weight: 25 },
  ];
  const total = ranges.reduce((s, r) => s + r.weight, 0);
  let rand = Math.random() * total;
  for (const range of ranges) {
    rand -= range.weight;
    if (rand <= 0) {
      return parseFloat((range.min + Math.random() * (range.max - range.min)).toFixed(2));
    }
  }
  return 5.0;
}

function shuffle(arr) {
  const a = [...arr];
  for (let i = a.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [a[i], a[j]] = [a[j], a[i]];
  }
  return a;
}

const tournamentsData = [
  {
    slug: 'gulfstream-park-2026',
    name: 'Gulfstream Park Championship',
    track: 'Gulfstream Park',
    location: 'Hallandale Beach, FL',
    status: 'live',
    totalRaces: 10,
    currentRace: 4,
    date: new Date('2026-05-26T14:00:00Z'),
    description: 'Premier South Florida racing event featuring top thoroughbreds',
  },
  {
    slug: 'churchill-downs-classic',
    name: 'Churchill Downs Classic',
    track: 'Churchill Downs',
    location: 'Louisville, KY',
    status: 'live',
    totalRaces: 12,
    currentRace: 7,
    date: new Date('2026-05-26T13:00:00Z'),
    description: 'Historic Kentucky racing with world-class competition',
  },
  {
    slug: 'santa-anita-stakes',
    name: 'Santa Anita Stakes',
    track: 'Santa Anita Park',
    location: 'Arcadia, CA',
    status: 'upcoming',
    totalRaces: 8,
    currentRace: 0,
    date: new Date('2026-05-27T17:00:00Z'),
    description: 'West Coast premier thoroughbred racing series',
  },
];

const fakeUsers = [
  'ThunderHoof', 'LuckyStrike', 'GoldenGallop', 'SilverSpur', 'IronRider',
  'RoyalFlush', 'StormChaser', 'DarkHorse', 'BravePick', 'NobleQuest',
  'WildCard', 'DiamondEdge', 'CrimsonBolt', 'ShadowDancer', 'StarPicker',
  'FastLegend', 'TitanForce', 'VelvetStorm', 'CrystalArrow', 'ScarletFury',
  'DesertWind', 'CosmicFlare', 'FalconRidge', 'AmberBlaze', 'SteelHeart',
  'NightRider', 'GoldenArrow', 'RebelCrown', 'SilentStorm', 'MidnightGold',
];

export async function POST() {
  try {
    await prisma.raceResult.deleteMany();
    await prisma.ticket.deleteMany();
    await prisma.leaderboardEntry.deleteMany();
    await prisma.userStats.deleteMany();
    await prisma.horse.deleteMany();
    await prisma.race.deleteMany();
    await prisma.tournament.deleteMany();
    await prisma.user.deleteMany();

    const colors = ['#7c3aed', '#e11d48', '#2563eb', '#16a34a', '#ea580c', '#0891b2', '#d946ef'];
    const users = [];
    for (let i = 0; i < fakeUsers.length; i++) {
      const isGuest = i % 5 === 0;
      const user = await prisma.user.create({
        data: {
          username: fakeUsers[i],
          avatarColor: colors[Math.floor(Math.random() * colors.length)],
          isGuest,
          gameMode: isGuest ? 1 : 2,
          passwordHash: isGuest ? null : '$2a$10$placeholder_hash_for_seed_data',
        },
      });
      await prisma.userStats.create({ data: { userId: user.id } });
      users.push(user);
    }

    let nameIdx = 0;

    for (const tData of tournamentsData) {
      const tournament = await prisma.tournament.create({ data: tData });

      for (let rn = 1; rn <= tData.totalRaces; rn++) {
        const horsesInRace = 8 + Math.floor(Math.random() * 5);
        const isFinished = rn < tData.currentRace;
        const isOpen = rn === tData.currentRace;
        const status = isFinished ? 'finished' : isOpen ? 'open' : 'upcoming';

        const hour = 13 + Math.floor(rn / 2);
        const min = (rn % 2 === 0) ? '30' : '00';

        const race = await prisma.race.create({
          data: {
            tournamentId: tournament.id,
            raceNumber: rn,
            name: `Race ${rn} - ${['Maiden', 'Claiming', 'Allowance', 'Stakes', 'Handicap', 'Graded Stakes'][rn % 6]}`,
            status,
            scheduledTime: `${hour}:${min} PM`,
            distance: [1100, 1200, 1400, 1600, 1800, 2000, 2400][Math.floor(Math.random() * 7)],
            surface: ['Dirt', 'Turf', 'Synthetic'][Math.floor(Math.random() * 3)],
            raceClass: ['Maiden', 'Claiming', 'Allowance', 'Stakes', 'G3', 'G2', 'G1'][rn % 7],
            purse: [25000, 50000, 75000, 100000, 150000, 250000][Math.floor(Math.random() * 6)],
          },
        });

        const horses = [];
        for (let pp = 1; pp <= horsesInRace; pp++) {
          const silk = silkColors[(nameIdx + pp) % silkColors.length];
          const horse = await prisma.horse.create({
            data: {
              raceId: race.id,
              postPosition: pp,
              name: horseNames[nameIdx % horseNames.length],
              jockey: jockeyNames[(nameIdx + pp) % jockeyNames.length],
              trainer: trainerNames[(nameIdx + pp) % trainerNames.length],
              odds: generateOdds(),
              silkPrimary: silk.primary,
              silkSecondary: silk.secondary,
            },
          });
          horses.push(horse);
          nameIdx++;
        }

        if (isFinished) {
          const finishing = shuffle(horses);
          for (let pos = 1; pos <= Math.min(finishing.length, 5); pos++) {
            await prisma.raceResult.create({
              data: {
                raceId: race.id,
                horseId: finishing[pos - 1].id,
                position: pos,
              },
            });
          }

          const participatingUsers = shuffle(users).slice(0, 10 + Math.floor(Math.random() * 15));
          for (const user of participatingUsers) {
            const strategies = ['full_point', 'dual_point', 'smart_pick'];
            const strategy = strategies[Math.floor(Math.random() * strategies.length)];
            const picksCount = strategy === 'full_point' ? 1 : strategy === 'dual_point' ? 2 : 3;
            const shuffledHorses = shuffle(horses);
            const picks = shuffledHorses.slice(0, picksCount).map(h => h.id);

            // WIN-WIN scoring: check if any pick matches the winner (1st place only)
            const winnerId = finishing[0].id;
            const allocations = { full_point: [50], dual_point: [25, 25], smart_pick: [30, 15, 5] };
            const alloc = allocations[strategy] || [];
            let points = 0;
            for (let pi = 0; pi < picks.length; pi++) {
              if (picks[pi] === winnerId) {
                const winnerHorse = horses.find(h => h.id === winnerId);
                const odds = winnerHorse ? winnerHorse.odds : 1;
                points = Math.round(alloc[pi] * odds);
                break;
              }
            }

            try {
              await prisma.ticket.create({
                data: {
                  userId: user.id,
                  raceId: race.id,
                  tournamentId: tournament.id,
                  ticketNumber: 1,
                  strategy,
                  picks: JSON.stringify(picks),
                  pointsEarned: points,
                  isScored: true,
                },
              });

              await prisma.leaderboardEntry.upsert({
                where: {
                  userId_tournamentId_ticketNumber: { userId: user.id, tournamentId: tournament.id, ticketNumber: 1 },
                },
                update: {
                  totalPoints: { increment: points },
                  racesPlayed: { increment: 1 },
                  ...(strategy === 'full_point' ? { fullPoints: { increment: points } } : {}),
                  ...(strategy === 'dual_point' ? { dualPoints: { increment: points } } : {}),
                  ...(strategy === 'smart_pick' ? { smartPoints: { increment: points } } : {}),
                },
                create: {
                  userId: user.id,
                  tournamentId: tournament.id,
                  ticketNumber: 1,
                  totalPoints: points,
                  racesPlayed: 1,
                  fullPoints: strategy === 'full_point' ? points : 0,
                  dualPoints: strategy === 'dual_point' ? points : 0,
                  smartPoints: strategy === 'smart_pick' ? points : 0,
                },
              });

              await prisma.userStats.update({
                where: { userId: user.id },
                data: {
                  totalPoints: { increment: points },
                  totalRaces: { increment: 1 },
                },
              });
            } catch {
              // skip duplicate tickets
            }
          }
        }
      }
    }

    const tournamentCount = await prisma.tournament.count();
    const raceCount = await prisma.race.count();
    const horseCount = await prisma.horse.count();
    const ticketCount = await prisma.ticket.count();
    const userCount = await prisma.user.count();

    return NextResponse.json({
      message: 'Database seeded successfully',
      stats: { tournaments: tournamentCount, races: raceCount, horses: horseCount, tickets: ticketCount, users: userCount },
    });
  } catch (error) {
    console.error('Seed error:', error);
    return NextResponse.json({ error: 'Seed failed: ' + error.message }, { status: 500 });
  }
}
