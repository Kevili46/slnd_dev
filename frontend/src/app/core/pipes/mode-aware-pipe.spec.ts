import { ModeAwarePipe } from './mode-aware-pipe';

describe('ModeAwarePipe', () => {
  it('create an instance', () => {
    const pipe = new ModeAwarePipe();
    expect(pipe).toBeTruthy();
  });
});
