#!/usr/bin/env node
// Auto-populate race data from The Racing API
// Usage: RACING_API_KEY=your_key node scripts/fetchRaces.js [track] [date]
// Example: RACING_API_KEY=abc123 node scripts/fetchRaces.js gulfstream-park 2026-05-25
//
// Without an API key, generates sample data structure for testing

const https = require('https');
const fs = require('fs');
const path = require('path');

const API_BASE = 'https://api.theracingapi.com/v1';

const TRACKS = {
  'gulfstream-park': { name: 'Gulfstream Park', location: 'Hallandale Beach, FL' },
  'santa-anita': { name: 'Santa Anita Park', location: 'Arcadia, CA' },
  'churchill-downs': { name: 'Churchill Downs', location: 'Louisville, KY' },
  'belmont-park': { name: 'Belmont Park', location: 'Elmont, NY' },
  'saratoga': { name: 'Saratoga Race Course', location: 'Saratoga Springs, NY' },
  'keeneland': { name: 'Keeneland', location: 'Lexington, KY' },
  'del-mar': { name: 'Del Mar', location: 'Del Mar, CA' },
};

const SILK_COLORS = [
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

function fetchJson(url, apiKey) {
  return new Promise((resolve, reject) => {
    const options = {
      headers: apiKey ? { Authorization: `Basic ${Buffer.from(apiKey + ':').toString('base64')}` } : {},
    };
    https.get(url, options, (res) => {
      let data = '';
      res.on('data', (chunk) => (data += chunk));
      res.on('end', () => {
        try { resolve({ status: res.statusCode, data: JSON.parse(data) }); }
        catch (e) { reject(new Error(`Parse error: ${e.message}`)); }
      });
    }).on('error', reject);
  });
}

function normalizeApiRace(race, idx) {
  return {
    id: race.race_id || `race-api-${idx}`,
    number: idx + 1,
    name: race.race_name || `Race ${idx + 1}`,
    class: race.race_class || 'Open',
    distance: race.distance_f ? Math.round(parseFloat(race.distance_f) * 201.168) : 1600,
    surface: race.going || 'Dirt',
    purse: race.prize ? parseInt(race.prize.replace(/[^0-9]/g, '')) : 0,
    postTime: race.off_dt || `${12 + idx}:00 ET`,
    status: 'upcoming',
    horses: (race.runners || []).map((r, hi) => ({
      id: r.horse_id || `h-api-${idx}-${hi}`,
      postPosition: r.draw || hi + 1,
      name: r.horse || `Horse ${hi + 1}`,
      jockey: r.jockey || 'Unknown',
      trainer: r.trainer || 'Unknown',
      weight: r.lbs ? Math.round(r.lbs * 0.453592) : 56,
      odds: r.odds ? parseFloat(r.odds) : (2 + Math.random() * 15).toFixed(2) * 1,
      silkColors: SILK_COLORS[hi % SILK_COLORS.length],
    })),
  };
}

function generateTestData(trackId) {
  const track = TRACKS[trackId] || TRACKS['gulfstream-park'];
  const races = [];
  const horsePool = [
    'Thunder Strike', 'Golden Spirit', 'Midnight Runner', 'Silver Blaze',
    'Iron Warrior', 'Royal Command', 'Storm Chaser', 'Dark Phantom',
    'Blazing Star', 'Noble Quest', 'Wild Fortune', 'Diamond Edge',
  ];
  const jockeyPool = [
    'Luis Saez', 'Irad Ortiz Jr', 'Joel Rosario', 'Flavien Prat',
    'John Velazquez', 'Tyler Gaffalione', 'Jose Ortiz', 'Mike Smith',
  ];
  const trainerPool = [
    'Todd Pletcher', 'Bob Baffert', 'Chad Brown', 'Steve Asmussen',
    'Brad Cox', 'Bill Mott', 'Mark Casse', 'Christophe Clement',
  ];
  const classes = ['Maiden Special Weight', 'Claiming $25,000', 'Allowance', 'Graded Stakes III', 'Graded Stakes II', 'Graded Stakes I'];
  const distances = [1000, 1200, 1400, 1600, 1800, 2000];

  for (let i = 0; i < 8; i++) {
    const horseCount = 8 + Math.floor(Math.random() * 4);
    const horses = [];
    for (let h = 0; h < horseCount; h++) {
      horses.push({
        id: `h-test-${i}-${h}`,
        postPosition: h + 1,
        name: horsePool[h % horsePool.length],
        jockey: jockeyPool[h % jockeyPool.length],
        trainer: trainerPool[h % trainerPool.length],
        weight: 54 + Math.floor(Math.random() * 8),
        odds: parseFloat((1.5 + Math.random() * 20).toFixed(2)),
        silkColors: SILK_COLORS[h % SILK_COLORS.length],
      });
    }
    races.push({
      id: `race-test-${i}`,
      number: i + 1,
      name: i === 7 ? `${track.name} Feature` : `Race ${i + 1}`,
      class: classes[i % classes.length],
      distance: distances[i % distances.length],
      surface: i % 3 === 0 ? 'Turf' : 'Dirt',
      purse: [25000, 50000, 75000, 100000, 150000, 200000, 250000, 500000][i],
      postTime: `${12 + i}:${(i * 30) % 60 || '00'} ET`,
      status: 'upcoming',
      horses,
    });
  }

  return {
    id: `${trackId}-test`,
    name: `${track.name} Test Tournament`,
    track: track.name,
    location: track.location,
    date: new Date().toISOString().split('T')[0],
    status: 'upcoming',
    totalPlayers: 0,
    playersJoined: 0,
    racesCompleted: 0,
    totalRaces: races.length,
    description: `Auto-generated test tournament for ${track.name}`,
    races,
  };
}

async function main() {
  const apiKey = process.env.RACING_API_KEY;
  const trackId = process.argv[2] || 'gulfstream-park';
  const date = process.argv[3] || new Date().toISOString().split('T')[0];
  const outputPath = path.join(__dirname, '..', 'src', 'lib', 'fetchedData.json');

  console.log(`\n50POINTS - Race Data Fetcher`);
  console.log(`Track: ${trackId}`);
  console.log(`Date: ${date}`);
  console.log(`API Key: ${apiKey ? 'configured' : 'not set (using test data)'}\n`);

  let tournament;

  if (apiKey) {
    console.log('Fetching from The Racing API...');
    try {
      const result = await fetchJson(`${API_BASE}/racecards?course=${trackId}&date=${date}`, apiKey);
      if (result.status === 200 && result.data.racecards) {
        const races = result.data.racecards.map((r, i) => normalizeApiRace(r, i));
        const track = TRACKS[trackId] || { name: trackId, location: '' };
        tournament = {
          id: `${trackId}-${date}`,
          name: `${track.name} - ${date}`,
          track: track.name,
          location: track.location,
          date,
          status: 'upcoming',
          totalPlayers: 0,
          playersJoined: 0,
          racesCompleted: 0,
          totalRaces: races.length,
          description: `Auto-populated from The Racing API`,
          races,
        };
        console.log(`SUCCESS: Fetched ${races.length} races with ${races.reduce((s, r) => s + r.horses.length, 0)} total horses`);
      } else {
        console.log(`API returned status ${result.status}. Falling back to test data.`);
        tournament = generateTestData(trackId);
      }
    } catch (err) {
      console.log(`API error: ${err.message}. Falling back to test data.`);
      tournament = generateTestData(trackId);
    }
  } else {
    console.log('No API key set. Generating test data structure...');
    tournament = generateTestData(trackId);
  }

  // Validate
  let issues = 0;
  tournament.races.forEach((race, ri) => {
    if (!race.horses || race.horses.length === 0) {
      console.log(`  WARNING: Race ${ri + 1} has no horses`);
      issues++;
    }
    race.horses.forEach((h, hi) => {
      if (!h.name) { console.log(`  WARNING: Race ${ri + 1}, Horse ${hi + 1} has no name`); issues++; }
    });
  });

  console.log(`\nValidation: ${issues === 0 ? 'PASSED' : `${issues} issue(s)`}`);
  console.log(`Races: ${tournament.races.length}`);
  console.log(`Horses: ${tournament.races.reduce((s, r) => s + r.horses.length, 0)}`);

  // Save
  fs.writeFileSync(outputPath, JSON.stringify([tournament], null, 2));
  console.log(`\nSaved to: ${outputPath}`);
  console.log('Done.\n');
}

main().catch(console.error);
