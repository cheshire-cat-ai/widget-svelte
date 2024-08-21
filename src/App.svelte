<!--<svelte:options customElement="cheshire-cat-widget" />-->

<script>
	import { CatClient } from "ccat-api";
	import catLogo from "./assets/img/poweredby.png";
	import ConvoHistory from "./components/ConvoHistory.svelte";
	import Prompter from "./components/Prompter.svelte";

	let catApi = new CatClient({
		baseUrl: window.location.hostname,
		port: 1865,
		secure: window.location.protocol === "https:",
		//credential: credential,
		timeout: 15000,
		instant: true,
		ws: {
			retries: 50,
			delay: 2000,
			onFailed: () => {
				console.error(
					"Failed to connect WebSocket after several retries.",
				);
			},
		},
	});

	let messages = [
		{
			who: "cat",
			content: "Hello! I'm the Cheshire Cat AI. How can I help you?",
		},
		{
			who: "human",
			content: "dunno `moron`",
		},
		{
			who: "cat",
			content: "so what?",
		},
		{
			who: "human",
			content: "fuck y o u",
		},
		{
			who: "cat",
			content: "Hello! I'm the Cheshire Cat AI. How can I help you?",
		},
		{
			who: "human",
			content: "dunno `moron`",
		},
		{
			who: "cat",
			content: "so what?",
		},
		{
			who: "human",
			content: "fuck y o u",
		},
		{
			who: "cat",
			content: "Hello! I'm the Cheshire Cat AI. How can I help you?",
		},
		{
			who: "human",
			content: "dunno `moron`",
		},
		{
			who: "cat",
			content: "so what?",
		},
		{
			who: "human",
			content: "fuck y o u",
		},
	];
</script>

<div id="ccat-chat-widget">
	
	<a id="ccat-credits" target="_blank" href="https://cheshirecat.ai">
		<img src={catLogo} alt="Powered by the Cheshire Cat AI" />
	</a>

	<ConvoHistory convo={messages} />

	<Prompter submitCallback={(e) => console.log(e)} />
</div>

<style>
	#ccat-chat-widget {
		position: fixed;
		bottom: 10px;
		right: 10px;
		width: 400px;
		height: 600px;

		display: flex;
		flex-direction: column;
		justify-content: space-between;

		border-radius: 2px;
		box-shadow: 0 0 5px rgba(105, 105, 105, 0.5);
	}

	#ccat-credits {
		position: relative;
		display: flex;
		justify-content: center;
		width: 100%;
	}

	#ccat-credits img {
		width: 50%;
	}
</style>
