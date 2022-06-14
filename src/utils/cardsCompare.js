import { CARDS } from '../constants/cards';

export const cardsCompare = (key1, key2) => {
  if (CARDS[key1.value] > CARDS[key2.value]) return 0;
  if (CARDS[key1.value] < CARDS[key2.value]) return 1;
  
  return 2;
};