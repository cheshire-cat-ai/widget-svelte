import { CatClient } from "ccat-api"

class CatService {

    constructor() {

        // this attribute will be populated in this.connect()
        this.cat = undefined
        
        // message callbacks
        this.messageCallbacks = []
    }
    
    registerMessageCallback(callback) {
        this.messageCallbacks.push(callback)
    }
    
    async connect(url, credential=undefined) {
        
        // close hanged connection (happens with dev live reload)
        if(this.cat) {
            this.cat.close()
        }
        
        this.URL = new URL(url) // TODO: should be taken from a config
        this.cat = new CatClient({
            userId: "widget_user_" + Date.now(),
            baseUrl: this.URL.hostname,
            port: this.URL.port,
            secure: this.URL.protocol === "https:",
            credential: credential,
            timeout: 10000,
            instant: true,
            ws: {
                retries: 5,
                delay: 2000,
                onFailed: () => {
                    console.error('Failed to connect WebSocket after several retries.')
                },
            },
        })

        this.cat.onConnected(() => {
            console.log('WS connected')
        }).onMessage(msg => {
            for(let callback of this.messageCallbacks) {
                callback(msg)
            }
        }).onError((err, e) => {
            console.error(err, e)
        }).onDisconnected(() => {
            console.log('WS disconnected')
        })
        this.cat.init()
    }
}

// Export a single instance of the CatService
export const catService = new CatService();