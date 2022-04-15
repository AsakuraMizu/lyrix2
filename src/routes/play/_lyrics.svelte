<script lang="ts">
  import { afterUpdate, onMount } from 'svelte';
  import { Lrc, Runner } from 'lrc-kit';
  import clsx from 'clsx';
  import { duration, ms, ops } from '../../stores/music';
  import { fontSize, padding } from '../../stores/settings';

  export let lrc: string;

  const runner = new Runner(Lrc.parse(lrc));
  const lyrics = runner.getLyrics();

  let preIndex = -1;

  let placeholder: HTMLDivElement;
  let el: HTMLDivElement[] = [];

  $: {
    runner.timeUpdate($ms / 1000);
    let curIndex = runner.curIndex();
    if (curIndex !== preIndex) {
      preIndex = curIndex;
    }
  }

  afterUpdate(() => {
    if (preIndex !== -1)
      el[preIndex]?.scrollIntoView({ behavior: 'smooth', block: 'center' });
    else placeholder?.scrollIntoView({ behavior: 'smooth', block: 'center' });
  });

  onMount(() => {
    placeholder.scrollIntoView({ behavior: 'smooth', block: 'center' });
    let maxts = 0;
    lyrics.forEach((l) => (maxts = Math.max(maxts, l.timestamp)));
    duration.set(maxts * 1000);
  });
</script>

<div
  class="h-[calc(100vh-100px)] overflow-y-auto scroll-smooth scrollbar-thin scrollbar-thumb-amber-500 scrollbar-track-gray-200 snap-y text-center select-none"
>
  <div bind:this={placeholder} class="snap-center mt-[50%]" />
  {#each lyrics as l, i}
    <div
      bind:this={el[i]}
      on:click={() => ops.seek(l.timestamp * 1000)}
      class={clsx(
        'snap-center transition-colors duration-1000 cursor-pointer',
        preIndex === i ? 'text-amber-600 underline' : 'text-stone-400'
      )}
      style={`
        line-height: 1;
        font-size: ${$fontSize}px;
        padding-top: ${$padding}px;
        padding-bottom: ${$padding}px;
      `}
    >
      {l.content}
    </div>
  {/each}
  <div class="snap-center mb-[50%]" />
</div>
