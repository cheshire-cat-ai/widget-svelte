<!--<svelte:options customElement="cheshire-cat-widget" />-->

<script>
	import { CatClient } from "ccat-api";
	import catLogo from "./assets/img/poweredby.png";
	import ConvoHistory from "./components/ConvoHistory.svelte";
	import Prompter from "./components/Prompter.svelte";
    import { onMount } from "svelte";

	let messages = []
	let isOpen = false
	let promptEnabled = true
	let catApi
	
	const thinkingMessage = "...thinking"

	const dissectURL = (url) => {
		url = new URL(url)
		return {
			baseUrl: url.hostname,
			port: url.port,
			secure: url.protocol == "https:",
			pathname: url.pathname
		}
	};
	
	const sendMessage = (message) => {

		isOpen = true

		messages = [
			...messages,
			{
				who: "human",
				content: message,
			},
			{
				who: "cat",
				content: thinkingMessage
			}
		]
		
		promptEnabled = false;
		catApi.send(message, {});	// TODO: additional security layer
	};
	
	const parent = document.getElementById("cheshire-cat-widget");
	
	const networkConfig = dissectURL(
		parent.getAttribute("data-url")
	);
	
	if(networkConfig.pathname != "/") {
		networkConfig.port = "" + networkConfig.port + networkConfig.pathname;
	}

	const toggle = () => {
		isOpen = !isOpen
	}

	onMount(() => {

		catApi = new CatClient({
			...networkConfig,
			credential: parent.getAttribute("data-credential"),
			timeout: 15000,
			instant: true,
			ws: {
				retries: 5,
				delay: 2000,
				onFailed: () => {
					console.error(
						"Failed to connect WebSocket after several retries.",
					);
				},
			},
		});

		catApi.onMessage((msg)=> {
			if(msg.type == "chat_token"){
				if(messages[messages.length-1].content == thinkingMessage){
					messages[messages.length-1].content = ""
				}
				messages[messages.length-1].content += msg.content
			}
			if(msg.type == "chat"){
				messages[messages.length-1].content = msg.content
				promptEnabled = true
			}
		})
		
		messages = [
			{
				who: "cat",
				content: "Hello dear,\n\nI'm the Cheshire Cat AI community assistant.  \nHow can I help you? Please remember:\n\n- I'm just an AI, so double check my responses.\n\n- By chatting with me, you agree to use your anonymous messages to improve my memory.",
			}
		];

		// destroy callback
		return () => {
			catApi.close();
		}
	})

</script>

<div id="ccat-chat-widget" class="ccat-chat-widget-{isOpen? "open" : "closed"}">

	
	{#if isOpen}
	
		<div id="ccat-close-open-button" on:click={toggle}>▼</div>

		<ConvoHistory convo={messages}>
			<a id="ccat-credits" target="_blank" href="https://cheshirecat.ai">
				<img src={catLogo} alt="Powered by the Cheshire Cat AI" />
			</a>
		</ConvoHistory>
	{:else}
		<div id="ccat-close-open-button" on:click={toggle}>▲</div>
	{/if}
		
	<Prompter
		submitCallback={sendMessage}
		active={promptEnabled}
	/>
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
