
import { writable } from "svelte/store";

class Store {

    constructor() {
        this.store = writable(this.initialStoreValue());
        /*this.store.subscribe((s) => {
            //console.warn(`== ${this.constructor.name} Store ==`)
            console.warn(Object.freeze(s))
            return s
        })*/
    }

    initialStoreValue() {
        return {
            messages: [
                {
                    who: "cat",
                    content: "Hello dear,\n\nI'm the Cheshire Cat AI community assistant.  \nHow can I help you? Please remember:\n\n- I'm just an AI, so double check my responses.\n\n- By chatting with me, you agree to use your anonymous messages to improve my memory.",
                }
            ],
            isOpen: false,
            promptEnabled: true
        }
    }

    subscribe(callback) {
        return this.store.subscribe(callback)
    }

    set(value) {
        this.store.set(value)
    }

    update(callback) {
        this.store.update(callback)
    }

    reset() {
        this.store.set(this.initialStoreValue())
    }

    toggle(){
		this.update(state => {
			state.isOpen = !state.isOpen;
			return state;
		})
	}
}

export const store = new Store();