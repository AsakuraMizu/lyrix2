import { get, writable } from 'svelte/store';

export const fontSize = writable(48);
export const padding = writable(12);

export interface Settings {
  fontSize: number;
  padding: number;
}

export const entryName = 'settings';

export const ops = {
  async save(): Promise<void> {
    localStorage.setItem(
      entryName,
      JSON.stringify({
        fontSize: get(fontSize),
        padding: get(padding),
      })
    );
  },
  async load(): Promise<void> {
    const result = localStorage.getItem(entryName);
    if (result) {
      const settings: Settings = JSON.parse(result);
      fontSize.set(settings.fontSize);
      padding.set(settings.padding);
    }
  },
};
