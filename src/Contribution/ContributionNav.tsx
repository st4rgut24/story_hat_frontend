import { Grid } from '@mui/material';
import ContributionTree from './ContributionTree';
import ContributionList from './ContributionList';

export default function ContributionNav(props: any) {
  return (
    <Grid container spacing={1}>
      <Grid item xs={12}>
        {props.listView && <ContributionList contribution={props.contribution} setNext={props.setNext} setPrev={props.setPrev}/> }
        {!props.listView && <ContributionTree contribution={props.contribution} setNext={props.setNext} setPrev={props.setPrev}/> }        
      </Grid>
    </Grid>
  );
}