import React, { useEffect, useState } from "react";
import { Button } from "@mui/material";
import ContractGlobal, { StorylineMap } from "./ContractGlobal";
import { SharedStructs } from "./typechain-types/LibraryStoryline";

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

    // export const StorylineMap = ['Open', 'Drafting', 'Final Review', 'Publish'];
    let status: ContribStatus = DEFAULT_CONTRIB_STATUS;
    useEffect(() => {
        const state = StorylineMap[props.contribution.state];
        const isAuthor = isUserAuthor(props.userAddr);

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
        setContribStatus(status);
    }, props.contribution.state)

    // is use an author of the storyline
    function isUserAuthor(userAddr: string): boolean {
        const contribs = props.storyline as SharedStructs.ContributionStructOutput[];
        return contribs.find((contrib) => contrib.authorAddr === userAddr) !== undefined;
    }

    function voteToDraft(): void {
        if (contribState.contribution){
            ContractGlobal.voteToDraft(contribState.contribution.cid);
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
            contribStat.header
        </Button>
    )
}