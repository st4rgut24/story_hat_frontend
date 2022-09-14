import TreeView from '@mui/lab/TreeView';
import TreeItem from '@mui/lab/TreeItem';

import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import ChevronRightIcon from '@mui/icons-material/ChevronRight';

import { SharedStructs } from '../typechain-types/StoryShare.sol/Story';
import { useEffect, useState } from 'react';
import Web3Global from '../Web3Global';
import { isArray } from 'util';

interface RenderTree {
  id: string;
  name: string;
  children?: readonly RenderTree[];
}

export default function ContributionTree(props: any) {

  const [rootNode, setRootNode] = useState<RenderTree>()
  const [nodeIds, setNodeIds] = useState<string[]>([])
  const [selection, setSelection] = useState<string>("");

  useEffect(() => {
    if (props.storyline){
      const rootNode = createRenderTree(props.storyline);
      setRootNode(rootNode);
    }
  }, [props.storyline])

  function handleNodeSelect(event: any, nodeIds: Array<string> | string){
    const firstNodeId = isArray(nodeIds) ? nodeIds[0] : nodeIds;
    console.log("first node id", firstNodeId);
    const selectedCID = Web3Global.convertBytesToCid(firstNodeId);
    console.log('set cid to selection', selectedCID);
    props.setCID(selectedCID);
}

  // from list of contributions in a storyline create the tree representation fo the story
  const createRenderTree = (storyline: SharedStructs.ContributionStructOutput[]): RenderTree => {
    let TreeNodeArr: RenderTree[] = [];

    for (let i=0;i<storyline.length;i++){
      const contribution = storyline[i];
      const node: RenderTree = {
        id: contribution.cid,
        name: contribution.authorAddr,
        children: []
      };
      // if last node reached, then iterate over all of its nextCIDs, which dont have info like 'author'
      if (i === storyline.length - 1){
        const finalContrib = storyline[i];
        let nextNodes: RenderTree[] = [];
        for (let j=0;j<finalContrib.nextCIDs.length;j++){
          nextNodes.push({
            name: finalContrib.nextCIDs[j],
            id: finalContrib.nextCIDs[j],
          })
        }
        setSelection(node.id); // set the current cid
        node.children = nextNodes;
      }
      // assign a node as the child of previous node
      if (TreeNodeArr.length > 0){
        const prevNode: RenderTree = TreeNodeArr[i-1];
        prevNode.children = [node];
      }
      TreeNodeArr.push(node);
    }
    const nodeIdArr = TreeNodeArr.map((treeNode) => treeNode.id);
    setNodeIds(nodeIdArr);
    return TreeNodeArr?.[0];
  }

  const renderTree = (nodes: RenderTree) => (
    <TreeItem key={nodes.id} nodeId={nodes.id} label={nodes.name}>
      {Array.isArray(nodes.children)
        ? nodes.children.map((node) => renderTree(node))
        : null}
    </TreeItem>
  );

  return (
    <TreeView
      aria-label="rich object"
      defaultCollapseIcon={<ExpandMoreIcon />}
      expanded={nodeIds}
      defaultExpandIcon={<ChevronRightIcon />}
      onNodeSelect={handleNodeSelect}
      selected={selection}
      sx={{ height: 110, flexGrow: 1, maxWidth: 400, overflowY: 'auto' }}
    >
      {rootNode ? renderTree(rootNode): undefined}
    </TreeView>
  );
}