import React from 'react'
import { styled } from '@mui/system';

const AvtarPreview = styled('div')({
    height: '42px',
    width: '42px',
    backgroundColor: '#5365f2',
    borderRadius: '42px',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    fontSize: '20px',
    fontWeight: '700',
    marginLeft: '5px',
    color: 'white'
});

const Avatar = ({ username, large }) => {
  return (
    <AvtarPreview 
    style={large ? 
    {height: '80px', width: '80px'} : {} 
    }>
        {username.substring(0,2)}
    </AvtarPreview>
  )
}

export default Avatar;