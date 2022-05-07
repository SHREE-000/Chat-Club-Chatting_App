import React from 'react';
import { styled } from '@mui/system';
import DropDownMenu from './DropDownMenu';
import ChooseOptionLabel from './ChooseOptionLabel'

const MainContainer = styled('div')({
    position: 'absolute',
    right: '0',
    top: '0',
    height: '48px',
    borderBottom: '1px solid black',
    backgroundColor: '#36393f',
    width: 'calc(100% - 296px)',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
    padding: '0 15px'
});

const AppBar = ({ onLogout }) => {
  return (
    <MainContainer>
      <ChooseOptionLabel />
      <DropDownMenu onLogout={onLogout} />
    </MainContainer>
  )
}

export default AppBar;