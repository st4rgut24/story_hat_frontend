import React, { useEffect, useState } from "react";
import { Button } from "@mui/material";
import ContractGlobal, { StorylineMap } from "./ContractGlobal";
import { SharedStructs } from "./typechain-types/LibraryStoryline";
import Web3Global from "./Web3Global";
import { ethers } from "ethers";

export const CONTRIBUTE_PAGE = "Contribute";

interface ContribStatus {
    header: string;
    contribution: SharedStructs.ContributionStructOutput | undefined;
    disabled: boolean;
    clickHandler?: () => void;
}

const DEFAULT_CONTRIB_STATUS: ContribStatus = {
    header: '',
    contribution: undefined,
    disabled: true
}

export default function Vote(props: any) {
    const [contribState, setContribStatus] = useState<ContribStatus>(DEFAULT_CONTRIB_STATUS);
    const [bytesCID, setBytesCID] = useState(new Uint8Array());
    
    // export const StorylineMap = ['Open', 'Drafting', 'Final Review', 'Publish'];
    let status: ContribStatus = DEFAULT_CONTRIB_STATUS;
    useEffect(() => {
        if (props.storyline.length > 0 && props.contribution){
            const state = StorylineMap[props.contribution.state];
            const cidBytes = ethers.utils.arrayify(props.contribution.cid);
            setBytesCID(cidBytes);
            const isAuthor = isUserAuthor(props.userAddr);
            // comment after testing
            if (!isAuthor){
                console.log('you are not an author');
            }
            else {
                console.log('you are an author');
            }
            status = getStatus(state, isAuthor);            
            setContribStatus(status);   
        }
    }, [props.storyline, props.contribution])

    /**
     * Get the status of contribution as regards to publishing
     * @param state where contribution is in the publishing process
     * @param isAuthor is signer author of the contribution
     * @returns status which controls the status component
     */
    function getStatus(state: string, isAuthor: boolean): ContribStatus {
        if (state === 'Open'){
            if (isAuthor) {
                status = {header: 'Vote to Draft Story', contribution: props.contribution, disabled: false, clickHandler:voteToDraft}
            }
        }
        else if (state === 'Final Review'){
            if (isAuthor) {
                status = {header: 'Vote to Publish', contribution: props.contribution, disabled: false, clickHandler:voteToPublish}
            }            
        }
        else if (state === 'Drafting'){
            if (props.contribution.leader === props.userAddr) {
                status = {header: 'Submit draft', contribution: props.contribution, disabled: false, clickHandler:submitDraft}                
            }
            else {
                status = {header: 'Waiting for Draft', contribution: props.contribution, disabled: true}
            }
        }
        else if (state === 'Publish')
            status = {header: 'Published', contribution: props.contribution, disabled: true}
        else {
            throw new Error("no such state");
        }
        return status;
    }

    // is use an author of the storyline
    function isUserAuthor(userAddr: string): boolean {
        const contribs = props.storyline as SharedStructs.ContributionStructOutput[];
        return contribs.find((contrib) => contrib.authorAddr === userAddr) !== undefined;
    }

    // TODO: Sometimes does not work with the Root story because contribState is not set
    async function voteToDraft(): Promise<void> {
        if (contribState.contribution){
            await ContractGlobal.voteToDraft(contribState.contribution.cid)
            console.log("successfully voted to draft");
            const contrib = await ContractGlobal.getContribution(bytesCID);
            console.log("successfully got contribution after voting to draft");
            props.setContribution(contrib);
        }
    }

    function submitDraft(): void {
        if (contribState.contribution){
            ContractGlobal.publishDraft(contribState.contribution.prevCID, contribState.contribution.cid);
        }
    }

    function voteToPublish(): void {
        if (contribState.contribution){
            ContractGlobal.voteToPublish(contribState.contribution.cid);
        }
    }

    function isContribStateExist(): boolean {
        return contribState.header.length > 0;
    }

    return (
        <Button disabled={contribState.disabled} onClick={contribState.clickHandler} hidden={!isContribStateExist()}>
            {contribState.header}
        </Button>
    )
}