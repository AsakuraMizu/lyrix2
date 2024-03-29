import type { Entry, Provider } from './interface';
import client from './client';

interface SearchResult {
  result: {
    songs: Array<{
      name: string;
      id: number;
      artists: Array<{ name: string }>;
      album: { name: string };
    }>;
  };
}

interface MediaResult {
  lyric: string;
}

export default class MetEaseCLoudProvider implements Provider {
  name = '网易云';
  NMTID: string;

  constructor() {
    client.get('http://music.163.com').then((res) => {
      this.NMTID = res.headers['set-cookie'][0].match(/NMTID: (.*?);/)[1];
    });
  }

  async *search(keyword: string): AsyncGenerator<Entry> {
    let page = 1;
    let finished = false;
    while (!finished) {
      const result = (
        await client.post<SearchResult>(
          'http://music.163.com/api/search/pc',
          new URLSearchParams({
            s: keyword,
            offset: `${(page - 1) * 30}`,
            limit: '30',
            type: '1',
          }),
          {
            headers: {
              Cookie: `NMTID=${this.NMTID}`,
            },
          }
        )
      ).data;
      if (result.result.songs.length === 0) {
        finished = true;
      } else {
        for (const e of result.result.songs) {
          yield {
            name: e.name,
            artist: e.artists.map((a) => a.name).join('/'),
            album: e.album.name,
            ref: e.id.toString(),
          };
        }
        ++page;
      }
    }
  }

  async getLrc(ref: string): Promise<string> {
    const result = await client.get<MediaResult>(
      'http://music.163.com/api/song/media',
      {
        params: { id: ref },
      }
    );
    return result.data.lyric;
  }
}
