<script>
    import { afterUpdate } from "svelte";
    import { Marked } from 'marked';
	import { markedHighlight } from "marked-highlight";
	import hljs from "highlight.js";
	import 'highlight.js/styles/stackoverflow-light.css';

	const marked = new Marked(
		markedHighlight({
			langPrefix: 'hljs language-',
			highlight(code, lang, info) {
				const language = hljs.getLanguage(lang) ? lang : 'plaintext';
				return hljs.highlight(code, { language }).value;
			}
		})
	);

    export let convo = [];

    let element;

    afterUpdate(() => {
        element.scroll({ top: element.scrollHeight, behavior: "smooth" });
    });
</script>

<div id="ccat-history" bind:this={element}>

	<slot></slot>

    {#each convo as msg}
        {#if msg.who == "cat"}
            <div class="ccat-message">{@html marked.parse(msg.content)}<pre></div>
        {:else}
            <div class="human-message">{@html marked.parse(msg.content)}</div>
        {/if}
    {/each}

</div>


<style>

    #ccat-history {
		overflow-y: scroll;
		scroll-behavior: smooth;
		padding: 5px;
	}

	#ccat-history::-webkit-scrollbar {
		width: 5px;
		background: transparent;
	}

	#ccat-history::-webkit-scrollbar-thumb {
		background: #bbb;
		border-radius: 3px;
		height: 10px;
	}
	
    .ccat-message {
		padding: 5px;
		margin: 10px;
		border-radius: 3px;
	}

	.human-message {
		padding: 3px 20px;
		margin: 20px;
		border-radius: 3px;
		color: white;
		background-color: rgb(135, 135, 135);
	}
</style>