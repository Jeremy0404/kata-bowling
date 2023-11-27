export class Game {
  constructor() {}

  printScore(resultString: string): number {
    const turnScores = resultString.split(' ');
    let score = 0;

    for (let i = 0; i < turnScores.length; i++) {
      if (turnScores[i].includes('/')) {
        score += 10;
        if (i + 1 < turnScores.length) {
          const nextTurnScore = turnScores[i + 1];
          const nextThrow =
            nextTurnScore[0] === '-' ? 0 : parseInt(nextTurnScore[0]);
          score += nextThrow;
        } else if (i === 9) {
          const extraThrow =
            turnScores[i].length > 2 ? parseInt(turnScores[i][2]) : 0;
          score += extraThrow;
        }
      } else {
        score += turnScores[i]
          .split('')
          .reduce((acc, val) => acc + (val === '-' ? 0 : parseInt(val)), 0);
      }
    }

    return score;
  }
}
