export class Game {
  private static readonly MAX_TURN_SCORES = 10;
  private static readonly SPARE_SCORE = 10;

  calculateScore(resultString: string): number {
    const turnScores = resultString.split(' ');
    let score = 0;

    for (let i = 0; i < turnScores.length; i++) {
      if (this.isStrike(turnScores[i])) {
        score += this.calculateStrikeScore(turnScores, i);
      } else if (this.isSpare(turnScores[i])) {
        score += this.calculateSpareScore(turnScores, i);
      } else {
        score += this.calculateTurnScore(turnScores[i]);
      }
    }

    return score;
  }

  private isSpare(turnScore: string): boolean {
    return turnScore.includes('/');
  }

  private isStrike(turnScore: string): boolean {
    return turnScore.includes('X');
  }

  private calculateSpareScore(
    turnScores: string[],
    turnScoreIndex: number,
  ): number {
    let spareScore = Game.SPARE_SCORE;
    if (turnScoreIndex + 1 < turnScores.length) {
      spareScore += this.getFirstThrowScore(turnScores[turnScoreIndex + 1]);
    } else if (turnScoreIndex === Game.MAX_TURN_SCORES - 1) {
      spareScore += this.getScoreOfNextThrows(turnScores, turnScoreIndex, 1);
    }
    return spareScore;
  }

  private calculateTurnScore(turnScore: string): number {
    return turnScore
      .split('')
      .reduce((acc, val) => acc + (val === '-' ? 0 : parseInt(val)), 0);
  }

  private getFirstThrowScore(turnScore: string): number {
    return turnScore[0] === '-' ? 0 : parseInt(turnScore[0]);
  }

  private getExtraThrowScore(turnScore: string): number {
    return turnScore.length > 2 ? parseInt(turnScore[2]) : 0;
  }

  private calculateStrikeScore(
    turnScores: string[],
    turnScoreIndex: number,
  ): number {
    if (this.isLastThrow(turnScoreIndex)) {
      return 30;
    }
    return 10 + this.getScoreOfNextThrows(turnScores, turnScoreIndex, 2);
  }

  private isLastThrow(turnScoreIndex: number) {
    return turnScoreIndex === Game.MAX_TURN_SCORES - 1;
  }

  private getScoreOfNextThrows(
    turnScores: string[],
    currentIndex: number,
    throwsCount: number,
  ): number {
    let score = 0;
    let throwsRemaining = throwsCount;

    for (
      let i = currentIndex + 1;
      i < turnScores.length && throwsRemaining > 0;
      i++
    ) {
      if (this.isStrike(turnScores[i])) {
        score += 10;
        throwsRemaining--;
      } else if (this.isSpare(turnScores[i])) {
        score += 10;
        break;
      } else {
        const frameThrows = turnScores[i].split('');
        for (const throwScore of frameThrows) {
          if (throwsRemaining === 0) break;
          score += throwScore === '-' ? 0 : parseInt(throwScore);
          throwsRemaining--;
        }
      }
    }

    return score;
  }
}
