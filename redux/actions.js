import * as t from './actionTypes';
import {Alert} from 'react-native';

const setLoginState = loginData => {
  return {
    type: t.SET_LOGIN_STATE,
    payload: loginData,
  };
};

export const login = loginInput => {
  const {username, password} = loginInput;
  return dispatch => {
    // don't forget to use dispatch here!
    return fetch('https://jsonplaceholder.typicode.com/users', {
      method: 'POST',
      body: JSON.stringify({
        username,
        password,
      }),
    })
      .then(response => response.text())
      .then(json => {
        console.log('js---------------', json);

        dispatch(setLoginState({...json, userId: username})); // our action is called here
        // Alert.alert('Login success');

        // if (json.msg === 'success') {
        //   // response success checking logic could differ
        //   dispatch(setLoginState({...json, userId: username})); // our action is called here
        // } else {
        //   Alert.alert('Login Failed', 'Username or Password is incorrect');
        // }
      })
      .catch(err => {
        console.log('js', err);

        Alert.alert('Login Failed', 'Some error occured, please retry');
        console.log(err);
      });
  };
};
