import React from "react";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import IconButton from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";
import Menu from "@mui/material/Menu";
import MenuIcon from "@mui/icons-material/Menu";
import Container from "@mui/material/Container";
import Avatar from "@mui/material/Avatar";
import Button from "@mui/material/Button";
import Tooltip from "@mui/material/Tooltip";
import MenuItem from "@mui/material/MenuItem";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { logout, reset } from "../features/auth/authSlice";


const NavBar = () => {

  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { user } = useSelector((state) => state.auth);

  const onLogout = () => {
    dispatch(logout());
    dispatch(reset());
  };

  const handleLogin = () => {
      navigate('/login')
  };

  const handleRegister = () => {
    navigate('/register')
}; 

const handleDahboard = () => {
        navigate('/dashboard')
}; 

  const [anchorElNav, setAnchorElNav] = React.useState(null);
  const [anchorElUser, setAnchorElUser] = React.useState(null);

  const handleOpenNavMenu = (event) => {
    setAnchorElNav(event.currentTarget);
  };
  const handleOpenUserMenu = (event) => {
    setAnchorElUser(event.currentTarget);
  };

  const handleCloseNavMenu = () => {
    setAnchorElNav(null);
  };

  const handleCloseUserMenu = () => {
    setAnchorElUser(null);
  };

  const handleAbout = () => {
      navigate('/service')
  }; 

  const handleContact = () => {
    navigate('/contact')
};

const hanleHome = () => {
  navigate('/home')
};

  return (
    <AppBar position="static">
      <Container maxWidth="md">
        <Toolbar disableGutters>
          <Typography
            variant="h6"
            noWrap
            component="div"
            fontWeight={700}
            color="#581b1b"
            sx={{ mr: 2, display: { xs: "none", md: "flex" } }}
            onClick={hanleHome}
            
          >
            ChatClub
          </Typography>

          <Box sx={{ flexGrow: 1, display: { xs: "flex", md: "none" } }}>
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
                vertical: "bottom",
                horizontal: "left",
              }}
              keepMounted
              transformOrigin={{
                vertical: "top",
                horizontal: "left",
              }}
              open={Boolean(anchorElNav)}
              onClose={handleCloseNavMenu}
              sx={{
                display: { xs: "block", md: "none" },
              }}
            >
              <MenuItem onClick={handleAbout}>
                <Typography textAlign="center">About</Typography>
              </MenuItem>
              <MenuItem onClick={handleContact}>
                <Typography textAlign="center">Contact</Typography>
              </MenuItem>
            </Menu>

            
          </Box>
          <Typography
            variant="h6"
            noWrap
            component="div"
            fontWeight={900}
            color="#321919"
            onClick={hanleHome}
            sx={{ flexGrow: 1, display: { xs: "flex", md: "none" } }}
          >
            ChatClub
          </Typography>
          <Box sx={{ flexGrow: 1, display: { xs: "none", md: "flex" } }}>

            <Button
              onClick={handleAbout}
              sx={{ my: 2, color: "white", display: "block" }}
            >
              About
            </Button>

            <Button
              onClick={handleContact}
              sx={{ my: 2, color: "white", display: "block" }}
            >
              Contact
            </Button>
          </Box>

          <Box sx={{ flexGrow: 0 }}>
            <Tooltip title="Open settings">
              <IconButton onClick={handleOpenUserMenu} sx={{ p: 0 }}>
              <Avatar />
              </IconButton>
            </Tooltip>
            <Menu
              sx={{ mt: "45px" }}
              id="menu-appbar"
              anchorEl={anchorElUser}
              anchorOrigin={{
                vertical: "top",
                horizontal: "right",
              }}
              keepMounted
              transformOrigin={{
                vertical: "top",
                horizontal: "right",
              }}
              open={Boolean(anchorElUser)}
              onClose={handleCloseUserMenu}
            >
              <MenuItem onClick={handleDahboard}>
                <Typography textAlign="center">Dashboard</Typography>
              </MenuItem>

              {user ? (
                <>
                  <MenuItem onClick={onLogout}>
                    <Typography textAlign="center">Logout</Typography>
                  </MenuItem>
                </>
              ) : (
                <>
                  <MenuItem onClick={handleLogin}>
                    <Typography textAlign="center">Login</Typography>
                  </MenuItem>

                  <MenuItem onClick={handleRegister}>
                    <Typography textAlign="center">Register</Typography>
                  </MenuItem>

                </>
              )}
            </Menu>
          </Box>

              {user ? (
                <>
                  <MenuItem onClick={onLogout}>
                    <Typography textAlign="center">Logout</Typography>
                  </MenuItem>
                </>
              ) : (
                <>
                  <MenuItem onClick={handleLogin}>
                    <Typography textAlign="center">Login</Typography>
                  </MenuItem>

                  
                </>
              )}

        </Toolbar>
      </Container>
    </AppBar>
  );
};
export default NavBar;
