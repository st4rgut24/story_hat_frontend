import { useEffect, useState } from "react";
import ContractGlobal from "./ContractGlobal";

import Contribution from "./Contribution/Contribution";
import Create from "./Create";
import Header from "./Header";
import Spinner from "./Spinner";
import Welcome from "./Welcome";

export const CONTRIBUTE_PAGE = "Contribute";

export default function App() {
  const [page, setPage] = useState("Welcome")
  const [curCID, setCurCID] = useState("");
  const [userAddr, setUserAddr] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  
  useEffect(() => {
    if (curCID !== ""){
      setPage(CONTRIBUTE_PAGE);
    }
  }, [curCID]);  

  useEffect(() => {
    ContractGlobal.setUserAddr = setUserAddr;
},[])  

  return (
    <div className="App">
        <Header setPage={setPage} setCurCID={setCurCID} setUserAddr={setUserAddr}/>
        {page==="Welcome" && <Welcome setCurCID={setCurCID} curCID={curCID}/>}
        {page==="Create" && <Create setPage={setPage} setIsLoading={setIsLoading} />}
        {page===CONTRIBUTE_PAGE && <Contribution setCurCID={setCurCID} curCID={curCID} setIsLoading={setIsLoading} userAddr={userAddr}/>}
        <Spinner isLoading={isLoading} />
    </div>
  )
}