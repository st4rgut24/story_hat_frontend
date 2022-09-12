import { Button, Grid, IconButton, TextField } from '@mui/material';
import * as React from 'react';
import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import Typography from '@mui/material/Typography';

const bull = (
    <Box
      component="span"
      sx={{ display: 'inline-block', mx: '2px', transform: 'scale(0.8)' }}
    >
      •
    </Box>
  );

const Welcome = () => {
    return (
        <Box maxWidth={1000} margin='auto'>
            <br/>
            <Grid container spacing={1}>
                {[0, 1, 2, 3, 4, 5, 6, 7, 8].map((value) => 
                <Grid item xs={4}>
                    <Card sx={{ minWidth: 275 }}>
                        <CardContent>
                            <Typography sx={{ fontSize: 14 }} color="text.secondary" gutterBottom>
                            Story
                            </Typography>
                            <Typography variant="h5" component="div">
                            The Mythic Lizard
                            </Typography>
                            <Typography sx={{ mb: 1.5 }} color="text.secondary">
                            by Andrew Dillard
                            </Typography>
                            <Typography variant="body2">
                            Fantasy
                            </Typography>
                        </CardContent>
                        <CardActions>
                            <Button size="small">Read</Button>
                        </CardActions>
                    </Card>                    
                </Grid> 
                )}
            </Grid>
        </Box>
    );
};
export default Welcome;