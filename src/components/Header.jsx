import React from 'react';

import { Button, Grid, Typography } from '@mui/material';
import { makeStyles } from '@mui/styles';

import { useDispatch } from 'react-redux';
import { authSlice } from '../store/reducers/authReducer';

const useStyles = makeStyles(() => ({
  container: {
    height: 50,
    
    backgroundColor: '#1a2435'
  },
  title: {
    padding: 5,
    
    borderRadius: 5,
    
    color: '#ffffff',
    backgroundColor: '#091123',
    
    '&.MuiGrid-root': {
      marginTop: 8,
      marginLeft: 30
    }
  },
  signOutContainer: {
    '&.MuiGrid-root': {
      marginTop: 6,
      marginRight: 35
    }
  },
  signOutButton: {
    '&.MuiButton-root': {
      textTransform: 'none',
      color: '#ffffff'
    }
  }
}));

const Header = () => {
  const classes = useStyles();
  
  const { signOut } = authSlice.actions;
  const dispatch = useDispatch();
  
  const sighOut = () => {
    localStorage.setItem('isAuth', 'false');
    
    dispatch(signOut());
  };
  
  return (
    <header className={classes.container}>
      <Grid
        container
        justifyContent={'space-between'}
      >
        <Grid
          item
          className={classes.title}
        >
          <Typography>Bridge</Typography>
        </Grid>
        <Grid
          item
          className={classes.signOutContainer}
        >
          <Button className={classes.signOutButton} onClick={sighOut}>SignOut</Button>
        </Grid>
      </Grid>
    </header>
  );
};

export default Header;