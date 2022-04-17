<script lang="ts">
  import { goto } from '@roxi/routify';
  import {
    Listbox,
    ListboxButton,
    ListboxOption,
    ListboxOptions,
  } from '@rgossiaux/svelte-headlessui';
  import Icon from '@iconify/svelte';
  import check from '@iconify/icons-heroicons-outline/check';
  import search from '@iconify/icons-heroicons-outline/search';
  import selector from '@iconify/icons-heroicons-outline/selector';
  import clsx from 'clsx';
  import dayjs from 'dayjs';
  import providers from '../providers';
  import { entries } from '../stores/history';

  let keyword: string;
  let providerIdx = '0';
</script>

<div class="w-full md:w-3/5 max-w-4xl mt-5 px-3 pb-8">
  <form
    class="flex items-start w-full px-2 bg-white"
    on:submit|preventDefault={() => $goto('/search', { keyword, providerIdx })}
  >
    <Listbox value={providerIdx} on:change={(e) => (providerIdx = e.detail)}>
      <ListboxButton class="flex content-center py-2">
        <span class="flex-1">{providers[providerIdx].name}</span>
        <Icon width="24" icon={selector} class="text-gray-400" />
      </ListboxButton>
      <ListboxOptions
        class="absolute max-h-60 overflow-auto rounded-md shadow-lg z-10 ring-1 ring-black ring-opacity-5"
      >
        {#each providers as provider, i}
          <ListboxOption
            value={i.toString()}
            class={({ active }) =>
              clsx(
                'relative pl-10 py-2 pr-4',
                active ? 'text-amber-900 bg-amber-100' : 'text-black bg-white'
              )}
            let:selected
          >
            {provider.name}
            {#if selected}
              <span
                class="absolute inset-y-0 left-0 pl-3 text-amber-600 flex items-center"
              >
                <Icon width="20" icon={check} />
              </span>
            {/if}
          </ListboxOption>
        {/each}
      </ListboxOptions>
    </Listbox>
    <input
      type="text"
      bind:value={keyword}
      class="grow border-0 border-b-2 border-white focus:ring-0 focus:ring-black"
      placeholder="搜索歌词..."
    />
    <button type="submit" class="pt-2 rounded-full active:bg-gray-200">
      <Icon width="24" icon={search} />
    </button>
  </form>

  <div class="grid p-3 gap-6">
    {#each $entries.sort((a, b) => b.time - a.time) as e}
      <div
        class="relative p-2 cursor-pointer hover:bg-gray-100 active:bg-gray-200 border-b overflow-hidden"
        on:click={() =>
          $goto('/play', {
            providerIdx: e.provider.toString(),
            ref: e.ref,
          })}
      >
        <div class="space-y-2">
          <div class="text-lg truncate">
            {e.name}
            <span class="text-amber-700">({providers[e.provider].name})</span>
          </div>
          <div class="text-gray-400 truncate">{e.artist} - {e.album}</div>
        </div>
        <div class="absolute top-0 right-0 p-3">
          {dayjs.unix(e.time).locale('zh-cn').fromNow()}
        </div>
      </div>
    {/each}
  </div>
</div>
