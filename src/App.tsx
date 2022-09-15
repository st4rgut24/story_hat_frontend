import React, { useEffect, useState } from "react";

import { WalletLinkConnector } from "@web3-react/walletlink-connector";
import { InjectedConnector } from "@web3-react/injected-connector";

import ContractGlobal from "./ContractGlobal";
import Contribution from "./Contribution/Contribution";
import Create from "./Create";
import Header from "./Header";
import Spinner from "./Spinner";
import Welcome from "./Welcome";

import { useWeb3React } from '@web3-react/core'

declare var window: any

export const CONTRIBUTE_PAGE = "Contribute";

const CoinbaseWallet = new WalletLinkConnector({
  url: `https://goerli.infura.io/v3/14c911050f2b4ae792218579902f1a6c`,
  appName: "storyhat",
  supportedChainIds: [1, 5, 1337],
  });
  
  const Injected = new InjectedConnector({
  supportedChainIds: [1, 5, 1337] // 1 is mainnet, 5 is goerli, 1337 is localhost:8545
  });

export default function App() {
  const [signer, setSigner] = useState();
  const [page, setPage] = useState("Welcome")
  const [curCID, setCurCID] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const { activate, deactivate } = useWeb3React();
  const { library } = useWeb3React();
  const { active, chainId, account } = useWeb3React();

  useEffect(() => {
    if (library){
      ContractGlobal.setSigner(library);
      setSigner(library);
    }
  }, [library]);

  useEffect(() => {
    if (curCID !== ""){
      setPage(CONTRIBUTE_PAGE);
    }
  }, [curCID]);  

  return (
    <div className="App">
        <Header setPage={setPage} setCurCID={setCurCID} />
        {page==="Welcome" && <Welcome signer={signer} setCurCID={setCurCID} curCID={curCID}/>}
        {page==="Create" && <Create/>}
        {page===CONTRIBUTE_PAGE && <Contribution setCurCID={setCurCID} curCID={curCID} setIsLoading={setIsLoading} />}
        <Spinner isLoading={isLoading} />
        <button onClick={() => { activate(CoinbaseWallet) }}>Coinbase Wallet</button>
        <button onClick={() => { activate(Injected) }}>Metamask</button>
        <button onClick={deactivate}>Disconnect</button>

        <div>Connection Status: {active}</div>
        <div>Account: + {account}</div>
        <div>Network ID: {chainId}</div>        
    </div>
  )
}