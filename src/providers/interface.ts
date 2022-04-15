export interface Entry {
  name: string;
  artist: string;
  album: string;
  ref: string;
}

export interface Provider {
  name: string;
  search(keyword: string): AsyncGenerator<Entry>;
  getLrc(ref: string): Promise<string>;
}
