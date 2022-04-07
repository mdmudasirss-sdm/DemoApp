import React, {useState} from 'react';
import {StyleSheet, Text, KeyboardAvoidingView} from 'react-native';
import {useDispatch, useSelector} from 'react-redux';
import {login} from '../redux/actions';
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
  const [password, setPassword] = useState('');
  const [submit, setSubmit] = useState(false);
  const dispatch = useDispatch();
  const user = useSelector(state => state);
  // console.log('user', user);

  let isUsernameValid = false;
  let isPasswordValid = false;

  if (username === 'example') {
    isUsernameValid = true;
  }

  if (password === 'asdf') {
    isPasswordValid = true;
  }

  return {
    username: {
      value: username,
      set: setUsername,
      valid: isUsernameValid,
    },
    password: {
      value: password,
      set: setPassword,
      valid: isPasswordValid,
    },
    submit: {
      value: submit,
      set: async () => {
        setSubmit(true);

        if (isUsernameValid && isPasswordValid) {
          const result = await dispatch(
            login({username: username, password: password}),
          );
          navigation.push('Home');
        }
      },
    },
  };
};

export default ({navigation}) => {
  const {username, password, submit} = useLoginFormState({navigation});

  let usernameErrorMsg;
  let passwordErrorMsg;

  if (submit.value && !username.valid) {
    usernameErrorMsg = 'Invalid username.';
  }

  if (submit.value && !password.valid) {
    passwordErrorMsg = 'Invalid password.';
  }

  return (
    <KeyboardAvoidingView style={styles.container} behavior="position">
      <Text style={styles.headerText}>Login</Text>
      <Input
        label="Username"
        placeholder="example"
        onChangeText={username.set}
        error={usernameErrorMsg}
        testID="SignIn.usernameInput"
      />
      <Input
        label="Password"
        placeholder="***"
        secureTextEntry
        onChangeText={password.set}
        error={passwordErrorMsg}
        testID="SignIn.passwordInput"
      />
      <ErrorText messages={[usernameErrorMsg, passwordErrorMsg]} />
      <Button testID="SignIn.Button" text="Login" onPress={submit.set} />
      <Button
        text="Sign Up"
        onPress={() => {
          navigation.push('Register');
        }}
      />
    </KeyboardAvoidingView>
  );
};
