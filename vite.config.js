import { defineConfig } from 'vite'
import { svelte } from '@sveltejs/vite-plugin-svelte'
import { visualizer } from 'rollup-plugin-visualizer';

// https://vitejs.dev/config/
export default defineConfig({
	plugins: [
		svelte(),
		visualizer({
			filename: 'bundle-stats.html',
			open: false, // Automatically open the report in the default browser
		})
	],
	build: {
		assetsInlineLimit: 100 * 1024, // Increase limit to 100 KB
		rollupOptions: {
			output: {
				entryFileNames: 'cheshire-cat-widget.js',
				format: 'iife', // Immediately Invoked Function Expression
				name: 'CheshireCatWidgetSvelte',
			}
		},
		minify: 'terser',
	}
})
