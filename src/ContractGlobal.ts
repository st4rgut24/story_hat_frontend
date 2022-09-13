import { Contract, ethers } from "ethers";

import StoryDeployed from "./artifacts/contracts/StoryShare.sol/Story.json";
import GreetDeployed from "./artifacts/contracts/StoryShare.sol/Greeter.json";
import StoryShareDeployed from "./artifacts/contracts/StoryShare.sol/StoryShare.json";
import { CID } from 'multiformats/cid'

import { StoryShare } from './typechain-types/StoryShare.sol/StoryShare';
import { Story } from './typechain-types/StoryShare.sol/Story';

declare var window: any

const SharedStoryContractAddr = "0x610178dA211FEF7D417bC0e6FeD39F05609AD788";

let signer: ethers.providers.JsonRpcSigner;

class ContractGlobal {
    storyShareContract: StoryShare | undefined;
    StoryContractAddr: string | undefined; // address of the story contract
    storyContract: Story | undefined;

    constructor(){
        const { ethereum } = window;
    
        if (!ethereum) {
          alert("Please install MetaMask!");
          return;
        }
    
        const provider = new ethers.providers.Web3Provider(ethereum);
        const signer = provider.getSigner();

        this.storyShareContract = new Contract(
            SharedStoryContractAddr,
            StoryShareDeployed.abi,
            signer
          ) as unknown as StoryShare;

          // TEST CALLS HERE
          //   this.storyShareContract.getAuthor('0xdD2FD4581271e230360230F9337D5c0430Bf44C0').then(() => console.log('great success'));
    }
    
    // fetchGreetings = async () => {
    //     let contractAddress = "0x610178dA211FEF7D417bC0e6FeD39F05609AD788";
    //     const { ethereum } = window;
    
    //     if (!ethereum) {
    //       alert("Please install MetaMask!");
    //       return;
    //     }
    
    //     const provider = new ethers.providers.Web3Provider(ethereum);
    //     const signer = provider.getSigner();
    //     const contract = new ethers.Contract(
    //       contractAddress,
    //       StoryShareDeployed.abi,
    //       provider
    //     );
    
    //     await contract.getAuthor("0xdD2FD4581271e230360230F9337D5c0430Bf44C0");
    //     console.log("got author");
    //   };

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
        if (this.storyContract){
            let tx = await this.storyContract.contribute(cidBytes, prevCidBytes);
            await tx.wait();
            console.log("tx included");
        }
    }

    // setStory = async (cid: string): Promise<string> => {
    //     console.log('getting story with CID ' + cid);
    //     let cidBytes = this.convertCidToBytes(cid);
    //     if (this.storyShareContract){
    //         this.StoryContractAddr = await this.storyShareContract.getStoryByCID(cidBytes);
    //         console.log("set the story contract:", this.StoryContractAddr);
    //         if (this.StoryContractAddr){
    //             this.storyContract = new ethers.Contract(
    //                 this.StoryContractAddr,
    //                 StoryDeployed.abi,
    //                 signer
    //               ) as unknown as Story;
    //               if (!this.storyContract){
    //                 throw new Error("story contract could not be set from address" + this.StoryContractAddr);
    //             }
    //         }
    //         else {
    //             throw new Error("story address is not defined");
    //         }
    //     }
    //     else {
    //         throw new Error("storyshare contract is undefined");
    //     }
    //     return this.StoryContractAddr;
    // };

    // createStory = async (cid: string): Promise<void> => {          
    //     console.log('original CID is ' + cid);
    //     let cidBytes = this.convertCidToBytes(cid);
    
    //     console.log("creating story ...");
    //     if (this.storyShareContract){
    //         let tx = await this.storyShareContract.createStory(cidBytes);
    //         await tx.wait();
        
    //         console.log("tx included");
    //     }
    //     else {
    //         throw new Error("storyshare contract is undefined");
    //     }        
    //   };
}

export default new ContractGlobal();