<script lang="ts">
  import dayjs from 'dayjs';
  import Icon from '@iconify/svelte';
  import play from '@iconify/icons-heroicons-outline/play';
  import pause from '@iconify/icons-heroicons-outline/pause';
  import { duration, ms, ops, playing, progress } from '../../stores/music';
  import { onMount } from 'svelte';

  const onWheel = (e: WheelEvent) => {
    e.stopPropagation();
    const dt = e.deltaY * 10;
    const target = $ms - dt;
    ops.seek(target);
  };
  const onMouse = (e: MouseEvent) => {
    if (!(e.buttons & 3)) return;
    const bar = e.currentTarget as HTMLDivElement;
    const x = e.pageX - bar.getBoundingClientRect().left;
    ops.seek((x / bar.clientWidth) * $duration);
  };
  const onTouch = (e: TouchEvent) => {
    const bar = e.currentTarget as HTMLDivElement;
    const x = e.changedTouches[0].pageX - bar.getBoundingClientRect().left;
    ops.seek((x / bar.clientWidth) * $duration);
  };
  function formatTime(ms: number): string {
    return dayjs.duration(Math.round(ms), 'ms').format('mm:ss');
  }

  onMount(() => () => {
    ops.pause();
    ops.seek(0);
  });
</script>

<div class="w-full md:w-[768px] flex items-center gap-3">
  <div on:click={() => ($playing ? ops.pause() : ops.play())}>
    <Icon icon={$playing ? pause : play} class="w-8 h-8 cursor-pointer" />
  </div>
  <div class="select-none w-20 text-center">{formatTime($ms)}</div>
  <div
    class="flex-grow flex items-center h-full relative"
    on:mousedown={onMouse}
    on:mousemove={onMouse}
    on:touchstart={onTouch}
    on:touchmove={onTouch}
    on:wheel={onWheel}
  >
    <div class="h-2 w-full rounded bg-gray-300 absolute" />
    <div
      class="h-3 w-3 rounded-full bg-amber-500 absolute"
      style={`left: ${$progress * 100}%`}
    />
  </div>
  <div class="select-none w-20 text-center">{formatTime($duration)}</div>
</div>
