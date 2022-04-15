<script lang="ts" context="module">
  /* global RoutifyLoad */
  import dayjs from 'dayjs';
  import providers from '../../providers';
  import { ops } from '../../stores/history';

  export const load: RoutifyLoad = async ({ route }) => {
    const providerIdx = parseInt(route.params.providerIdx ?? 0);
    const ref = route.params.ref;
    const entry = ops.get({ provider: providerIdx, ref });
    const lrc = entry?.lrc || (await providers[providerIdx].getLrc(ref));
    ops.update({ provider: providerIdx, ref }, { lrc, time: dayjs().unix() });
    return {
      props: { lrc },
    };
  };
</script>

<script lang="ts">
  import Control from './_control.svelte';
  import Lyrics from './_lyrics.svelte';

  export let lrc: string;
</script>

<div class="flex flex-col items-center">
  <Lyrics {lrc} />
  <Control />
</div>
