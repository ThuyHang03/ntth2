import React from 'react';
import 'react-native-gesture-handler';
import {NavigationContainer} from '@react-navigation/native';
import {createStackNavigator} from '@react-navigation/stack';
import HomeScreen from './Component/HomeScreen';
import DetailsScreen from './Component/DetailsScreen';
import {StatusBar} from 'react-native';
import COLORS from './consts/colors';
import Login from './login/Login';
import Register from './login/Register';
import { CartProvider } from './Component/CartContent';
import CartScreen from './Component/CartScreen';
import HomeBar from './Component/HomeBar';
import Search from './Component/Search';
import Header from './Component/Header';
import Payment from './Component/Payment';
const Stack = createStackNavigator();

const App = () => {
  return (
    <CartProvider>
      <NavigationContainer>
        <StatusBar backgroundColor={COLORS.white} barStyle="dark-content" />
        <Stack.Navigator screenOptions={{headerShown: false}}>
          <Stack.Screen name="Login" component={Login} />
          <Stack.Screen name="Register" component={Register} />
          <Stack.Screen name="HomeScreen" component={HomeScreen} />
          <Stack.Screen name="Header" component={Header} />
          <Stack.Screen name="HomeBar" component={HomeBar} />
          <Stack.Screen name="Search" component={Search} />
          <Stack.Screen name="CartScreen" component={CartScreen } />
          <Stack.Screen name="DetailsScreen" component={DetailsScreen} />
          <Stack.Screen name="Payment" component={Payment} />


        </Stack.Navigator>
      </NavigationContainer>
    </CartProvider>
  );
};

export default App;