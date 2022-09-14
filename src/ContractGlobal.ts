import { BytesLike, Contract, ethers } from "ethers";

import StoryDeployed from "./artifacts/contracts/StoryShare.sol/Story.json";
import GreetDeployed from "./artifacts/contracts/StoryShare.sol/Greeter.json";
import StoryShareDeployed from "./artifacts/contracts/StoryShare.sol/StoryShare.json";

import { StoryShare } from './typechain-types/StoryShare.sol/StoryShare';
import { Story } from './typechain-types/StoryShare.sol/Story';

declare var window: any

const SharedStoryContractAddr = "0x0DCd1Bf9A1b36cE34237eEaFef220932846BCD82";

let signer: ethers.providers.JsonRpcSigner;

class ContractGlobal {
    storyShareContract: StoryShare | undefined;
    StoryContractAddr: string | undefined; // address of the story contract
    storyContract: Story | undefined;

    constructor(){

        const signer = this.getSigner();
        this.storyShareContract = new Contract(
            SharedStoryContractAddr,
            StoryShareDeployed.abi,
            signer
          ) as unknown as StoryShare;

          // TEST CALLS HERE
          //   this.storyShareContract.getAuthor('0xdD2FD4581271e230360230F9337D5c0430Bf44C0').then(() => console.log('great success'));
    }
    
    getSigner = () => {
        const { ethereum } = window;
    
        if (!ethereum) {
          alert("Please install MetaMask!");
          return;
        }
    
        const provider = new ethers.providers.Web3Provider(ethereum);
        const signer = provider.getSigner(); 
        return signer;       
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

    contribute = async (prevCid: string, cid: string) => {
        console.log(`contributing cid ${cid} to prev cid ${prevCid}`);
        console.log("contributing story ...");
        if (this.storyContract){
            let tx = await this.storyContract.contribute(cid, prevCid);
            await tx.wait();
            console.log("tx included");
        }
    }

    /**
     * 
     * @param cid the unique id of a contribution in this story
     */
    setStory = async (cid: BytesLike): Promise<void> => {
        console.log('getting story with CID ' + cid);
        if (this.storyShareContract){
            this.StoryContractAddr = await this.storyShareContract.getStoryByCID(cid);
            console.log("set the story contract:", this.StoryContractAddr);
            if (this.StoryContractAddr){
                const signer = this.getSigner();                           
                this.storyContract = new ethers.Contract(
                    this.StoryContractAddr,
                    StoryDeployed.abi,
                    signer
                  ) as unknown as Story;
                  if (!this.storyContract){
                    throw new Error("story contract could not be set from address" + this.StoryContractAddr);
                }
            }
            else {
                throw new Error("story address is not defined");
            }
        }
        else {
            throw new Error("storyshare contract is undefined");
        }
    };

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