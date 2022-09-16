import { Button, Grid } from '@mui/material';
import * as React from 'react';
import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import Typography from '@mui/material/Typography';

import { StoryShare } from './typechain-types/StoryShare.sol/StoryShare';
import { SharedStructs } from './typechain-types/StoryShare.sol/StoryShare';
import ContractGlobal from './ContractGlobal';
import { useState, useEffect } from 'react';
import { BytesLike, ethers } from 'ethers';
import Web3Global from './Web3Global';

const Welcome = (props: any) => {
    const [storyDetailsArr, setStoryDetailsArr] = useState<SharedStructs.StoryDetailsStructOutput[]>([])
    const [storyShareContract, setStoryShareContract] = useState<StoryShare | undefined>()

    useEffect(() => {
        ContractGlobal.setContractState = setStoryShareContract;
    },[])

    useEffect(() => {   
        if (ContractGlobal.storyShareContract) {         
            ContractGlobal.storyShareContract.getStoryDetails().then((storyDetailsRes) => setStoryDetailsArr(storyDetailsRes));
        }
    },[storyShareContract, props.curCID]);

    function stringifyGenre(genreBytes: BytesLike): string {
        return ethers.utils.parseBytes32String(genreBytes);
    }

    function handleClickStory(cidBytes: string): void {
        ContractGlobal.setStory(cidBytes).then(() => {
            const storyRootCID = Web3Global.convertBytesToCid(cidBytes);
            const curCid = props.curCID;
            props.setCurCID(storyRootCID);
        });
    }

    return (
        <Box maxWidth={1000} margin='auto'>
            <br/>
            <Grid container spacing={1}>
                {storyDetailsArr.map((storyDetails) => 
                    <Grid item xs={4}>
                        <Card sx={{ minWidth: 275 }}>
                            <CardContent>
                                <Typography variant={"h5"} color="text.secondary" gutterBottom>
                                {storyDetails.title}
                                </Typography>
                                <Typography  sx={{ fontSize: 14 }} component="div">
                                {stringifyGenre(storyDetails.genre)}
                                </Typography>
                                <Typography sx={{ mb: 1.5 }} color="text.secondary">
                                {storyDetails.summary}
                                </Typography>
                            </CardContent>
                            <CardActions>
                                <Button size="small" onClick={() => handleClickStory(storyDetails.cid)}>Read</Button>
                            </CardActions>
                        </Card>                    
                    </Grid> 
                    )}
            </Grid>
        </Box>
    );
};
export default Welcome;