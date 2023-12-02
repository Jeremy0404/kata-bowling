import { Handler } from '../src/handler';
import { Game } from '../src/game';

function verify(scoresString: string, expected: number) {
  const handler = new Handler(new Game());
  expect(handler.execute(scoresString)).toStrictEqual(expected);
}

describe('Bowling Score Calculator', () => {
  it('scores a game with no strikes or spares', () => {
    verify('9- 9- 9- 9- 9- 9- 9- 9- 9- 9-', 90);
  });

  it('scores a game with all spares', () => {
    verify('5/ 5/ 5/ 5/ 5/ 5/ 5/ 5/ 5/ 5/5', 150);
  });

  it('scores a perfect game', () => {
    verify('X X X X X X X X X XXX', 300);
  });
});
