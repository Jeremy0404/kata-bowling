import { Game } from './game';

export class Handler {
  constructor(private readonly game: Game) {}

  execute(turns: string) {
    return this.game.calculateScore(turns);
  }
}
