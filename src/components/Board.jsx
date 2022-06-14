import React, { useEffect, useMemo } from 'react';

import { Grid } from '@mui/material';
import { makeStyles } from '@mui/styles';

import { useDispatch, useSelector } from 'react-redux';
import { gameSlice } from '../store/reducers/gameReducer';
import { getCards, shuffleCards } from '../store/asyncActions/cardAsyncActions';

import { cardsCompare } from '../utils/cardsCompare';

import Card from './Card';
import StyledButton from './StyledButton';
import { GAME_RESULTS } from '../constants/gameResults';

const useStyles = makeStyles(() => ({
  board: {
    '&.MuiGrid-root': {
      width: '60%'
    }
  }
}));

const Board = () => {
  const classes = useStyles();
  
  const dispatch = useDispatch();
  
  const {
    firstGame,
    gameInProgress,
    isShuffling,
    isCardLoading,
    deckId,
    shufflingError,
    cardLoadingError,
    cards,
    chosenCardIndex
  } = useSelector((state) => state.gameReducer);
  
  const {
    startGame,
    chooseCardIndex,
    placeBet,
    setGameResult,
    endGame
  } = gameSlice.actions;
  
  useEffect(() => () => {
    dispatch(endGame());
  }, [dispatch, endGame]);
  
  useEffect(() => {
    if (!isShuffling && deckId) {
      dispatch(getCards(deckId));
    }
  }, [deckId, dispatch, isShuffling, placeBet]);
  
  useEffect(() => {
    if (!isCardLoading && cards.length) {
      dispatch(placeBet());
    }
  }, [cards, dispatch, isCardLoading, placeBet]);
  
  const result = useMemo(() => {
    if (!isCardLoading && cards.length) {
      return cardsCompare(...cards);
    }
    
    return null;
  }, [cards, isCardLoading]);
  
  useEffect(() => {
    if (result !== null) {
      const gameResult = result === 2
        ? GAME_RESULTS.standoff
        : result === chosenCardIndex
          ? GAME_RESULTS.win
          : GAME_RESULTS.lose;
      
      dispatch(setGameResult(gameResult));
    }
  }, [chosenCardIndex, dispatch, result, setGameResult]);
  
  const onChooseCardHandler = (cardIndex) => {
    dispatch(chooseCardIndex(cardIndex));
    dispatch(shuffleCards(deckId && deckId));
  };
  
  return (
    <Grid
      container
      justifyContent={'space-between'}
      alignItems={'center'}
      className={classes.board}
    >
      <Card
        cardIndex={0}
        cards={cards}
        isShuffling={isShuffling}
        isCardLoading={isCardLoading}
        onClick={() => onChooseCardHandler(0)}
      />
      {
        !gameInProgress && (
          <StyledButton onClick={() => dispatch(startGame())}>
            {
              firstGame ? 'Играть' : 'Сыграть еще'
            }
          </StyledButton>
        )
      }
      {
        gameInProgress && !shufflingError && !cardLoadingError && (
          <>
            <StyledButton
              onClick={() => onChooseCardHandler(0)}
              disabled={isShuffling || isCardLoading}
            >
              Слева
            </StyledButton>
            <StyledButton
              onClick={() => onChooseCardHandler(1)}
              disabled={isShuffling || isCardLoading}
            >
              Справа
            </StyledButton>
          </>
        )
      }
      <Card
        cardIndex={1}
        cards={cards}
        isShuffling={isShuffling}
        isCardLoading={isCardLoading}
        onClick={() => onChooseCardHandler(1)}
      />
    </Grid>
  );
};

export default Board;