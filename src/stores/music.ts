import { writable, derived, get } from 'svelte/store';

export const playing = writable(false);
export const duration = writable(1000.0);
export const ms = writable(0.0);
export const progress = derived(
  [duration, ms],
  ([$duration, $ms]) => $ms / $duration
);

function seek(new_ms: number): void {
  ms.set(Math.max(0, Math.min(get(duration), new_ms)));
}
function tick(delta: number): void {
  seek(get(ms) + delta);
  if (Math.abs(get(ms) - get(duration)) < 1e-3) ops.pause();
}

class Ticker {
  working = false;
  last?: number;

  update = (time: number) => {
    if (this.last && this.working) this.cb(time - this.last);
    this.last = time;
    requestAnimationFrame(this.update);
  };

  constructor(public cb: (delta: number) => void) {
    requestAnimationFrame(this.update);
  }
}
const ticker = new Ticker(tick);

export const ops = {
  play(): void {
    playing.set(true);
    ticker.working = true;
  },
  pause(): void {
    playing.set(false);
    ticker.working = false;
  },
  seek,
};
