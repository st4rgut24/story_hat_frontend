import * as React from 'react';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemText from '@mui/material/ListItemText';
import ListItemAvatar from '@mui/material/ListItemAvatar';
import Checkbox from '@mui/material/Checkbox';
import Avatar from '@mui/material/Avatar';
import { Grid } from '@mui/material';
import ListSubheader from '@mui/material/ListSubheader';

export default function ContributionNav(props: any) {
  const [selectedIndex, setSelectedIndex] = React.useState(0);

  const handleListItemClick = (
    event: React.MouseEvent<HTMLDivElement, MouseEvent>,
    index: number,
  ) => {
    props.setNext(index);
    setSelectedIndex(index);
  };

  return (
    <Grid container spacing={1}>
      <Grid item xs={12}>
        <List dense sx={{ width: '100%', maxWidth: 500, maxHeight: 360, bgcolor: 'background.paper', overflow: 'auto'}}>
        <ListSubheader>{`Previous Contributor`}</ListSubheader>
          {[0, 1, 2, 3, 4, 5, 6, 7, 8].map((value) => {
            const labelId = `checkbox-list-secondary-label-${value}`;
            return value == 1 ? <ListSubheader>{`Next Contributors`}</ListSubheader>:(
              <ListItem
                key={value}
                disablePadding
              >
                <ListItemButton
                  selected={value === selectedIndex}
                  onClick={(event) => handleListItemClick(event, value)}
                >
                  <ListItemAvatar>
                    <Avatar
                      alt={`Avatar n°${value + 1}`}
                      src={`/static/images/avatar/${value + 1}.jpg`}
                    />
                  </ListItemAvatar>
                  <ListItemText id={labelId} primary={`Line item ${value + 1}`} />
                </ListItemButton>
              </ListItem>
            );
          })}
        </List>   
      </Grid> 
    </Grid>
  );
}