<script>
    import { afterUpdate } from "svelte";
	import { store } from '../store';
	import { catService } from "../cat"
    import { Marked } from 'marked';
	import { markedHighlight } from "marked-highlight";

	// importing highlightjslanguages manually otherwise bundle size blows up
	import hljs from 'highlight.js/lib/core';
	import javascript from 'highlight.js/lib/languages/javascript';
	import plaintext from 'highlight.js/lib/languages/plaintext';
	import python from 'highlight.js/lib/languages/python';
	import xml from 'highlight.js/lib/languages/xml';
	import yaml from 'highlight.js/lib/languages/yaml';

	hljs.registerLanguage('plaintext', plaintext);
	hljs.registerLanguage('javascript', javascript);
	hljs.registerLanguage('python', python);
	hljs.registerLanguage('xml', xml);
	hljs.registerLanguage('yaml', yaml);
	
	// color theme
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
	
	let element;
	
	catService.registerMessageCallback((msg)=> {
		store.update(state => {
			const lastMessageIndex = state.messages.length - 1
			let lastMessage = {...state.messages[lastMessageIndex]}
			if(msg.type == "chat_token"){
				if(lastMessage.content == "...thinking"){
					lastMessage.content = ""
				}
				lastMessage.content += msg.content
			}
			if(msg.type == "chat"){
				lastMessage.content = msg.content
				state.promptEnabled = true
			}
			state.messages[lastMessageIndex] = lastMessage
			return state
		})
	})

    afterUpdate(() => {
		setTimeout(() => {
			element.scroll({ top: element.scrollHeight, behavior: "smooth" });
		}, 50);
    });
</script>

<div id="ccat-history" bind:this={element}>

	<slot></slot>

    {#each $store.messages as msg}
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
		background-color: #ddd;
	}
</style>