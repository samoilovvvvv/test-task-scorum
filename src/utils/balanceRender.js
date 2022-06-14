export const balanceRender = (balance) => {
  const balanceInArr = balance.toString().split('');
  let length = balanceInArr.length - 1;
  let counter = 0;

  for (length; length > 0; length -= 1) {
    counter += 1;
    
    if (counter === 3) {
      balanceInArr.splice(length, 0, ',');
      counter = 0;
    }
  }
  
  return balanceInArr.join('');
};