import type { Entry, Provider } from './interface';
import client from './client';

interface SearchResult {
  data: {
    song: {
      list: Array<{
        albumname: string;
        singer: Array<{ name: string }>;
        songmid: string;
        songname: string;
      }>;
    };
  };
}

interface LyricResult {
  lyric: string;
}

export default class QQProvider implements Provider {
  name = 'QQ音乐';

  async *search(keyword: string): AsyncGenerator<Entry> {
    let page = 1;
    let finished = false;
    while (!finished) {
      const result = (
        await client.get<SearchResult>(
          'http://c.y.qq.com/soso/fcgi-bin/client_search_cp',
          {
            params: {
              g_tk: 213260424,
              uin: 0,
              format: 'json',
              inCharset: 'utf-8',
              outCharset: 'utf-8',
              notice: 0,
              platform: 'h5',
              needNewCode: 1,
              w: keyword,
              zhidaqu: 1,
              catZhida: 1,
              t: 0,
              flag: 1,
              ie: 'utf-8',
              sem: 1,
              aggr: 0,
              perpage: 20,
              n: 20,
              p: page,
              remoteplace: 'txt.mqq.all',
              _: 1459991037831,
            },
          }
        )
      ).data;
      if (result.data.song.list.length === 0) {
        finished = true;
      } else {
        for (const e of result.data.song.list) {
          yield {
            name: e.songname,
            artist: e.singer.map((s) => s.name).join('/'),
            album: e.albumname,
            ref: e.songmid,
          };
        }
        ++page;
      }
    }
  }

  async getLrc(ref: string): Promise<string> {
    const result = await client.get<LyricResult>(
      'http://c.y.qq.com/lyric/fcgi-bin/fcg_query_lyric_new.fcg',
      {
        params: {
          songmid: ref,
          g_tk: 5381,
          format: 'json',
          inCharset: 'utf8',
          outCharset: 'utf-8',
          nobase64: 1,
        },
        headers: { Referer: 'https://y.qq.com' },
      }
    );
    return result.data.lyric;
  }
}
