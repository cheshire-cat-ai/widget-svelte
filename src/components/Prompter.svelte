
<script>
    
    export let submitCallback;
    
    const submitMessage = (event) => {
        if (event.key == "Enter") {
            submitCallback(event.target.value);
            event.target.value = "";
        }
    };
    
    let tokens = "";
    
    </script>
    
    <div id="ccat-toolbar">
        <textarea
            id="ccat-query"
            placeholder="send message to AI"
            autofocus
            on:keydown={submitMessage}
        />
        <button id="ccat-send-button">Send</button>
    </div>
    
<style>
    #ccat-toolbar {
		display: flex;
		justify-content: space-between;
		padding: 5px;
	}

	#ccat-query {
		width: 100%;
	}

    #ccat-send-button {
	}
</style>