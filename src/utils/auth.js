import { USERNAME, PASSWORD } from '../constants/authData';

export const auth = (values) => new Promise((resolve, reject) => {
  setTimeout(() => {
    if (values.username === USERNAME && values.password === PASSWORD) {
      resolve();
    } else {
      reject(new Error('The email or password is incorrect'));
    }
  }, 1000);
});