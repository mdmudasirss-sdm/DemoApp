import * as React from 'react';
import {Text, View} from 'react-native';
import {NavigationContainer} from '@react-navigation/native';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import {Provider} from 'react-redux';
import {store,persistor} from './redux/store';
import {PersistGate} from 'redux-persist/integration/react';
import Login from './Screen/LoginScreen';
import RegisterScreen from './Screen/RegisterScreen';
import EmployeeScreen from './Screen/EmployeeScreen';

const Stack = createNativeStackNavigator();

function HomeScreen() {
  return (
    <View style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
      <Text>Home!</Text>
    </View>
  );
}

function TabNavigator() {
  return (
    <Tab.Navigator>
      <Tab.Screen
        name="Profile"
        
        component={HomeScreen}
        options={{
          headerShown: false,
        }}
      />
      <Tab.Screen
        options={{
          headerShown: false,
        }}
        name="EmplyeeList"
        component={EmployeeScreen}
      />
    </Tab.Navigator>
  );
}

const Tab = createBottomTabNavigator();
export default function App() {
  return (
    <Provider store={store}>
      <PersistGate loading={null} persistor={persistor}>
        <NavigationContainer>
          <Stack.Navigator initialRouteName="Login">
            <Stack.Screen name="Login" component={Login} />
            <Stack.Screen name="Register" component={RegisterScreen} />
            <Stack.Screen name="Home" component={TabNavigator} />
          </Stack.Navigator>
        </NavigationContainer>
      </PersistGate>
    </Provider>
  );
}
