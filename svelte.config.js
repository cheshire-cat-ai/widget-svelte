/*
import { vitePreprocess } from '@sveltejs/vite-plugin-svelte'

export default {
  // Consult https://svelte.dev/docs#compile-time-svelte-preprocess
  // for more information about preprocessors
  preprocess: vitePreprocess(),
}
*/

// installing this to disable CSS scoping
import { sveltePreprocess } from 'svelte-preprocess';

const config = {
  preprocess: sveltePreprocess()
}

export default config;
