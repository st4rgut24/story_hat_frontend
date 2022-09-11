import { Web3Storage } from 'web3.storage'

const WEB3_STORAGE_API_KEY = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiJkaWQ6ZXRocjoweDBmREFEQTRGNGRhNDM2NDYxNDZkQzZhNjBEZWFkOEVENTgwYzRFNmUiLCJpc3MiOiJ3ZWIzLXN0b3JhZ2UiLCJpYXQiOjE2NjI4NDkxNDgyMzMsIm5hbWUiOiJzdG9yeV9oYXQifQ.qJ7AlI3OeVjMQkSOymIQCuXO5vlsE_Baw0dHAZQTPgY";

class Web3Global {
    web3Storage: Web3Storage;

    constructor(){
        this.web3Storage = new Web3Storage({token:WEB3_STORAGE_API_KEY})
    }
}

export default new Web3Global();