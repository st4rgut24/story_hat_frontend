import { Grid, IconButton, ToggleButton, ToggleButtonGroup } from '@mui/material';
import Box from '@mui/material/Box';
import { useEffect, useState } from 'react';
import ArrowBackIosIcon from '@mui/icons-material/ArrowBackIos';
import ArrowForwardIosIcon from '@mui/icons-material/ArrowForwardIos';
import AccountTreeIcon from '@mui/icons-material/AccountTree';
import FormatListBulletedIcon from '@mui/icons-material/FormatListBulleted';

import ContributionInput from './ContributionInput';
import ContributionNav from './ContributionNav';
import ContractGlobal from '../ContractGlobal';
import Vote from '../Vote';

import { SharedStructs } from '../typechain-types/StoryShare.sol/Story';
import Web3Global from '../Web3Global';

const Contribution = (props: any) => {
    const [listView, setListView] = useState<boolean>(true);

    const [next, setNext] = useState(-1)
    const [prev, setPrev] = useState(-1)
    
    const [storyline, setStoryline] = useState<SharedStructs.ContributionStructOutput[]>([]);

    const [contribution, setContribution] = useState<SharedStructs.ContributionStructOutput>();

    useEffect(() => {
        if (ContractGlobal.storyShareContract && props.curCID.length > 0) {
            const cidBytes = Web3Global.convertCidToBytes(props.curCID);
            if (ContractGlobal.storyContract){
                ContractGlobal.getContribution(cidBytes).then((contrib) => {
                    console.log("great success set new contrib to cid", props.curCID);
                    setContribution(contrib);
                    const curBytesCID = Web3Global.convertCidToBytes(props.curCID);
                    console.log("getting storyline ...");
                    ContractGlobal.storyContract?.getStoryline(curBytesCID).then((storyline) => {
                        console.log("got storyline", storyline);
                        setStoryline(storyline);
                    });
                });
            }
        }
    }, [props.curCID]);

    const handleToggle = (
        event: React.MouseEvent<HTMLElement>,
        isListView: boolean,
      ) => {
        setPrev(-1);
        setNext(-1);
        setListView(isListView);
    };    

    return (
        <Box maxWidth={1000} margin='auto'>
            <Grid container spacing={1}>
                <Grid item xs={6}>
                    <h1>Contribute</h1>
                </Grid>
                <Grid item xs={6} container justifyContent="flex-end" marginTop="2%">
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
                <Grid item xs={6}>
                    <ContributionInput setCID={props.setCurCID} curCID={props.curCID} setIsLoading={props.setIsLoading} />
                </Grid>
                <Grid item xs={6}>
                    <ContributionNav setCID={props.setCurCID} contribution={contribution} storyline={storyline} setNext={setNext} setPrev={setPrev} listView={listView}/>
                </Grid>              
            </Grid>
            <Vote contribution={contribution} setContribution={setContribution} userAddr={props.userAddr} storyline={storyline} />
        </Box>
    );
};
export default Contribution;