<script>
    import { afterUpdate } from "svelte";
    import { marked } from 'marked';
    //import { Remarkable } from "remarkable";

    export let convo = [];

    let element;

    afterUpdate(() => {
        element.scroll({ top: element.scrollHeight, behavior: "smooth" });
    });
</script>

<div id="ccat-history" bind:this={element}>

    {#each convo as msg}
        {#if msg.who == "cat"}			
            <div class="ccat-message">{@html marked.parse(msg.content)}</div>
        {:else}
            <div class="human-message">{@html marked.parse(msg.content)}</div>
        {/if}
    {/each}

</div>


<style>

    #ccat-history {
		overflow-y: scroll;
		scroll-behavior: smooth;
        padding-bottom: 50px;
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
	}

	.human-message {
		padding: 3px 20px;
		margin: 20px;
		background-color: rgb(231, 230, 230);
	}   
</style>