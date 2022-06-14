import React from 'react';

import { useSelector } from 'react-redux';

import { Grid } from '@mui/material';
import { makeStyles } from '@mui/styles';

import Header from './Header';

const useStyles = makeStyles(() => ({
  container: {
    minHeight: '100vh',
    backgroundColor: '#f3f3f6'
  },
  mainContent: {
    display: 'flex',
    flexDirection: 'column',
    flexGrow: 1,
    width: '100%'
  }
}));

const Layout = ({ children }) => {
  const isAuth = useSelector((state) => state.authReducer.isAuth);
  
  const classes = useStyles();
  
  return (
    <Grid
      container
      direction={'column'}
      className={classes.container}
    >
      {
        isAuth && <Header />
      }
      <main className={classes.mainContent}>{ children }</main>
    </Grid>
  );
};

export default Layout;