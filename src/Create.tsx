import * as React from 'react';
import Box from '@mui/material/Box';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';

import { Button, Grid, TextField } from '@mui/material';
import { useState } from 'react';
import ContractGlobal from './ContractGlobal';
import Web3Global from './Web3Global';
import { ethers } from 'ethers';

const Create = (props: any) => {
    const [title, setTitle] = useState('')
    const [genre, setGenre] = useState('Thriller');
    const [summary, setSummary] = useState('');

    function handleTitleChange(event: any){
        setTitle(event.target.value)
    }

    function handleGenreChange(event: any){
        setGenre(event.target.value)
    }

    function handleSummaryChange(event: any){
        setSummary(event.target.value)
    }

    function createInitialContrib(): string {
        return `Summary \n ${summary}`;
    }
    
    async function onCreateStory(event: any) {
        event.preventDefault();
        // TODO: get contribution from fields
        const initialContrib = createInitialContrib();
        let curCid = await Web3Global.getCidFromContent(initialContrib, title);
        if (curCid) {
            // convert to bytes because contract stores cids as byte array
            let cidBytes = Web3Global.convertCidToBytes(curCid);
            console.log("creating story ...");
            console.log("bytes-like", cidBytes);
            if (ContractGlobal.storyShareContract){
                const bytes32Genre = ethers.utils.formatBytes32String(genre);
                let tx = await ContractGlobal.storyShareContract.createStory(cidBytes, title, summary, bytes32Genre);
                props.setIsLoading(true);
                await tx.wait();
                console.log("tx included");
                props.setIsLoading(false);
                
            }
            else {
                throw new Error("storyshare contract is undefined");
            }  
        }
    }

    function isStoryTextSet(): boolean{
        return title.length > 0 && genre.length > 0 && summary.length > 0;
    }

    return (
        <Box maxWidth={500} margin='auto'>
            <Grid container spacing={1}>
                <Grid item xs={12}>
                    <h1>Create a Story</h1>
                </Grid>
                <Grid item xs={12}>
                    <TextField
                        id="outlined-name"
                        label="Title"
                        fullWidth
                        value={title}
                        onChange={handleTitleChange}
                        margin="normal"
                    />                 
                </Grid>
                <Grid item xs={12}>
                    <FormControl fullWidth margin="normal">
                        <InputLabel id="demo-simple-select-label">Genre</InputLabel>
                        <Select
                            labelId="demo-simple-select-label"
                            id="demo-simple-select"
                            value={genre}
                            label="Genre"
                            onChange={handleGenreChange}
                        >
                            <MenuItem value={"Thriller"}>Thriller</MenuItem>
                            <MenuItem value={"Crime"}>Crime</MenuItem>
                            <MenuItem value={"Fantasy"}>Fantasy</MenuItem>
                            <MenuItem value={"Romance"}>Romance</MenuItem>
                            <MenuItem value={"Science Fiction"}>Science Fiction</MenuItem>
                            <MenuItem value={"Adventure"}>Adventure</MenuItem>
                        </Select>
                    </FormControl>                
                </Grid>
                <Grid item xs={12}>
                    <TextField
                        id="outlined-multiline-flexible"
                        label="Summary"
                        fullWidth
                        multiline
                        minRows={4}
                        value={summary}
                        onChange={handleSummaryChange}
                        margin="normal"
                    />                
                </Grid>
                <Grid item xs={12}>
                    <Button
                        id="outlined-multiline-flexible"
                        onClick={onCreateStory}
                        disabled={!isStoryTextSet()}
                    >
                        Create
                    </Button>                
                </Grid>                
            </Grid>
        </Box>
    );
};
export default Create;
