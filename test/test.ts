import { Handler } from '../src/handler';
import { Game } from '../src/game';

describe('bowling', () => {
  it('scores without modifier', () => {
    const handler = new Handler(new Game());
    expect(handler.execute('9- 9- 9- 9- 9- 9- 9- 9- 9- 9-')).toStrictEqual(90);
  });
});
