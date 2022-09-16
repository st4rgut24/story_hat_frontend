import React, { useEffect, useState } from "react";

import ContractGlobal from "./ContractGlobal";
import Contribution from "./Contribution/Contribution";
import Create from "./Create";
import Header from "./Header";
import Spinner from "./Spinner";
import Welcome from "./Welcome";

import { useWeb3React } from '@web3-react/core'

declare var window: any

export const CONTRIBUTE_PAGE = "Contribute";

export default function App() {
  const [signer, setSigner] = useState();
  const [page, setPage] = useState("Welcome")
  const [curCID, setCurCID] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const { library } = useWeb3React();

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
        {page==="Create" && <Create setIsLoading={setIsLoading} />}
        {page===CONTRIBUTE_PAGE && <Contribution setCurCID={setCurCID} curCID={curCID} setIsLoading={setIsLoading} />}
        <Spinner isLoading={isLoading} />
    </div>
  )
}