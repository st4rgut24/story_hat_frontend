import { Button, Grid, IconButton, TextField } from '@mui/material';
import Box from '@mui/material/Box';
import { useState } from 'react';
import ArrowBackIosIcon from '@mui/icons-material/ArrowBackIos';
import ArrowForwardIosIcon from '@mui/icons-material/ArrowForwardIos';

import ContributionInput from './ContributionInput';
import ContributionNav from './ContributionNav';
import ContributionTree from './ContributionTree';

const Contribution = () => {
    const [next, setNext] = useState(-1)
    const [prev, setPrev] = useState(-1)

    function onGetNextContrib(event: any) {
        // TODO
    }

    function onGetPrevContrib(event: any) {
        // TODO
    }

    return (
        <Box maxWidth={1000} margin='auto'>
            <Grid container spacing={1}>
                <Grid item xs={12}>
                    <h1>Contribute</h1>
                </Grid>
                <Grid item xs={6}>
                    <ContributionInput/>
                </Grid>
                <Grid item xs={6}>
                    <ContributionNav setNext={setNext} setPrev={setPrev}/>
                </Grid>  
                <Grid item xs={6}>
                    <IconButton
                        size="large"
                        aria-label="account of current user"
                        aria-controls="menu-appbar"
                        aria-haspopup="true"
                        onClick={onGetPrevContrib}
                        color="inherit"
                        disabled={prev === -1}
                    >
                        <ArrowBackIosIcon/>
                    </IconButton>                             
                </Grid>
                <Grid item xs={6} container justifyContent="flex-end">
                    <IconButton
                        size="large"
                        aria-label="account of current user"
                        aria-controls="menu-appbar"
                        aria-haspopup="true"
                        onClick={onGetNextContrib}
                        color="inherit"
                        disabled={next === -1}
                    >
                        <ArrowForwardIosIcon/>
                    </IconButton>               
                </Grid>

            </Grid>
        </Box>
    );
};
export default Contribution;