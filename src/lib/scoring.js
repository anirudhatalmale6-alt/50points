/**
 * 50Points Scoring Engine
 *
 * ALL strategies are WIN-WIN: every pick is a bet on which horse WINS (1st place).
 * Points earned = allocated_points × official_odds (dividend) of the winning horse.
 * Total allocation per race is always 50 points.
 *
 *   Full Point  - 1 horse, 50 pts. If it wins: 50 × odds
 *   Dual Point  - 2 horses, 25+25 pts. Whichever wins: 25 × odds
 *   Smart Pick  - 3 horses, 30+15+5 pts. Whichever wins: allocation × odds
 */

export const STRATEGIES = {
  FULL_POINT: 'full_point',
  DUAL_POINT: 'dual_point',
  SMART_PICK: 'smart_pick',
};

export const STRATEGY_LABELS = {
  [STRATEGIES.FULL_POINT]: 'Full Point',
  [STRATEGIES.DUAL_POINT]: 'Dual Point',
  [STRATEGIES.SMART_PICK]: 'Smart Pick',
};

const ALLOCATIONS = {
  [STRATEGIES.FULL_POINT]: [50],
  [STRATEGIES.DUAL_POINT]: [25, 25],
  [STRATEGIES.SMART_PICK]: [30, 15, 5],
};

export function scoreTicket(strategy, picks, results, horses) {
  const picksArr = typeof picks === 'string' ? JSON.parse(picks) : picks;

  const winner = results.find((r) => r.position === 1);
  if (!winner) return 0;

  const allocation = ALLOCATIONS[strategy] || [];

  for (let i = 0; i < picksArr.length; i++) {
    if (picksArr[i] === winner.horseId) {
      const basePoints = allocation[i] || 0;
      const horse = horses ? horses.find((h) => h.id === winner.horseId) : null;
      const odds = horse ? horse.odds : 1;
      return Math.round(basePoints * odds);
    }
  }

  return 0;
}

export function getMaxPoints(strategy) {
  const allocation = ALLOCATIONS[strategy];
  if (!allocation) return 0;
  return Math.max(...allocation);
}

export function getRequiredPicks(strategy) {
  switch (strategy) {
    case STRATEGIES.FULL_POINT: return 1;
    case STRATEGIES.DUAL_POINT: return 2;
    case STRATEGIES.SMART_PICK: return 3;
    default: return 0;
  }
}
