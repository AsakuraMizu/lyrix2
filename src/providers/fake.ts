import type { Entry, Provider } from './interface';

export default class FakeProvider implements Provider {
  name = 'FAKE';

  async *search(keyword: string): AsyncGenerator<Entry> {
    while (true) {
      await new Promise((res) => setTimeout(res, 200));
      yield {
        name: keyword,
        artist: 'Artist',
        album: 'Album',
        ref: keyword,
      };
    }
  }

  async getLrc(): Promise<string> {
    return `.[id:$00000000]
[ar:KIVΛ]
[ti:Used to be]
[by:弈恪]
[hash:c319132ff94f7f94a72f3e2a6872ef24]
[al:Used to be]
[sign:]
[qq:]
[total:192080]
[offset:0]
[00:00.26]KIVΛ - Used to be
[00:02.64]作词：A-Tse & KIVΛ
[00:05.11]作曲：KIVΛ
[00:06.77]原唱：K
[00:36.61]Nobody can hear
[00:40.19]I'm barely breathing
[00:42.51]All of my dreams
[00:45.88]No longer being in my story
[00:52.25]No body can see
[00:55.65]Now I'm standing
[00:57.62]On the way you lead
[01:01.21]Trying everything but fading
[01:04.85]between me and me
[01:11.06]Even if it's reality
[01:14.53]It won't become new memories
[01:16.81]You used to be
[01:23.62]You used to be
[01:30.55]How could you leave
[01:37.47]How could you leave
[02:01.38]You used to be
[02:08.27]You used to be
[02:14.91]How could you leave
[02:21.87]How could you leave
[02:25.34]Now I can see
[02:28.66]You used to be me
[02:42.41]You used to be me`;
  }
}
