/**
 * 50Points Scoring Engine
 *
 * ALL strategies are WIN-WIN: every pick is a bet on which horse WINS (1st place).
 * Total allocation per race is always 50 points.
 *
 *   Full Point  - 1 horse, 50 pts if it wins
 *   Dual Point  - 2 horses, 25+25 pts (whichever wins earns its allocation)
 *   Smart Pick  - 3 horses, 30+15+5 pts (whichever wins earns its allocation)
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

export function scoreTicket(strategy, picks, results) {
  const picksArr = typeof picks === 'string' ? JSON.parse(picks) : picks;

  const winner = results.find((r) => r.position === 1);
  if (!winner) return 0;

  const allocation = ALLOCATIONS[strategy] || [];

  for (let i = 0; i < picksArr.length; i++) {
    if (picksArr[i] === winner.horseId) {
      return allocation[i] || 0;
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
