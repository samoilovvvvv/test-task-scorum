import { createSlice } from '@reduxjs/toolkit';
import { getCards, shuffleCards } from '../asyncActions/cardAsyncActions';
import { GAME_RESULTS } from '../../constants/gameResults';

const initialState = {
  balance: 10000,
  rate: 1000,
  firstGame: true,
  gameInProgress: false,
  gameResult: null,
  chosenCardIndex: null,
  cards: [],
  deckId: '',
  isShuffling: false,
  isCardLoading: false,
  shufflingError: false,
  cardLoadingError: false
};

export const gameSlice = createSlice({
  name: 'game',
  initialState,
  reducers: {
    startGame: (state) => {
      state.firstGame = false;
      state.gameInProgress = true;
      state.shufflingError = false;
      state.cardLoadingError = false;
      state.gameResult = null;
      state.cards = [];
    },
    chooseCardIndex: (state, action) => {
      state.chosenCardIndex = action.payload;
    },
    placeBet: (state) => {
      state.balance -= state.rate;
    },
    setGameResult: (state, action) => {
      state.gameResult = action.payload;
      state.gameInProgress = false;
      
      if (action.payload === GAME_RESULTS.win) state.balance += state.rate * 2;
      if (action.payload === GAME_RESULTS.standoff) state.balance += state.rate;
    },
    endGame: (state) => initialState
  },
  extraReducers: {
    [shuffleCards.fulfilled.type]: (state, action) => {
      state.isShuffling = false;
      state.shufflingError = false;
      state.deckId = action.payload['deck_id'];
    },
    [shuffleCards.pending.type]: (state) => {
      state.isShuffling = true;
    },
    [shuffleCards.rejected.type]: (state) => {
      state.isShuffling = false;
      state.shufflingError = true;
      state.gameInProgress = false;
      state.firstGame = true;
    },
    [getCards.fulfilled.type]: (state, action) => {
      state.isCardLoading = false;
      state.cardLoadingError = false;
      state.cards = action.payload.cards;
    },
    [getCards.pending.type]: (state) => {
      state.isCardLoading = true;
    },
    [getCards.rejected.type]: (state) => {
      state.isCardLoading = false;
      state.cardLoadingError = true;
      state.gameInProgress = false;
      state.firstGame = true;
    }
  }
});