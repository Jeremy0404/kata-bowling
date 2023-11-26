export class Game {
  constructor() {}

  printScore(resultString: string): number {
    const turns = resultString.split(' ');
    let score: number = 0;
    turns.forEach((turn: string) => {
      score += +turn.split('')[0];
    });

    return score;
  }
}
