import React from 'react';

import { Grid } from '@mui/material';
import { makeStyles } from '@mui/styles';

import cardCover from '../assets/images/card-cover.png';

const useStyles = makeStyles(() => ({
  cardContainer: {
    '&.MuiGrid-root': {
      width: 250,
      height: 400
    }
  },
  card: {
    width: '100%',
    height: '100%',
    
    cursor: 'pointer'
  }
}));

const Card = ({
  cardIndex,
  cards = [],
  isShuffling = false,
  isCardLoading = false,
  onClick = () => {}
}) => {
  const classes = useStyles();
  
  const getCardImg = () => {
    if (!cards.length) return cardCover;
    
    return cards[cardIndex].image;
  };
  
  const onClickCardHandler = () => {
    if (!isShuffling && !isCardLoading) onClick();
  };
  
  return (
    <Grid
      className={classes.cardContainer}
      item
      onClick={onClickCardHandler}
    >
      <img src={getCardImg()} alt={'card'} className={classes.card} />
    </Grid>
  );
};

export default Card;