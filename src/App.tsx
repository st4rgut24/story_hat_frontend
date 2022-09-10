import Story from "./artifacts/contracts/StoryShare.sol/Story.json";
import StoryShare from "./artifacts/contracts/StoryShare.sol/StoryShare.json";

import {Story as StoryType, StoryShare as StoryShareType} from "../../story_hat_backend/typechain-types"

import React, { useEffect } from "react";
import { ethers } from "ethers";
import { CID } from 'multiformats/cid'

declare var window: any

export default function App() {
  useEffect(() => {
    connectWallet();
  }, []);

  const connectWallet = async () => {
    try {
      console.log('connect wallet');
      const { ethereum } = window;

      if (!ethereum) {
        alert("Please install MetaMask!");
        return;
      }

      const accounts = await ethereum.request({
        method: "eth_requestAccounts",
      });

      console.log("Connected", accounts[0]);
      createStory();
    } catch (error) {
      console.log(error);
    }
  };

  const createStory = async () => {
    let contractAddress = "0x5FbDB2315678afecb367f032d93F642f64180aa3";
    const { ethereum } = window;

    if (!ethereum) {
      alert("Please install MetaMask!");
      return;
    }

    const provider = new ethers.providers.Web3Provider(ethereum);
    const signer = provider.getSigner();
    const storyShareContract = new ethers.Contract(
      contractAddress,
      StoryShare.abi,
      signer
    );
    
    const exampleCID = 'bagaaierasords4njcts6vs7qvdjfcvgnume4hqohf65zsfguprqphs3icwea';

    console.log('original CID is ' + exampleCID);
    const v0 = CID.parse(exampleCID);
    const v1 = v0.toV1();

    // use for retrieval of the CID string when getting from contract
    // const decodedV1 = CID.decode(v1.bytes);

    const isCID = CID.asCID(v0);
    if (!isCID){
      throw new Error(`${exampleCID} Not CID, cant create a story`);
    }

    console.log("creating story ...");
    let tx = await storyShareContract.connect(signer).createStory(v1.bytes);
    await tx.wait();

    console.log("tx included");

    const storyAddr = await storyShareContract.connect(signer).getStoryByCID(v1.bytes);

    console.log("retrieved the story: " + storyAddr);
  };

  return <div></div>;
}