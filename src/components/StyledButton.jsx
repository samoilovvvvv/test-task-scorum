import React from 'react';

import { styled } from '@mui/styles';
import { Button } from '@mui/material';

const NewButton = styled(Button)({
  '&.MuiButton-root': {
    height: 35,
    
    textTransform: 'none',
    color: '#ffffff',
    backgroundColor: '#4235cb',
    
    '&:hover': {
      backgroundColor: '#9b96e4'
    }
  }
});

const StyledButton = ({
  children,
  className,
  onClick = () => {}
}) => (
  <NewButton className={className} onClick={onClick}>{ children }</NewButton>
);

export default StyledButton;