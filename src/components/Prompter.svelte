
<script>
    import catIcon from "./../assets/img/ccat_icon.png"
    
    export let submitCallback;
    export let active;

    let textareaElement;
    let firstInteraction = true;
    let query = ""

    const submit = () => {
        submitCallback(query.trim());
        query= "";
    };
    
    const keyboardSubmit = (event) => {
        if (event.key == "Enter" &&
                !event.shiftKey &&
                query.trim() !== "") {

            submit()
        }
    };

    const buttonSubmit = () => {
        if (query.trim() !== "") {
            submit()
        }
    };

    // Reactive statement to focus the textarea when active is true
    $: if(active && textareaElement){
        if(firstInteraction){
            // do not focus at first activation
            firstInteraction = false;
        } else {
            // focus on every other activation
            setTimeout(()=> {
                textareaElement.focus();
            }, 10);
        }
    }
    
</script>
    
<div id="ccat-toolbar">
    <textarea
        id="ccat-query"
        placeholder="Ask the Cat"
        on:keydown={keyboardSubmit}
        bind:value={query}
        bind:this={textareaElement}
        disabled={!active}
    />
    <button
        id="ccat-send-button"
        disabled={!active}
        on:click={buttonSubmit}
    >
        <img width="30px" src={catIcon} alt="send">
    </button>
</div>
    
<style>
    #ccat-toolbar {
		display: flex;
		justify-content: space-between;

        height:50px;
		padding: 15px;
	}

	#ccat-query {
		width: 100%;
        resize: none;

        background-color: #eee;
        
        padding-top: 10px;
        padding-left: 10px;
        
        border: none;
        border-radius: 3px;

        font-family: inherit;
        font-size: inherit;
    }

    #ccat-send-button {

        background-color: inherit;
        cursor: pointer;

        margin-left: 5px;

        border: none;
        border-radius: 3px;
	}

    #ccat-send-button:disabled, #ccat-query:disabled {
        opacity: 0.5;
    }

    #ccat-send-button:hover {
        opacity: 0.5;
    }

    #ccat-query:focus-visible, #ccat-query:active {
        border: none;
        outline: none;
        color: white;
		background-color: #444;
    }
</style>