import { Grid, ToggleButton, ToggleButtonGroup } from '@mui/material';
import { useState } from 'react';
import ContributionList from './ContributionList';
import AccountTreeIcon from '@mui/icons-material/AccountTree';
import FormatListBulletedIcon from '@mui/icons-material/FormatListBulleted';
import ContributionTree from './ContributionTree';

export default function ContributionNav(props: any) {
  const [listView, setListView] = useState<boolean>(true);

  const handleToggle = (
    event: React.MouseEvent<HTMLElement>,
    isListView: boolean,
  ) => {
    props.setPrev(-1);
    props.setNext(-1);
    setListView(isListView);
  };

  return (
    <Grid container spacing={1}>
      <Grid item xs={12}>
        {listView && <ContributionList setNext={props.setNext} setPrev={props.setPrev}/> }
        {!listView && <ContributionTree setNext={props.setNext} setPrev={props.setPrev}/> }        
      </Grid>
      <Grid item xs={12} container justifyContent="flex-end">
        <ToggleButtonGroup
        value={listView}
        exclusive
        onChange={handleToggle}
        aria-label="view toggle"
      >
        <ToggleButton value={true} aria-label="listOn">
          <FormatListBulletedIcon />
        </ToggleButton>
        <ToggleButton value={false} aria-label="treeOn">
          <AccountTreeIcon />
        </ToggleButton>
      </ToggleButtonGroup>
      </Grid>
    </Grid>
  );
}