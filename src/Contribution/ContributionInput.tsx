import { Button, Grid, IconButton, TextField } from '@mui/material';
import { useEffect, useState } from 'react';
import ContractGlobal from '../ContractGlobal';
import Web3Global from '../Web3Global';

const ContributionInput = (props: any) => {

    const [prevContribution, setPrevContribution] = useState("An example story you wish to contribute to");
    const [contribution, setContribution] = useState("");

    useEffect(() => {
       Web3Global.getStoryContent(props.prevCID).then((storyContent: string) => {
            setPrevContribution(storyContent);
       }).catch((error: Error) => setPrevContribution("Error:" + error.message));
    }, [])

    function handleContribute(event: any) {
        setContribution(event.target.value);
    }

    function onContributeSubmit(event: any) {
        // TODO contribute()
        Web3Global.getCidFromContent(contribution, props.prevCID).then((curCID: string) => {
            ContractGlobal.storyContract?.contribute(curCID, props.prevCID).then((tx) => {
                tx.wait().then(() => {
                    console.log("new contribution has been added");
                    props.setCID(curCID);
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
                    label="contribution"
                    fullWidth
                    multiline
                    minRows={10}
                    value={contribution}
                    onChange={handleContribute}
                    margin="normal"
                />                
            </Grid>
            <Grid item xs={12}>
                <Button
                    id="outlined-multiline-flexible"
                    onClick={onContributeSubmit}
                >
                    Contribute
                </Button>                
            </Grid>                   
        </Grid>
    );
};
export default ContributionInput;
