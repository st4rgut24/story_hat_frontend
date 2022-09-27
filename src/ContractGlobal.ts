import { BytesLike, Contract, ethers } from "ethers";

import StoryDeployed from "./artifacts/contracts/StoryShare.sol/Story.json";
import GreetDeployed from "./artifacts/contracts/StoryShare.sol/Greeter.json";
import StoryShareDeployed from "./artifacts/contracts/StoryShare.sol/StoryShare.json";

import { StoryShare } from './typechain-types/StoryShare.sol/StoryShare';
import { Story } from './typechain-types/StoryShare.sol/Story';

declare var window: any

// TODO: REPLACE EVERY TIME CONTRACT IS DEPLOYED
const SharedStoryContractAddr = "0xf24478CEb2e6913d530D7E954f4F8DbFCB00cF3F";

export const StorylineMap = ['Open', 'Drafting', 'Final Review', 'Publish'];

class ContractGlobal {
    storyShareContract: StoryShare | undefined;
    StoryContractAddr: string | undefined; // address of the story contract
    storyContract: Story | undefined;

    address: string | undefined;
    provider: ethers.providers.Web3Provider | undefined;
    signer: any;

    setUserAddr: ((userAddr: string) => void) | undefined;
    setContractState: ((storyShareContract: StoryShare) => void) | undefined;
    setConnectedState: ((isConnected: boolean) => void) | undefined;

    constructor(){
        const { ethereum } = window;
        if (!ethereum) {
            alert("Please install MetaMask!");
            return;
          }
        this.provider = new ethers.providers.Web3Provider(ethereum);
        this.connectWallet();
    }

    connectWallet = async () => {
        this.provider?.send("eth_requestAccounts", []).then(() => {
            this.signer = this.provider?.getSigner();

            this.storyShareContract = new Contract(
                SharedStoryContractAddr,
                StoryShareDeployed.abi,
                this.signer
            ) as unknown as StoryShare; 
            // inform other components that the contract has been set and user connected           
            if (this.setContractState) {
                this.setContractState(this.storyShareContract);
            }
            if (this.setConnectedState) {
                this.setConnectedState(true);
            }
            return this.signer.getAddress();
        }).then((address) => {
            if (this.setUserAddr) {
                this.setUserAddr(address);
            }
            console.log('connected address is', address);
        })
        .catch((error) => {
            console.error('error reason', error.message);
        });
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

    voteToDraft = async(cid: string) => {
        if (this.storyContract){
            let tx = await this.storyContract.voteToDraft(cid);
            await tx.wait();
        }
    }

    voteToPublish = async(cid: string) => {
        if (this.storyContract){
            let tx = await this.storyContract.voteToPublish(cid);
            await tx.wait();
        }
    }

    publishDraft = async(prevCid: string, cid: string) => {
        if (this.storyContract){
            let tx = await this.storyContract.publishDraft(prevCid, cid);
            await tx.wait();
        }
    }

    getContribution = async(cidBytes: BytesLike) => {
        if (this.storyContract) {
            const contrib = await this.storyContract.getContribution(cidBytes)
            return contrib;
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