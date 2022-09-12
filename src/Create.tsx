import * as React from 'react';
import Box from '@mui/material/Box';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select, { SelectChangeEvent } from '@mui/material/Select';
import { styled } from '@mui/material/styles';
import Paper from '@mui/material/Paper';

import { Button, Grid, TextField } from '@mui/material';
import { useState } from 'react';

const Create = () => {
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

    function onCreateStory(event: any) {
        // TODO: create story
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
                    >
                        Create
                    </Button>                
                </Grid>                
            </Grid>
        </Box>
    );
};
export default Create;
