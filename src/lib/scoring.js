/**
 * 50Points Scoring Engine
 *
 * Strategies:
 *   Full Point (50pts) - Pick the exact winner (1st place)
 *   Dual Point (25+15=40pts max) - Pick 1st and 2nd place
 *   Smart Pick (30+20+10=60pts max) - Pick top 3 in order
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

export function scoreTicket(strategy, picks, results) {
  const picksArr = typeof picks === 'string' ? JSON.parse(picks) : picks;

  const resultMap = {};
  for (const r of results) {
    resultMap[r.position] = r.horseId;
  }

  let points = 0;

  switch (strategy) {
    case STRATEGIES.FULL_POINT: {
      if (picksArr[0] === resultMap[1]) {
        points = 50;
      }
      break;
    }

    case STRATEGIES.DUAL_POINT: {
      if (picksArr[0] === resultMap[1]) points += 25;
      if (picksArr[1] === resultMap[2]) points += 15;
      break;
    }

    case STRATEGIES.SMART_PICK: {
      if (picksArr[0] === resultMap[1]) points += 30;
      if (picksArr[1] === resultMap[2]) points += 20;
      if (picksArr[2] === resultMap[3]) points += 10;
      break;
    }
  }

  return points;
}

export function getMaxPoints(strategy) {
  switch (strategy) {
    case STRATEGIES.FULL_POINT: return 50;
    case STRATEGIES.DUAL_POINT: return 40;
    case STRATEGIES.SMART_PICK: return 60;
    default: return 0;
  }
}

export function getRequiredPicks(strategy) {
  switch (strategy) {
    case STRATEGIES.FULL_POINT: return 1;
    case STRATEGIES.DUAL_POINT: return 2;
    case STRATEGIES.SMART_PICK: return 3;
    default: return 0;
  }
}
