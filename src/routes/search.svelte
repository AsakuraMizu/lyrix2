<script lang="ts">
  import { onMount } from 'svelte';
  import { goto, params } from '@roxi/routify';
  import Icon from '@iconify/svelte';
  import arrowRight from '@iconify/icons-heroicons-outline/arrow-right';
  import providers, { type Entry, type Provider } from '../providers';
  import { ops } from '../stores/history';

  $: keyword = $params.keyword ?? 'KIVΛ - Used to be';
  $: providerIdx = parseInt($params.providerIdx ?? 0);
  $: provider = providers[providerIdx];

  let g: ReturnType<Provider['search']>;
  let results: Entry[] = [];
  let pending = false;
  const getNext = async () => {
    pending = true;
    for (let i = 1; i <= 10; ++i) {
      const t = await g.next();
      if (t.done) break;
      results = [...results, t.value];
    }
    pending = false;
  };

  onMount(() => {
    g = provider.search(keyword);
    getNext();
  });

  const play = (r: Entry) => {
    ops.add(
      { provider: providerIdx, ref: r.ref },
      {
        name: r.name,
        artist: r.name,
        album: r.album,
      }
    );
    $goto('/play', {
      providerIdx: providerIdx.toString(),
      ref: r.ref,
    });
  };
</script>

<div class="w-full md:w-3/5 max-w-4xl mt-5 px-3 pb-8">
  <div class="rounded-lg bg-white ring-1 ring-black ring-opacity-5">
    <div class="p-4 bg-amber-50">搜索结果：{keyword}（{provider.name}）</div>
    <div class="grid p-3 gap-6">
      {#each results as r}
        <div
          class="relative p-2 cursor-pointer hover:bg-gray-100 active:bg-gray-200 border-b overflow-hidden"
          on:click={() => play(r)}
        >
          <div class="space-y-2">
            <div class="text-lg truncate">{r.name}</div>
            <div class="text-gray-400 truncate">{r.artist} - {r.album}</div>
          </div>
          <div class="absolute top-0 right-0 p-3">
            <Icon width="24" icon={arrowRight} />
          </div>
        </div>
      {/each}
      {#if pending}
        <div class="animate-pulse border-b space-y-2">
          <div class="rounded-xl bg-slate-200 h-7 w-20" />
          <div class="rounded-xl bg-slate-200 h-6 w-60" />
        </div>
      {:else}
        <div
          class="cursor-pointer hover:bg-gray-100 active:bg-gray-200"
          on:click={getNext}
        >
          <div class="text-lg p-4">加载更多</div>
        </div>
      {/if}
    </div>
  </div>
</div>
