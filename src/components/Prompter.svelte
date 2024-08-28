
<script>
    import catIcon from "./../assets/img/ccat_icon.png"
    
    export let submitCallback;
    export let active

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
    
    </script>
    
    <div id="ccat-toolbar">
        <textarea
            id="ccat-query"
            placeholder="send message to AI"
            on:keydown={keyboardSubmit}
            bind:value={query}
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
        
        padding-top: 10px;
        padding-left: 10px;
        
        border: 2px gray solid;
        border-radius: 3px;
        
        box-shadow: inset 0 2px 4px rgba(0, 0, 0, 0.1);

        font-family: inherit;
        font-size: inherit;
    }

    #ccat-send-button {
        cursor: pointer;

        margin-left: 5px;

        border: 2px gray solid;
        border-radius: 3px;
	}

    #ccat-send-button:disabled, #ccat-query:disabled {
        opacity: 0.5;
    }
</style>