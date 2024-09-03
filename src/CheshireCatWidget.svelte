<!--<svelte:options customElement="cheshire-cat-widget" />-->

<script>
	import { CatClient } from "ccat-api";
	import catLogo from "./assets/img/poweredby.png";
	import ConvoHistory from "./components/ConvoHistory.svelte";
	import Prompter from "./components/Prompter.svelte";
	import { store } from './store';
	import { catService } from "./cat"
    import { onMount } from "svelte";
	
	const parent = document.getElementById("cheshire-cat-widget");

	onMount(() => {
		catService.connect(
			parent.getAttribute("data-url"),
			parent.getAttribute("data-credential"),
		)
	})

</script>

<div id="ccat-chat-widget" class="ccat-chat-widget-{$store.isOpen? "open" : "closed"}">

	
	{#if $store.isOpen}
	
		<div id="ccat-close-open-button" on:click={() => store.toggle()}>▼</div>

		<ConvoHistory>
			<a id="ccat-credits" target="_blank" href="https://cheshirecat.ai">
				<img src={catLogo} alt="Powered by the Cheshire Cat AI" />
			</a>
		</ConvoHistory>
	{/if}
	
	
	<Prompter/>
</div>

<style>
	#ccat-chat-widget {

		background-color:white;
		z-index: 100;

		font-size: medium;

		position: fixed;
		bottom: 10px;
		right: 10px;
		width: 500px;
		

		display: flex;
		flex-direction: column;
		justify-content: space-between;

		border-radius: 3px;
		box-shadow: 0 0 5px rgba(105, 105, 105, 0.5);
	}

	.ccat-chat-widget-open {
		height: 600px;
	}

	#ccat-close-open-button {
		text-align: right;
		cursor: pointer;
		font-size: large;
		color: gray;
		padding: 7px;
		padding-bottom: 0px;
	}

	#ccat-credits {
		position: relative;
		display: flex;
		justify-content: center;
		width: 100%;
		
		padding-bottom: 30px;
	}

	#ccat-credits img {
		width: 50%;
	}
</style>
