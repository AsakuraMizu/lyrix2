import { decode } from 'js-base64';
import type { Entry, Provider } from './interface';
import client from './client';

interface SearchResult {
  data: {
    info: Array<{
      songname: string;
      singername: string;
      album_name: string;
      hash: string;
    }>;
  };
}

interface KrcResult {
  candidates: Array<{
    id: string;
    accesskey: string;
    duration: number;
  }>;
}

interface LyricsResult {
  content: string;
}

export default class KugouProvider implements Provider {
  name = '酷狗';

  async *search(keyword: string): AsyncGenerator<Entry> {
    let page = 1;
    let finished = false;
    while (!finished) {
      const result = (
        await client.get<SearchResult>(
          'http://mobilecdn.kugou.com/api/v3/search/song',
          {
            params: {
              format: 'json',
              keyword: keyword,
              page,
              pagesize: 30,
            },
          }
        )
      ).data;
      if (result.data.info.length === 0) {
        finished = true;
      } else {
        for (const e of result.data.info) {
          yield {
            name: e.songname,
            artist: e.singername,
            album: e.album_name,
            ref: e.hash,
          };
        }
        ++page;
      }
    }
  }

  async getLrc(ref: string): Promise<string> {
    const result1 = (
      await client.get<KrcResult>('http://krcs.kugou.com/search', {
        params: {
          hash: ref,
        },
      })
    ).data;
    const { id, accesskey } = result1.candidates[0];
    const result2 = (
      await client.get<LyricsResult>('http://lyrics.kugou.com/download', {
        params: {
          fmt: 'lrc',
          ver: 1,
          id,
          accesskey,
        },
      })
    ).data;
    return decode(result2.content);
  }
}
