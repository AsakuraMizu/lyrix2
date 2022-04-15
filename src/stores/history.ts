import { get, writable } from 'svelte/store';

interface HistoryIndex {
  provider: number;
  ref: string;
}

interface HistoryInfo {
  name: string;
  artist: string;
  album: string;
}

interface HistoryData {
  lrc: string;
  time: number;
}

interface HistoryEntry extends HistoryIndex, HistoryInfo, HistoryData {}

export const entries = writable<HistoryEntry[]>([]);
export const entryName = 'history';

export const ops = {
  add(index: HistoryIndex, info: HistoryInfo): void {
    if (ops.get(index)) return;
    entries.update(($entries) => [
      ...$entries,
      { ...index, ...info, lrc: '', time: 0 },
    ]);
    this.save();
  },
  update(index: HistoryIndex, data: HistoryData): void {
    entries.update(($entries) => {
      const idx = $entries.findIndex(
        (e) => e.provider === index.provider && e.ref === index.ref
      );
      const result = [...$entries];
      result.push({ ...result[idx], ...data });
      result.splice(idx, 1);
      return result;
    });
    this.save();
  },
  get(index: HistoryIndex): HistoryEntry {
    return get(entries).find(
      (e) => e.provider === index.provider && e.ref === index.ref
    );
  },
  async save(): Promise<void> {
    const contents = JSON.stringify(
      get(entries)
        .sort((a, b) => a.time - b.time)
        .slice(0, 50)
    );
    localStorage.setItem(entryName, contents);
  },
  async load(): Promise<void> {
    const result = localStorage.getItem(entryName);
    if (result) entries.set(JSON.parse(result));
  },
};
