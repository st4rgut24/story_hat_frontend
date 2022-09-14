import { Button, Grid, IconButton, TextField } from '@mui/material';
import { useEffect, useState } from 'react';
import ContractGlobal from '../ContractGlobal';
import Web3Global from '../Web3Global';

const ContributionInput = (props: any) => {

    const [prevContribution, setPrevContribution] = useState("An example story you wish to contribute to");
    const [nextContribution, setNextContribution] = useState("");

    useEffect(() => {
       Web3Global.getStoryContent(props.curCID).then((storyContent: string) => {
            setPrevContribution(storyContent);
       }).catch((error: Error) => setPrevContribution("Error:" + error.message));
    }, [props.curCID])

    function resetContribution() {
        setNextContribution("");
    }

    function handleContribute(event: any) {
        setNextContribution(event.target.value);
    }

    function onContributeSubmit(event: any) {
        console.log("submitting contribution ...");
        Web3Global.getCidFromContent(nextContribution, props.curCID).then((curCID: string) => {
            console.log(`contribution cid ${curCID} to prev cid ${props.curCID}`);
            const curCidBytes = Web3Global.convertCidToBytes(curCID);
            const prevCIDBytes = Web3Global.convertCidToBytes(props.curCID); 
            ContractGlobal.storyContract?.contribute(curCidBytes, prevCIDBytes).then((tx) => {
                tx.wait().then(() => {
                    console.log("new contribution has been added setting cid to", curCID);
                    Web3Global.getStoryContent(curCID).then((updatedPrev) => {
                        console.log("updating the previous contrib to ", updatedPrev);
                        setPrevContribution(updatedPrev);
                        resetContribution();
                        console.log("updating current cid to", curCID);
                        props.setCID(curCID);
                    });
                })
            })
        })
    }

    return (
        <Grid container spacing={1}>
            <Grid item xs={12}>
                <TextField
                    id="outlined-multiline-flexible"
                    label="prevContribution"
                    fullWidth
                    multiline
                    value={prevContribution}
                    margin="normal"
                    disabled={true}
                />                
            </Grid>
            <Grid item xs={12}>
                <TextField
                    id="outlined-multiline-flexible"
                    label="Add to the Story"
                    fullWidth
                    multiline
                    minRows={10}
                    value={nextContribution}
                    onChange={handleContribute}
                    margin="normal"
                />                
            </Grid>
            <Grid item xs={12}>
                <Button
                    id="outlined-multiline-flexible"
                    onClick={onContributeSubmit}
                    disabled={nextContribution.length === 0}
                >
                    Contribute
                </Button>                
            </Grid>                   
        </Grid>
    );
};
export default ContributionInput;
