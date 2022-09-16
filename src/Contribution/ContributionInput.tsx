import { Button, Grid, IconButton, TextField } from '@mui/material';
import { useEffect, useState } from 'react';
import ContractGlobal from '../ContractGlobal';
import Web3Global from '../Web3Global';

const ContributionInput = (props: any) => {

    const [prevContribution, setPrevContribution] = useState("");
    const [nextContribution, setNextContribution] = useState("");

    useEffect(() => {
        props.setIsLoading(true);
       Web3Global.getStoryContent(props.curCID).then((storyContent: string) => {
            props.setIsLoading(false);
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
            ContractGlobal.storyContract?.contribute(curCidBytes, prevCIDBytes,{gasPrice:50000000000, gasLimit: 350449}).then((tx) => {
                console.log("new contribution has been added setting cid to", curCID);
                console.log("submit contrib transaction hash", tx.hash);
                Web3Global.getStoryContent(curCID).then((updatedPrev) => {
                    props.setIsLoading(true);
                    // waiting for confirmations
                    tx.wait().then(() => {
                        console.log("updating the previous contrib to ", updatedPrev);
                        setPrevContribution(updatedPrev);
                        resetContribution();
                        console.log("updating current cid to", curCID);
                        props.setCID(curCID);
                        props.setIsLoading(false);
                    })
                }).catch((err) => {
                  // TODO: output error message here, asking user to try resubmitting
                })
            })
        })
    }

    return (
        <Grid container spacing={1}>
            <Grid item xs={12}>
                <TextField
                    id="outlined-multiline-flexible"
                    label="Previous Contribution"
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
            <Grid item xs={6}>
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
