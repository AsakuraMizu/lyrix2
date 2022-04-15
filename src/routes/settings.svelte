<script lang="ts">
  import { onMount } from 'svelte';
  import { fontSize, ops, padding } from '../stores/settings';

  onMount(() => () => ops.save());
</script>

<div class="flex flex-col text-center select-none">
  <div class=" self-center flex flex-col content-start gap-2 pt-4 pb-2">
    <label class="flex content-center gap-2">
      <span class="text-lg">字体大小:</span>
      <input
        type="range"
        bind:value={$fontSize}
        min="10"
        max="128"
        step="1"
        class="range"
      />
      <span>{$fontSize}</span>
    </label>
    <label class="flex content-center gap-2">
      <span class="text-lg">行间距:</span>
      <input
        type="range"
        bind:value={$padding}
        min="0"
        max="50"
        step="1"
        class="range"
      />
      <span>{$padding}</span>
    </label>
  </div>
  <div
    class="cursor-pointer text-stone-400"
    style={`
    line-height: 1;
    font-size: ${$fontSize}px;
    padding-top: ${$padding}px;
    padding-bottom: ${$padding}px;
  `}
  >
    私はきっと　キミが好き
  </div>
  <div
    class="cursor-pointer text-amber-600 underline"
    style={`
    line-height: 1;
    font-size: ${$fontSize}px;
    padding-top: ${$padding}px;
    padding-bottom: ${$padding}px;
  `}
  >
    There's no reason to be shy, just spread the wings of possibilities on your
    back and fly
  </div>
  <div
    class="cursor-pointer text-stone-400"
    style={`
    line-height: 1;
    font-size: ${$fontSize}px;
    padding-top: ${$padding}px;
    padding-bottom: ${$padding}px;
  `}
  >
    大风翕张浪形骸 疏狂放歌死便埋
  </div>
</div>
