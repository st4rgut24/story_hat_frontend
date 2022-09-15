import { BytesLike, Contract, ethers } from "ethers";

import StoryDeployed from "./artifacts/contracts/StoryShare.sol/Story.json";
import GreetDeployed from "./artifacts/contracts/StoryShare.sol/Greeter.json";
import StoryShareDeployed from "./artifacts/contracts/StoryShare.sol/StoryShare.json";

import { StoryShare } from './typechain-types/StoryShare.sol/StoryShare';
import { Story } from './typechain-types/StoryShare.sol/Story';
import { JsonRpcProvider, JsonRpcSigner } from "@ethersproject/providers";

declare var window: any

const SharedStoryContractAddr = "0x5468C4eDf4A2e4055E408c365aD5EAd12541bf7a";

class ContractGlobal {
    storyShareContract: StoryShare | undefined;
    StoryContractAddr: string | undefined; // address of the story contract
    storyContract: Story | undefined;

    signer: any;
    setContractState: ((storyShareContract: StoryShare) => void) | undefined;
    
    setSigner = async (library: any) => {
        this.signer = await library.getSigner();
        this.storyShareContract = new Contract(
            SharedStoryContractAddr,
            StoryShareDeployed.abi,
            this.signer
            ) as unknown as StoryShare;

        if (this.setContractState) {
            this.setContractState(this.storyShareContract);
        }    
    }

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
            if (this.StoryContractAddr && this.signer){
                this.storyContract = new ethers.Contract(
                    this.StoryContractAddr,
                    StoryDeployed.abi,
                    this.signer
                  ) as unknown as Story;
                  if (!this.storyContract){
                    throw new Error("story contract could not be set from address" + this.StoryContractAddr);
                }
            }
            else {
                throw new Error("story address is not defined or signer does not exist");
            }
        }
        else {
            throw new Error("storyshare contract is undefined");
        }
    };
}

export default new ContractGlobal();