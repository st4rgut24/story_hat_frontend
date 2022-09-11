import * as React from 'react';
import Box from '@mui/material/Box';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select, { SelectChangeEvent } from '@mui/material/Select';

import { TextField } from '@mui/material';
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

    return (
        <Box>
            <TextField
                id="outlined-name"
                label="Title"
                value={title}
                onChange={handleTitleChange}
            />  
            <FormControl fullWidth>
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
            <TextField
                id="outlined-multiline-flexible"
                label="Multiline"
                multiline
                maxRows={4}
                value={summary}
                onChange={handleSummaryChange}
            />
        </Box>
    );
};
export default Create;
