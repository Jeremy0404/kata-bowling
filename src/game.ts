export class Game {
  private static readonly MAX_TURN_SCORES = 10;
  private static readonly SPARE_SCORE = 10;

  calculateScore(resultString: string): number {
    const turnScores = resultString.split(' ');
    let score = 0;

    for (let i = 0; i < turnScores.length; i++) {
      score += this.isSpare(turnScores[i])
        ? this.calculateSpareScore(turnScores, i)
        : this.calculateTurnScoreScore(turnScores[i]);
    }

    return score;
  }

  private isSpare(turnScore: string): boolean {
    return turnScore.includes('/');
  }

  private calculateSpareScore(
    turnScores: string[],
    turnScoreIndex: number,
  ): number {
    let spareScore = Game.SPARE_SCORE;
    if (turnScoreIndex + 1 < turnScores.length) {
      spareScore += this.getFirstThrowScore(turnScores[turnScoreIndex + 1]);
    } else if (turnScoreIndex === Game.MAX_TURN_SCORES - 1) {
      spareScore += this.getExtraThrowScore(turnScores[turnScoreIndex]);
    }
    return spareScore;
  }

  private calculateTurnScoreScore(turnScore: string): number {
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
}
