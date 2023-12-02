const STRIKE = 'X';
const MISS = '-';
const SPARE = '/';
const STRIKE_SCORE = 10;
const SPARE_SCORE = 10;

export class Game {
  private throwScores: number[] = [];

  score(result: string): number {
    this.parse(result);
    let score = 0;
    let turnIndex = 0;

    for (let turn = 0; turn < 10; turn++) {
      score += this.turnScore(turnIndex);
      turnIndex = this.nextTurnIndex(turnIndex);
    }

    return score;
  }

  private turnScore(turnIndex: number): number {
    if (this.isStrike(turnIndex)) {
      return this.strikeScore(turnIndex);
    }

    if (this.isSpare(turnIndex)) {
      return this.spareScore(turnIndex);
    }

    return this.normalTurnScore(turnIndex);
  }

  private nextTurnIndex(turnIndex: number): number {
    return this.isStrike(turnIndex) ? turnIndex + 1 : turnIndex + 2;
  }

  private isStrike(turnIndex: number): boolean {
    return this.throwScores[turnIndex] === 10;
  }

  private strikeScore(turnIndex: number): number {
    return 10 + this.strikeBonus(turnIndex);
  }

  private strikeBonus(turnIndex: number): number {
    return (
      (this.throwScores[turnIndex + 1] || 0) +
      (this.throwScores[turnIndex + 2] || 0)
    );
  }

  private isSpare(turnIndex: number): boolean {
    return this.normalTurnScore(turnIndex) === 10;
  }

  private spareScore(turnIndex: number): number {
    return 10 + this.spareBonus(turnIndex);
  }

  private spareBonus(turnIndex: number): number {
    return this.throwScores[turnIndex + 2] || 0;
  }

  private normalTurnScore(turnIndex: number): number {
    return this.throwScores[turnIndex] + this.throwScores[turnIndex + 1];
  }

  private parse(result: string) {
    result
      .split(' ')
      .forEach((turn) =>
        turn.split('').forEach((roll) => this.processRollResult(roll)),
      );
  }

  private processRollResult(result: string) {
    switch (result) {
      case STRIKE:
        this.throwScores.push(STRIKE_SCORE);
        break;
      case MISS:
        this.throwScores.push(0);
        break;
      case SPARE:
        // eslint-disable-next-line no-case-declarations
        const previousRollScore = this.throwScores[this.throwScores.length - 1];
        this.throwScores.push(SPARE_SCORE - previousRollScore);
        break;
      default:
        this.throwScores.push(parseInt(result, 10));
    }
  }
}
