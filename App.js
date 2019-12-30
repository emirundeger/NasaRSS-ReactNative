import React from 'react';
import {View, TouchableOpacity} from 'react-native';

import {createSwitchNavigator, createAppContainer} from 'react-navigation';

import {createStackNavigator} from 'react-navigation-stack';
import {createBottomTabNavigator} from 'react-navigation-tabs';
import {createDrawerNavigator} from 'react-navigation-drawer';

// Auth stack screen imports
import AuthLoading from './app/components/Screens/AuthLoading';
import Welcome from './app/components/Screens/Welcome';
import SignUpStep1 from './app/components/Screens/SignUpStep1';
import SignUpStep2 from './app/components/Screens/SignUpStep2';
import ForgetPassword from './app/components/Screens/ForgetPassword';

// App stack screen imports
import Home from './app/components/Home';
import Description from './app/components/Description';
import Settings from './app/components/Settings';

import Amplify from 'aws-amplify';
import awsConfig from './app/config/aws-exports';
Amplify.configure(awsConfig);

import Ionicons from 'react-native-vector-icons/Ionicons';

// Auth stack
const AuthNavigator = createStackNavigator(
  {
    Welcome: {
      screen: Welcome,
      // navigationOptions: {
      //   header: null,
      // },
      navigationOptions: () => ({
        title: `NASA`, // for the header screen
        headerStyle: {
          backgroundColor: '#03A9F4',
        },
        headerTintColor: '#fff',
        headerBackTitle: 'Back',
        headerTitleStyle: {textAlign: 'center', flex: 1, fontWeight: 'bold'},
      }),
    },
    SignUpStep1: {
      screen: SignUpStep1,
      navigationOptions: () => ({
        title: `Create a new account`,
      }),
    },
    SignUpStep2: {
      screen: SignUpStep2,
      navigationOptions: () => ({
        title: `Enter the confirmation code`,
      }),
    },
    ForgetPassword: {
      screen: ForgetPassword,
      navigationOptions: () => ({
        title: `Create a new password`,
      }),
    },
  },
  /*{
    initialRouteName: 'AuthLoading',
  },*/
);

const HomeStack = createStackNavigator({
  Home: {screen: Home},
  Description: {screen: Description},
});

// BottomTab stack
const MainTabs = createBottomTabNavigator(
  {
    Home: {
      screen: HomeStack,
    },
    Settings: {
      screen: Settings,
    },
  },
  {
    defaultNavigationOptions: ({navigation}) => ({
      tabBarIcon: ({focused, horizontal, tintColor}) => {
        const {routeName} = navigation.state;
        let IconComponent = Ionicons;
        let iconName;
        if (routeName === 'Home') {
          //iconName = `ios-planet${focused ? '' : '-outline'}`;
          iconName = `md-planet`;
        } else if (routeName === 'Settings') {
          iconName = `ios-options`;
        }

        return <IconComponent name={iconName} size={25} color={tintColor} />;
      },
    }),
    tabBarOptions: {
      activeTintColor: 'tomato',
      inactiveTintColor: 'gray',
    },
  },
);

const App = createSwitchNavigator({
  Authloading: {
    screen: AuthLoading,
  },
  Auth: {
    screen: AuthNavigator,
  },
  Tabs: {
    screen: MainTabs,
  },
});

export default createAppContainer(App);
