import * as React from 'react';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import Menu from '@mui/material/Menu';
import MenuIcon from '@mui/icons-material/Menu';
import Container from '@mui/material/Container';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import Tooltip from '@mui/material/Tooltip';
import MenuItem from '@mui/material/MenuItem';
import ContractGlobal from './ContractGlobal';
import { useState, useEffect } from 'react';

const pages = ['Create', 'Contribute'];
const settings = ['Profile', 'Account', 'Dashboard', 'Logout'];

const ResponsiveAppBar = (props: any) => {
  
  const [anchorElNav, setAnchorElNav] = React.useState<null | HTMLElement>(null);
  const [anchorElUser, setAnchorElUser] = React.useState<null | HTMLElement>(null);

  const [connectedState, setConnectedState] = useState<boolean | undefined>(false)

  useEffect(() => {
      ContractGlobal.setConnectedState = setConnectedState;
  },[])

  const handleOpenNavMenu = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorElNav(event.currentTarget);
  };
  const handleOpenUserMenu = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorElUser(event.currentTarget);
  };

  const handleCloseNavMenu = () => {
    setAnchorElNav(null);
  };

  const handleCloseUserMenu = () => {
    setAnchorElUser(null);
  };

  const handleReturnToMainPage = () => {
    props.setCurCID("");
    props.setPage("Welcome");
    // reset it so we can choose the same story
  }

  const getTitleElement = () => {
    return (
      <Typography
        variant="h6"
        noWrap
        component="a"
        onClick={handleReturnToMainPage}
        sx={{
          fontFamily: 'monospace',
          fontWeight: 700,
          letterSpacing: '.3rem',
          color: 'inherit',
          textDecoration: 'none',       
        }}
      >
        STORY_HAT
      </Typography>      
    )
  }

  return (
    <>
      <AppBar position="static">
        <Container maxWidth="xl">
          <Toolbar disableGutters>

            <Box sx={{ flexGrow: 1, display: { xs: 'flex', md: 'none' } }}>
              <IconButton
                size="large"
                aria-label="account of current user"
                aria-controls="menu-appbar"
                aria-haspopup="true"
                onClick={handleOpenNavMenu}
                color="inherit"
              >
                <MenuIcon />
              </IconButton>
              <Menu
                id="menu-appbar"
                anchorEl={anchorElNav}
                anchorOrigin={{
                  vertical: 'bottom',
                  horizontal: 'left',
                }}
                keepMounted
                transformOrigin={{
                  vertical: 'top',
                  horizontal: 'left',
                }}
                open={Boolean(anchorElNav)}
                onClose={handleCloseNavMenu}
                sx={{
                  display: { xs: 'block', md: 'none' },
                }}
              >
                {pages.map((page) => (
                  <MenuItem key={page}>
                    <Typography textAlign="center">{page}</Typography>
                  </MenuItem>
                ))}
              </Menu>
              <IconButton
                size="large"
                color="inherit"
                sx={{
                  '&:hover': {
                    backgroundColor: 'transparent',
                  }
                }}                
              >
                {getTitleElement()}                
              </IconButton>              
            </Box>
            <Box sx={{ flexGrow: 1, display: { xs: 'none', md: 'flex' } }}>
              <IconButton
                size="large"
                color="inherit"
                sx={{
                  '&:hover': {
                    backgroundColor: 'transparent',
                  }
                }}
              >
                {getTitleElement()}
              </IconButton>
              {pages.map((page) => (
                <Button
                  key={page}
                  onClick={() => props.setPage(page)}
                  sx={{ my: 2, color: 'white', display: 'block' }}
                >
                  {page}
                </Button>
              ))}
            </Box>
            <Box sx={{ my: 2, color: 'white', display: 'flex'}}>
              <Button sx={{ color: 'white' }} variant='contained' color={connectedState ? 'success' : 'error'} disabled={connectedState} onClick={ContractGlobal.connectWallet}>
                  {"Metmask"}
                <Avatar sx={{ml: 2}} alt="Remy Sharp" src="/metamask.png" />
              </Button>
            </Box>
          </Toolbar>
        </Container>
      </AppBar>
    </>
  );
};

export default ResponsiveAppBar;