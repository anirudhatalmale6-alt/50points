import { tournaments } from '@/lib/raceData';
import RaceClient from './RaceClient';

export function generateStaticParams() {
  const params = [];
  for (const t of tournaments) {
    for (const r of t.races) {
      params.push({ id: t.id, raceId: r.id });
    }
  }
  return params;
}

export default function RacePage() {
  return <RaceClient />;
}
