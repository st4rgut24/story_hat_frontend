import Story from "./artifacts/contracts/StoryShare.sol/Story.json";
import StoryShare from "./artifacts/contracts/StoryShare.sol/StoryShare.json";
import { Web3Storage } from 'web3.storage'

import React, { useEffect, useState } from "react";
import { ethers } from "ethers";
import { CID } from 'multiformats/cid'
import { Filelike } from "web3.storage/dist/src/lib/interface";
import Web3Global from "./Web3Global";

declare var window: any

export default function App() {
  // let web3Storage: Web3Storage;

  const [storyText, setStoryText] = useState("")
  const [file, setFile] = useState()
  const [cid, setCid] = useState()
  
  function handleUploadChange(event: any) {
    setFile(event.target.files[0])
  }

  function handleCidChange(event: any) {
    console.log('set cid to', event.target.value);
    setCid(event.target.value);
  }  
    
  useEffect(() => {
    connectWallet();
  }, []);

  const connectWallet = async () => {
    console.log('connect wallet');
    // try {
    //   console.log('connect wallet');
    //   const { ethereum } = window;

    //   if (!ethereum) {
    //     alert("Please install MetaMask!");
    //     return;
    //   }

    //   const accounts = await ethereum.request({
    //     method: "eth_requestAccounts",
    //   });

    //   console.log("Connected", accounts[0]);
    //   // createStory();
    // } catch (error) {
    //   console.log(error);
    // }
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

  function handlePostWeb3(event: any) {
    console.log('submitting file');
    event.preventDefault()
    if (file){
      storeFiles([file]);
    }
    else {
      console.error("no file was chosen for submission");
    }
  }

  function handleGetWeb3(event: any) {
    console.log('retrieving a file with cid', cid);
    event.preventDefault();
    if (cid) {
      retrieve(cid);
    }
  }  

  async function retrieve (cid: string) {
    if (Web3Global.web3Storage) {
      const res = await Web3Global.web3Storage.get(cid)
      if (res) {
        console.log(`Got a response! [${res.status}] ${res.statusText}`);
        let files = await res.files();
        if (!res.ok) {
          throw new Error(`failed to get ${cid}`);
        }
        else if (files.length > 0) {
          let file = files[0];
          // request succeeded! do something with the response object here...
          console.log(`${file.cid} -- ${file.size}`)
          let storyText = await file.text();
          console.log(storyText);
          
        }
      }
    }
  }

  function setStory(storyText: string) {
    setStoryText(storyText);
  }

  async function storeFiles (files: Iterable<Filelike>): Promise<string | void> {
    console.log('making storage client...');
    if (Web3Global.web3Storage) {
      console.log('storing files...');
      const cid = await Web3Global.web3Storage.put(files)
      console.log('stored files with cid:', cid)
      return cid
    }
    else {
      console.log('could not create storage client');
    }
  }

  return (
    <div className="App">
        <div id="storyBox">{storyText}</div>
        <br/>
        <form onSubmit={handlePostWeb3}>
          <h1>Upload File</h1>
          <input type="file" onChange={handleUploadChange}/>
          <button type="submit">Upload</button>
        </form>
        <br/>
        <form onSubmit={handleGetWeb3}>
          <h1>Retrieve File</h1>
          <input type="text" onChange={handleCidChange}/>
          <button type="submit">Retrieve</button>
        </form>
    </div>
  )
}