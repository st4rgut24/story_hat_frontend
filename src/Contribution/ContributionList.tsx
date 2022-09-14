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

const EMPTY_CID = "0x";

// TODO: pass in the contribution struct
export default function ContributionList(props: any) {
  const [linkedCids, setLinkedCids] = useState<any[]>([]); // array of strings

  const [prevContribHeaderIdx, setPrevContribHeaderIdx] = useState(-1);
  const [nextContribHeaderIdx, setNextContribHeaderIdx] = useState(-1);

  useEffect(() => {
  }, [])

  useEffect(() => {
    if (props.contribution) {
      const prevContribCID = props.contribution.prevCID;
      if (prevContribCID){
        props.setPrev(prevContribCID); // cid of prev contribution here
      }

      const prevContribArr = prevContribCID === EMPTY_CID ? [] : [prevContribCID]; // undefined necessary for mapping 

      const allCidArr = prevContribArr.concat(props.contribution.nextCIDs);
      const linkedCidArr = allCidArr.map((cidHex) => Web3Global.convertBytesToCid(cidHex)); 

      setContribHeaderIdx(props.contribution.prevCID, linkedCidArr);
      setLinkedCids(linkedCidArr);
    }
  }, [props.contribution])

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
          return index === prevContribHeaderIdx ? <ListSubheader>{`Previous Contribution`}</ListSubheader> : 
            index === nextContribHeaderIdx ? <ListSubheader>{`Next Contributions`}</ListSubheader>:(
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
                      src={`/static/images/avatar/${cid}.jpg`}
                  />
                  </ListItemAvatar>
                  <ListItemText id={labelId} primary={cid} />
              </ListItemButton>
              </ListItem>
          );
        })}
    </List>   
  );
}