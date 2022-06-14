import { createAsyncThunk } from '@reduxjs/toolkit';

import axios from 'axios';

export const shuffleCards = createAsyncThunk(
  'game/shuffle',
  async (deckId = '', thunkAPI) => {
    try {
      const url = deckId ? `https://deckofcardsapi.com/api/deck/${deckId}/shuffle/` : 'https://deckofcardsapi.com/api/deck/new/shuffle/?deck_count=1';
  
      const response = await axios.get(url);
      return response.data;
    } catch (error) {
      return thunkAPI.rejectWithValue('Error');
    }
  }
);

export const getCards = createAsyncThunk(
  'game/get',
  async (deckId, thunkAPI) => {
    try {
      const response = await axios.get(`https://deckofcardsapi.com/api/deck/${deckId}/draw/?count=2`);
      return response.data;
    } catch (error) {
      return thunkAPI.rejectWithValue('Error');
    }
  }
);