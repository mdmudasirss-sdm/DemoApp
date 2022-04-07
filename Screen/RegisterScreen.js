import React, {useState} from 'react';
import {StyleSheet, Text, KeyboardAvoidingView} from 'react-native';

import {Input, Button, ErrorText} from './Components/Form';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    justifyContent: 'center',
    paddingHorizontal: 40,
  },
  headerText: {
    color: '#353031',
    fontWeight: 'bold',
    fontSize: 34,
    marginBottom: 10,
  },
});

const useLoginFormState = ({navigation}) => {
  const [username, setUsername] = useState('');
  const [userEmail, setUserEmail] = useState('');

  const [password, setPassword] = useState('');
  const [submit, setSubmit] = useState(false);

  let isUsernameValid = false;
  let isPasswordValid = false;
  let isEmailValid = false;

  if (username) {
    isUsernameValid = true;
  }

  if (password) {
    isPasswordValid = true;
  }

  return {
    username: {
      value: username,
      set: setUsername,
      valid: isUsernameValid,
    },
    userEmail: {
      value: userEmail,
      set: setUserEmail,
    },
    password: {
      value: password,
      set: setPassword,
      valid: isPasswordValid,
    },
    submit: {
      value: submit,
      set: () => {
        setSubmit(true);

        if (isUsernameValid && isPasswordValid) {
          fetch('https://jsonplaceholder.typicode.com/users', {
            method: 'POST',
            body: JSON.stringify({
              username,
              password,
            }),
          })
            .then(response => response.json())
            .then(() => {
              console.log('hi');
              navigation.push('login');
            })
            .catch(error => {
              console.log('error', error);
            });
        }
      },
    },
  };
};

export default ({navigation}) => {
  const {username, userEmail, password, submit} = useLoginFormState({
    navigation,
  });

  let usernameErrorMsg;
  let passwordErrorMsg;
  let emailErrorMsg;

  if (submit.value && !username.valid) {
    usernameErrorMsg = 'Enter user name.';
  }

  if (submit.value && !password.valid) {
    passwordErrorMsg = 'Enter password.';
  }

  return (
    <KeyboardAvoidingView style={styles.container} behavior="position">
      <Text style={styles.headerText}>Register</Text>
      <Input
        label="Username"
        placeholder="Enter Name"
        onChangeText={username.set}
        error={usernameErrorMsg}
        testID="Register.usernameInput"
      />
      <Input
        label="Email"
        placeholder="Enter Email"
        onChangeText={userEmail.set}
        error={emailErrorMsg}
        testID="Register.EmailInput"
      />
      <Input
        label="Password"
        placeholder="Enter Password"
        secureTextEntry
        onChangeText={password.set}
        error={passwordErrorMsg}
        testID="Register.PasswordInput"
      />
      <ErrorText messages={[usernameErrorMsg, passwordErrorMsg]} />
      <Button testID="Register.Button" text="Register" onPress={submit.set} />
    </KeyboardAvoidingView>
  );
};
