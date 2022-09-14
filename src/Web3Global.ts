import { Filelike, Web3Storage } from 'web3.storage'
import { CID } from 'multiformats/cid'
import { ethers } from 'ethers';
import { KeyboardReturn } from '@mui/icons-material';

const WEB3_STORAGE_API_KEY = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiJkaWQ6ZXRocjoweDBmREFEQTRGNGRhNDM2NDYxNDZkQzZhNjBEZWFkOEVENTgwYzRFNmUiLCJpc3MiOiJ3ZWIzLXN0b3JhZ2UiLCJpYXQiOjE2NjI4NDkxNDgyMzMsIm5hbWUiOiJzdG9yeV9oYXQifQ.qJ7AlI3OeVjMQkSOymIQCuXO5vlsE_Baw0dHAZQTPgY";

class Web3Global {
    web3Storage: Web3Storage;

    constructor(){
        this.web3Storage = new Web3Storage({token:WEB3_STORAGE_API_KEY})
    }

  convertCidToBytes = (cid: string): Uint8Array => {
      // console.log('original CID is ' + cid);
      const v0 = CID.parse(cid);
      const v1 = v0.toV1();
      const isCID = CID.asCID(v1);
      if (!isCID){
          throw new Error(`${cid} Not CID, cant create a story`);
      }
      else {
          return v1.bytes;
      }
  }

  // converts a cid represented in bytes as hex string to the decoded string
  convertBytesToCid = (cidHexStr: string): string => {
    const cidByteArr = ethers.utils.arrayify(cidHexStr);
    const decodedCID = CID.decode(cidByteArr);
    return decodedCID.toString();
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

  // retrieve the contents of a contribution using its CID 
  getStoryContent  = async (cid: string): Promise<string> => {
    if (this.web3Storage) {
      const res = await this.web3Storage.get(cid)
      if (res) {
        console.log(`Got a response! [${res.status}] ${res.statusText}`);
        let files = await res.files();
        if (!res.ok) {
          throw new Error(`failed to get ${cid}`);
        }
        else if (files.length > 0) {
          let file = files[0];
          // request succeeded! do something with the response object here...
          let storyText = await file.text();
          return storyText;
        }
        else {
          throw new Error("no files found with cid" + cid);
        }
      }
      else {
        throw new Error("Api GET call failed to retrieve cid");
      }
    }
    else {
      throw new Error("web3storage not set");
    }
  }
}

export default new Web3Global();