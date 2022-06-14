import React from 'react';

import { Grid, Typography } from '@mui/material';
import { makeStyles } from '@mui/styles';

import { balanceRender } from '../utils/balanceRender';

const useStyles = makeStyles(() => ({
  balanceContainer: {
    padding: 15,
    
    boxShadow: '0px 1px 3px rgba(0, 0, 0, .5)',
    backgroundColor: '#ffffff',
    
    '&.MuiGrid-root': {
      marginBottom: 30
    }
  },
  balance: {
    '&.MuiTypography-root': {
      fontSize: 20
    }
  }
}));

const Balance = ({ balance }) => {
  const classes = useStyles();
  
  return (
    <Grid
      container
      justifyContent={'center'}
      item
      className={classes.balanceContainer}
    >
      <Typography className={classes.balance}>Balance: {balanceRender(balance)}</Typography>
    </Grid>
  );
};

export default Balance;