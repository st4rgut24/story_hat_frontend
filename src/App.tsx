import React, { useEffect, useState } from "react";

import { Filelike } from "web3.storage/dist/src/lib/interface";
import ContractGlobal from "./ContractGlobal";
import Contribution from "./Contribution/Contribution";
import Create from "./Create";
import Header from "./Header";
import Web3Global from "./Web3Global";
import Welcome from "./Welcome";

declare var window: any

const DEFAULT_STORY_HEADER = "Create a new story or contribute to an existing one";

export default function App() {

  const [storyHeader, setStoryHeader] = useState(DEFAULT_STORY_HEADER);
  const [storyText, setStoryText] = useState("")

  // const [file, setFile] = useState()
  const [cid, setCid] = useState("")
  const [contrib, setContrib] = useState()
  const [storyAddr, setStoryAddr] = useState("")
  const [page, setPage] = useState("Welcome")

  useEffect(() => {
    connectWallet();
  }, []);

  // function handleUploadChange(event: any) {
  //   setFile(event.target.files[0])
  // }

  function handleContribChange(event: any) {
    setContrib(event.target.value);
  }

  function handleCidChange(event: any) {
    console.log('set cid to', event.target.value);
    setCid(event.target.value);
  }  

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

      // TODO: comment after testing
      // let storyCid = "bafybeiafq5wduk7u7jhefvglhyr2z56fupj66qsinchei2klnn7beirkky";
      // await ContractGlobal.getStory(storyCid);
    } catch (error) {
      console.log(error);
    }
  };

  async function getCidFromContent(text: string):Promise<string>  {
    var blob = new Blob([text], { type: 'text/plain' });
    var file = new File([blob], "test.txt", {type: "text/plain"});        
    let curCid = await storeFiles([file]);
    if (curCid) {
      return curCid;
    }
    else {
      throw new Error("Could not get cid from content:" + text);
    }
  }

  async function handleCreateStory(event: any){
    console.log('creating a story');
    event.preventDefault();
    if (contrib) {
        // TODO: uncomment after testing
        let curCid = await getCidFromContent(contrib);
        // TODO: comment after testing
        // let curCid = "bafybeihtklzuu4smhzvxzadydyc5wa5trv6kgwd5ixko2u6sd6sxmdftpy";

        await ContractGlobal.createStory(curCid);
        await getStoryContent(curCid);
        let storyAddr = await ContractGlobal.setStory(curCid);
        console.log('story found at ' + storyAddr);
        setStoryAddr(storyAddr);        
    }
  }

  async function handleContribute(event: any){
    console.log('contributing to a story');
    event.preventDefault();
    if (contrib){
      if (cid){
        // TODO: uncomment after testing
        let curCid = await getCidFromContent(contrib);

        // TODO: comment after testing
        // let curCid = "bafybeiggfwuemliutv3nruqpaxv67ootd2dqnbgmrsbvttttfwjknhi6fa";

        if (curCid){
          await ContractGlobal.contribute(cid, curCid);
          console.log(`successfully contributed ${curCid} to prev cid ${cid}`);
          await getStoryContent(curCid);
        }
        else {
          throw new Error("Unable to convert text to a file");
        }
      }
      else {
        console.error("no cid chosen to contribute to");
      }
    }
    else {
      console.error("no contribution is available");
    }
  }

  // function handlePostWeb3(event: any) {
  //   console.log('submitting file');
  //   event.preventDefault();
  //   if (file){
  //     storeFiles([file]);
  //   }
  //   else {
  //     console.error("no file was chosen for submission");
  //   }
  // }

  // call after creating a story
  // call after contributing to a story
  // call after retrieving an existing contribution
  function handleGetContent(event: any) {
    console.log('retrieving a file with cid', cid);
    event.preventDefault();
    if (cid) {
      getStoryContent(cid);
    }
  }  

  function handleGetStatus(event: any) {
    console.log('retrieving status for file with cid', cid);
    event.preventDefault();
    if (cid) {
      getStoryStatus(cid);
    }
  }

  async function getStoryStatus(cid: string) {
    if (Web3Global.web3Storage) {
      const status = await Web3Global.web3Storage.status(cid)
      if (status) {
        console.log('logging status', status);
      }
    }
  }

  // retrieve the contents of a contribution using its CID 
  async function getStoryContent (cid: string) {
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
          let storyText = await file.text();
          console.log('set story text', storyText);
          setStoryText(storyText);
          setStoryHeader(cid);
          console.log('setting story addr');
          setCid(cid);
        }
      }
    }
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
      throw new Error("storage client missing");
    }
  }

  return (
    <div className="App">
        <Header setPage={setPage}/>
        {page==="Welcome" && <Welcome/>}
        {page==="Create" && <Create/>}
        {page==="Contribute" && <Contribution/>}

        <form onSubmit={handleGetContent}>
          <input type="text" onChange={handleCidChange}/>
          <button type="submit">Retrieve By CID</button> 
        </form>
        <form onSubmit={handleCreateStory}>
          <input type="text" onChange={handleContribChange}/>
          <button type="submit">Create New Story</button>
        </form>
        <br/>
        <h1>{storyHeader}</h1>
        <div id="storyContent">{storyText}</div>
        <br/>    
        <h1>Contribute</h1>
        <form onSubmit={handleContribute}>
          <textarea id="storyContrib" onChange={handleContribChange}/>
          <br/>
          <button type="submit" disabled={storyAddr.length === 0}>Contribute</button>
        </form>              
        {/* <form onSubmit={handlePostWeb3}>
          <h1>Upload File</h1>
          <input type="file" onChange={handleUploadChange}/>
          <button type="submit">Upload</button>
        </form>
        <br/> */}
        {/* <h1>Set CID to Contribute To</h1>
        <input type="text" onChange={handleCidChange}/>
        <br/> */}
        <br/>
        <br/>
        <form onSubmit={handleGetStatus}>
          <h3>Retrieve Status From CID</h3>
          <input type="text" onChange={handleCidChange}/>
          <button type="submit">Get Status</button>
        </form>        
    </div>
  )
}