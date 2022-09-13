import { Button, Grid } from '@mui/material';
import * as React from 'react';
import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import Typography from '@mui/material/Typography';

import { SharedStructs } from './typechain-types/StoryShare.sol/StoryShare';
import ContractGlobal from './ContractGlobal';
import { useState, useEffect } from 'react';
import { BytesLike, ethers } from 'ethers';

const Welcome = (props: any) => {
    const [storyDetailsArr, setStoryDetailsArr] = useState<SharedStructs.StoryDetailsStructOutput[]>([])

    useEffect(() => {   
        if (ContractGlobal.storyShareContract) {
            ContractGlobal.storyShareContract.getStoryDetails().then((storyDetailsRes) => setStoryDetailsArr(storyDetailsRes));
        }
    }, [ContractGlobal.storyShareContract]);

    function stringifyGenre(genreBytes: BytesLike): string {
        return ethers.utils.parseBytes32String(genreBytes);
    }

    function handleClickStory(cid: string): void {
        props.setChosenCID(cid);
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