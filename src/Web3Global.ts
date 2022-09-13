import { Filelike, Web3Storage } from 'web3.storage'

const WEB3_STORAGE_API_KEY = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiJkaWQ6ZXRocjoweDBmREFEQTRGNGRhNDM2NDYxNDZkQzZhNjBEZWFkOEVENTgwYzRFNmUiLCJpc3MiOiJ3ZWIzLXN0b3JhZ2UiLCJpYXQiOjE2NjI4NDkxNDgyMzMsIm5hbWUiOiJzdG9yeV9oYXQifQ.qJ7AlI3OeVjMQkSOymIQCuXO5vlsE_Baw0dHAZQTPgY";

class Web3Global {
    web3Storage: Web3Storage;

    constructor(){
        this.web3Storage = new Web3Storage({token:WEB3_STORAGE_API_KEY})
    }

    storeFiles = async(files: Iterable<Filelike>): Promise<string | void> => {
        console.log('making storage client...');
        if (this.web3Storage) {
          console.log('storing files...');
          const cid = await this.web3Storage.put(files)
          console.log('stored files with cid:', cid)
          return cid
        }
        else {
          throw new Error("storage client missing");
        }
      }    

    getCidFromContent = async(text: string, filename: string): Promise<string> => {
        var blob = new Blob([text], { type: 'text/plain' });
        var file = new File([blob], filename + ".txt", {type: "text/plain"});        
        let curCid = await this.storeFiles([file]);
        if (curCid) {
          return curCid;
        }
        else {
          throw new Error("Could not get cid from content:" + text);
        }
    }
}

export default new Web3Global();