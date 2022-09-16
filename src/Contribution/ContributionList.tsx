import * as React from 'react';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemText from '@mui/material/ListItemText';
import ListItemAvatar from '@mui/material/ListItemAvatar';
import Avatar from '@mui/material/Avatar';
import ListSubheader from '@mui/material/ListSubheader';

import { useState, useEffect } from 'react';
import Web3Global from '../Web3Global';
import { SharedStructs } from '../typechain-types/LibraryStoryline';
import { Typography } from '@mui/material';
import ContractGlobal from '../ContractGlobal';
import { StorylineMap } from '../ContractGlobal';

const EMPTY_CID = "0x";

// TODO: pass in the contribution struct
export default function ContributionList(props: any) {
  const [linkedCids, setLinkedCids] = useState<any[]>([]); // array of strings

  const [prevContribHeaderIdx, setPrevContribHeaderIdx] = useState(-1);
  const [nextContribHeaderIdx, setNextContribHeaderIdx] = useState(-1);
  const [prevContribStruct, setPrevContribStruct] = useState<SharedStructs.ContributionStructOutput | undefined>();

  useEffect(() => {
  }, [])

  useEffect(() => {
    if (props.contribution && props.storyline.length > 0) {
      const prevContribCID = props.contribution.prevCID;
      if (prevContribCID){
        props.setPrev(prevContribCID); // cid of prev contribution here
      }
      setPrevContribStruct(getContribFromCid(prevContribCID));
      const prevContribArr = prevContribCID === EMPTY_CID ? [] : [prevContribCID]; // undefined necessary for mapping 

      const allCidArr = prevContribArr.concat(props.contribution.nextCIDs);
      const linkedCidArr = allCidArr.map((cidHex) => Web3Global.convertBytesToCid(cidHex)); 

      setContribHeaderIdx(props.contribution.prevCID, linkedCidArr);
      setLinkedCids(linkedCidArr);
    }
  }, [props.contribution, props.storyline])

  const getContribFromCid = (cid: string): SharedStructs.ContributionStructOutput | undefined => {
    const contribs = props.storyline as SharedStructs.ContributionStructOutput[];
    return contribs.find((contrib) => cid === contrib.cid);
  }

  const setContribHeaderIdx = (prevContribCID: string, linkedCidArr: string[]) =>  {
    // if not a newly created story and there are contributions
    if (linkedCidArr.length > 0) {
      if (prevContribCID === EMPTY_CID){ // root cid (no prev cid)
        setPrevContribHeaderIdx(-1);
        setNextContribHeaderIdx(0);
        linkedCidArr.splice(0, 0, "");
      }
      else if (linkedCidArr.length === 1) { // one node deep (has prev cid but no next cids)
        setPrevContribHeaderIdx(0);
        setNextContribHeaderIdx(-1);
        linkedCidArr.splice(0, 0, "");

      }
      else { // has prev and next nodes
        setPrevContribHeaderIdx(0);
        setNextContribHeaderIdx(2);
        linkedCidArr.splice(0, 0, "");
        linkedCidArr.splice(2, 0, "");
      }  
    }  
  }

  const handleListItemClick = (
    event: React.MouseEvent<HTMLDivElement, MouseEvent>,
    cid: string,
  ) => {
    props.setPrev(-1);
    props.setNext(-1);

    props.setCID(cid);
  };

  return (
    <List dense sx={{ width: '100%', maxWidth: 500, maxHeight: 360, bgcolor: 'background.paper', overflow: 'auto'}}>
        {linkedCids.map((cid, index) => {
          const labelId = `checkbox-list-secondary-label-${cid}`;
          const prevContribIdx = prevContribHeaderIdx + 1;
          if (prevContribIdx === 0){
          }
          return index === prevContribHeaderIdx ? <ListSubheader>{`Previous Contribution`}</ListSubheader> : 
            index === nextContribHeaderIdx ? <ListSubheader>{`Next Contributions`}</ListSubheader>:
            index !== prevContribIdx ? 
            (
              <ListItem
                  key={cid}
                  disablePadding
              >
              <ListItemButton
                  onClick={(event) => handleListItemClick(event, cid)}
              >
                  <ListItemText id={labelId} primary={cid} />               
              </ListItemButton>
              </ListItem>
          ) : 
            (
              <ListItem
                  key={cid}
                  disablePadding
              >
              <ListItemButton
                  onClick={(event) => handleListItemClick(event, cid)}
              >
                  <ListItemAvatar>
                  <Avatar
                      alt={`Avatar n°${cid}`}
                      src={`/quill.png`}
                  />
                  </ListItemAvatar>
                <ListItemText
                  primary={`Author: ${prevContribStruct?.authorAddr}`}
                  secondary={
                    <React.Fragment>
                      <Typography
                        sx={{ display: 'inline' }}
                        component="span"
                        variant="body2"
                        color="text.primary"
                      >
                        Status: {StorylineMap[prevContribStruct?.state ?? 0]}
                      </Typography>
                      <br/>
                      <Typography
                        sx={{ display: 'inline' }}
                        component="span"
                        variant="body2"
                        color="text.primary"
                        overflow={'hidden'}
                      >
                        {cid}
                      </Typography>                      
                    </React.Fragment>
                  }
                />                  
              </ListItemButton>
              </ListItem>
          );
        })}
    </List>   
  );
}