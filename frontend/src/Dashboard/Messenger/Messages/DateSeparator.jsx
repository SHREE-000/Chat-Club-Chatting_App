import React from 'react'
import { styled } from '@mui/system';

const Seperator = styled('div')({
    width: '95%',
    backgroundColor: '#b9bbbe',
    height: '1px',
    position: 'relative',
    marginTop: '20px',
    marginBottom: '10px',
});

const DateLabel = styled('span')({
    backgroundColor: '#36393f',
    position: 'absolute',
    left: '45%',
    top: '-10px',
    color: '#b9bbb3',
    padding: '0 5px',
    fontSize: '14px',
});

const DateSeparator = ({date}) => {
  return (
    <Seperator>
        <DateLabel>
            {date}
        </DateLabel>
    </Seperator>
  )
}

export default DateSeparator;