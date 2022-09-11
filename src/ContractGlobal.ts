import Story from "./artifacts/contracts/StoryShare.sol/Story.json";
import StoryShare from "./artifacts/contracts/StoryShare.sol/StoryShare.json";
import { ethers } from "ethers";
import { CID } from 'multiformats/cid'

declare var window: any

const SharedStoryContractAddr = "0xCf7Ed3AccA5a467e9e704C703E8D87F634fB0Fc9";

let storyShareContract: ethers.Contract;
let signer: ethers.providers.JsonRpcSigner;

let StoryContractAddr: string; // address of the story contract
let storyContract: ethers.Contract;

class ContractGlobal {
    constructor(){
        const { ethereum } = window;
    
        if (!ethereum) {
          alert("Please install MetaMask!");
          return;
        }
    
        const provider = new ethers.providers.Web3Provider(ethereum);

        signer = provider.getSigner();
        storyShareContract = new ethers.Contract(
          SharedStoryContractAddr,
          StoryShare.abi,
          signer
        );

        // TODO: for testing. comment out later.
        // this.setStory("bafybeihtklzuu4smhzvxzadydyc5wa5trv6kgwd5ixko2u6sd6sxmdftpy");
    }
    
    // use for retrieval of the CID string when getting from contract
    // const decodedV1 = CID.decode(v1.bytes);    
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

    contribute = async (prevCid: string, cid: string) => {
        console.log(`contributing cid ${cid} to prev cid ${prevCid}`);
        let prevCidBytes = this.convertCidToBytes(prevCid);
        let cidBytes = this.convertCidToBytes(cid);
        console.log("contributing story ...");
        let tx = await storyContract.connect(signer).contribute(cidBytes, prevCidBytes);
        await tx.wait();
        console.log("tx included");
    }

    setStory = async (cid: string): Promise<string> => {
        console.log('getting story with CID ' + cid);
        let cidBytes = this.convertCidToBytes(cid);
        StoryContractAddr = await storyShareContract.connect(signer).getStoryByCID(cidBytes);
        console.log("set the story contract:", StoryContractAddr);

        storyContract = new ethers.Contract(
            StoryContractAddr,
            Story.abi,
            signer
          );
        if (!storyContract){
            throw new Error("story contract could not be set from address" + StoryContractAddr);
        }
        return StoryContractAddr;
    };

    createStory = async (cid: string): Promise<void> => {          
        console.log('original CID is ' + cid);
        let cidBytes = this.convertCidToBytes(cid);
    
        console.log("creating story ...");
        let tx = await storyShareContract.connect(signer).createStory(cidBytes);
        await tx.wait();
    
        console.log("tx included");
      };
}

export default new ContractGlobal();