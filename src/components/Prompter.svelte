
<script>
    import { store } from './../store';
    import { catService } from './../cat';
    import catIcon from "./../assets/img/ccat_icon.png"

    let textareaElement;
    let query = ""

    const sendMessage = (message) => {
        store.update(state => {
            state.isOpen = true;
            state.messages = [
                ...state.messages,
                {
                    who: "human",
                    content: message,
                },
                {
                    who: "cat",
                    content: "...thinking"
                }
            ];
            state.promptEnabled = false;
            return state;
        });
        catService.cat.send(message, {});
    };
    
    const keyboardSubmit = (event) => {
        if (event.key == "Enter" &&
                !event.shiftKey &&
                query.trim() !== "") {

            sendMessage(query.trim());
            query = "";
            store.update(s => {
                s.promptEnabled = false;
                return s;
            });
        }
    };

    // Reactive statement to focus the textarea when active is true
    $: if($store.promptEnabled && textareaElement){
        // focus on every other activation
        setTimeout(()=> {
            textareaElement.focus();
        }, 50);
    }
    
</script>
    
<div id="ccat-toolbar">
    <textarea
        id="ccat-query"
        placeholder="Ask the Cat"
        on:keydown={keyboardSubmit}
        on:click={() => store.update(s => {s.isOpen = true; return s;})}
        bind:value={query}
        bind:this={textareaElement}
        disabled={!$store.promptEnabled}
    />
    <button
        id="ccat-send-button"
        on:click={ () => store.toggle() } 
    >
        <img width="30px" src={catIcon} alt="send">
    </button>
</div>
    
<style>
    #ccat-toolbar {
		display: flex;
		justify-content: space-between;

		padding: 15px;
	}

	#ccat-query {

		width: 100%;
        height: 30px;
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

        margin-left: 10px;

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
		background-color: #ddd;
    }
</style>