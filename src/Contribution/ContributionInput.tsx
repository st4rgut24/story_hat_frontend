import { Button, Grid, IconButton, TextField } from '@mui/material';
import { useState } from 'react';

const ContributionInput = () => {

    const [prevContribution, setPrevContribution] = useState("An example story you wish to contribute to");
    const [contribution, setContribution] = useState("");

    function handleContribute(event: any) {
        setContribution(event.target.value);
    }

    function onContribute(event: any) {
        // TODO
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
                    onClick={onContribute}
                >
                    Contribute
                </Button>                
            </Grid>                   
        </Grid>
    );
};
export default ContributionInput;
