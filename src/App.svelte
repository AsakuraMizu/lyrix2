<script lang="ts">
  import { onMount } from 'svelte';
  import { Router } from '@roxi/routify';
  import routes from '../.routify/routes.default.js';
  import { ops as hops } from './stores/history';
  import { ops as sops } from './stores/settings';

  onMount(() => {
    hops.load();
    sops.load();
  });
</script>

<!-- Remove the rest of this file's contents after the router: -->
<Router {routes} />
