import { tournaments } from '@/lib/raceData';
import TournamentClient from './TournamentClient';

export function generateStaticParams() {
  return tournaments.map((t) => ({ id: t.id }));
}

export default function TournamentPage() {
  return <TournamentClient />;
}
