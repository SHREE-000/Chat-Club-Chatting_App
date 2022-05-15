import React from "react";
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import { IconButton } from "@mui/material";
import  MoreVertIcon from '@mui/icons-material/MoreVert';
import { useSelector, useDispatch } from 'react-redux';
import { setAudioOnly } from '../../features/room/roomSlice';

export default function DropDownMenu({ onLogout }) {

  const { audioOnly } = useSelector( (state) => state.room)
  const dispatch = useDispatch()

  const [anchorEl, setAnchorEl] = React.useState(null);
  const open = Boolean(anchorEl);
  const handleMenuOpen = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleMenuClose = () => {
    setAnchorEl(null);
  };

  const handleAudioOnlyChange = () => {
    dispatch(setAudioOnly(!audioOnly))
    localStorage.setItem('audioOnly', JSON.stringify(audioOnly))
  }

  return ( 
    <div>

      <IconButton 
      onClick={handleMenuOpen}
      style={{color: 'white'}}
      >
          <MoreVertIcon />
      </IconButton>
      <Menu
        id="basic-menu"
        anchorEl={anchorEl}
        open={open}
        onClose={handleMenuClose}
        MenuListProps={{
          'aria-labelledby': 'basic-button',
        }}
      >
        <MenuItem onClick={handleMenuClose}>Back to home</MenuItem>
        <MenuItem onClick={onLogout}>Logout</MenuItem>
        <MenuItem onClick={handleAudioOnlyChange}>
          {audioOnly ? 'Audio Only Enabled' : 'Audio Only Disabled'}
        </MenuItem>
      </Menu>
    </div>
  );
}