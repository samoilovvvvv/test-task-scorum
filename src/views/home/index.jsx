import React from 'react';

import { Typography, Grid } from '@mui/material';
import { makeStyles } from '@mui/styles';

import { useSelector } from 'react-redux';

import Balance from '../../components/Balance';
import Board from '../../components/Board';

const useStyles = makeStyles(() => ({
  gridContainer: {
    '&.MuiGrid-root': {
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      width: '100%'
    }
  },
  title: {
    '&.MuiTypography-root': {
      fontWeight: 600
    }
  },
  description: {
    '&.MuiTypography-root': {
      marginTop: 10,
      marginBottom: 100,
      
      color: '#9297a1'
    }
  }
}));

const Home = () => {
  const classes = useStyles();
  
  const { gameResult, balance } = useSelector((state) => state.gameReducer);
  
  return (
    <Grid className={classes.gridContainer}>
      <Balance balance={balance} />
      <Grid
        item
        className={classes.gridContainer}
      >
        {
          balance
            ? (
              <>
                <Typography variant={'h4'} className={classes.title}>{gameResult || 'Кто выиграет?'}</Typography>
                <Typography className={classes.description}>{gameResult ? '' : 'Сыграй в игру и испытай удачу'}</Typography>
                <Board />
              </>
            )
            : <Typography variant={'h4'} className={classes.title}>У вас закончился баланс :(</Typography>
        }
      </Grid>
    </Grid>
  );
};

export default Home;