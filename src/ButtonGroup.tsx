import * as React from 'react';
import Button from '@mui/material/Button';
import ButtonGroup from '@mui/material/ButtonGroup';
import ArrowDropDownIcon from '@mui/icons-material/ArrowDropDown';
import ClickAwayListener from '@mui/material/ClickAwayListener';
import Grow from '@mui/material/Grow';
import Paper from '@mui/material/Paper';
import Popper from '@mui/material/Popper';
import MenuItem from '@mui/material/MenuItem';
import MenuList from '@mui/material/MenuList';

import { useWeb3React } from '@web3-react/core'

import { WalletLinkConnector } from "@web3-react/walletlink-connector";
import { WalletConnectConnector } from "@web3-react/walletconnect-connector";
import { InjectedConnector } from "@web3-react/injected-connector";


const options = ['Metamask', 'Wallet Connect', 'Coinbase Wallet'];

export default function SplitButton() {
    const defaultSetWallet = "Connect Wallet";
    const [wallet, setWallet] = React.useState(defaultSetWallet);

  const [open, setOpen] = React.useState(false);
  const anchorRef = React.useRef<HTMLDivElement>(null);

  const { activate, deactivate } = useWeb3React();
  const { active, chainId, account } = useWeb3React();

  const CoinbaseWallet = new WalletLinkConnector({
    url: `https://goerli.infura.io/v3/14c911050f2b4ae792218579902f1a6c`,
    appName: "storyhat",
    supportedChainIds: [5],
  });

  const WalletConnect = new WalletConnectConnector({
    infuraId: `https://goerli.infura.io/v3/14c911050f2b4ae792218579902f1a6c`,
    bridge: "https://bridge.walletconnect.org",
    qrcode: true,
    });  
    
    const Injected = new InjectedConnector({
        supportedChainIds: [5] // 1 is mainnet, 5 is goerli, 1337 is localhost:8545
    });

  const handleMenuItemClick = (
    event: React.MouseEvent<HTMLLIElement, MouseEvent>,
    index: number,
  ) => {
    setOpen(false);
    const selectedOption = options[index];
    if (selectedOption === "Metamask"){
        activate(CoinbaseWallet)
    }
    else if (selectedOption === "Wallet Connect") {
        activate(WalletConnect)
    }
    else if (selectedOption === "Coinbase Wallet"){
        activate(Injected);
    }
    setWallet(selectedOption);
  };

  const handleToggle = () => {
    setOpen((prevOpen) => !prevOpen);
  };

  const handleClose = (event: Event) => {
    if (
      anchorRef.current &&
      anchorRef.current.contains(event.target as HTMLElement)
    ) {
      return;
    }

    setOpen(false);
  };

  return (
    <React.Fragment>
      <ButtonGroup variant="contained" ref={anchorRef} aria-label="split button">
        <Button>{wallet}</Button>
        <Button
          size="small"
          aria-controls={open ? 'split-button-menu' : undefined}
          aria-expanded={open ? 'true' : undefined}
          aria-label="select merge strategy"
          aria-haspopup="menu"
          onClick={handleToggle}
        >
          <ArrowDropDownIcon />
        </Button>
      </ButtonGroup>
      <Popper
        sx={{
          zIndex: 1,
        }}
        open={open}
        anchorEl={anchorRef.current}
        role={undefined}
        transition
        disablePortal
      >
        {({ TransitionProps, placement }) => (
          <Grow
            {...TransitionProps}
            style={{
              transformOrigin:
                placement === 'bottom' ? 'center top' : 'center bottom',
            }}
          >
            <Paper>
              <ClickAwayListener onClickAway={handleClose}>
                <MenuList id="split-button-menu" autoFocusItem>
                  {options.map((option, index) => (
                    <MenuItem
                      key={option}
                      onClick={(event) => handleMenuItemClick(event, index)}
                    >
                      {option}
                    </MenuItem>
                  ))}
                </MenuList>
              </ClickAwayListener>
            </Paper>
          </Grow>
        )}
      </Popper>
    </React.Fragment>
  );
}