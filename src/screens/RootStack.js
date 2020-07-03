import 'react-native-gesture-handler';
import React, {Component} from 'react';
import {StyleSheet} from 'react-native';
import {createStackNavigator} from '@react-navigation/stack';
import {createMaterialBottomTabNavigator} from '@react-navigation/material-bottom-tabs';

import {connect} from 'react-redux';
import {currentUserActionCreator} from '../redux/actions/auth';

import HomeScreen from './Home';
import DetailsScreen from './Details';
import HistoryBorrowScreen from './HistoryBorrow';
import ProfileScreen from './Profile';

import SignInScreen from './SignIn';
import SignUpScreen from './SignUp';
import SwiperScreen from './Swiper';
import Splash1Screen from '../components/Splash1';
// import Splash2Screen from '../components/Splash2';

import MaterialIcons from 'react-native-vector-icons/MaterialIcons'; //people
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons'; //home, clock
// import AsyncStorage from '@react-native-community/async-storage';

const HomeStack = createStackNavigator();
const HistoryBorrowStack = createStackNavigator();
const ProfileStack = createStackNavigator();
const Auth = createStackNavigator();
const Tabs = createMaterialBottomTabNavigator();

const HomeStackScreen = () => (
  <HomeStack.Navigator headerMode="none">
    <HomeStack.Screen name="Home" component={HomeScreen} />
    <HomeStack.Screen name="Details" component={DetailsScreen} />
  </HomeStack.Navigator>
);
const HistoryBorrowStackScreen = () => (
  <HistoryBorrowStack.Navigator headerMode="none">
    <HistoryBorrowStack.Screen
      name="HistoryBorrow"
      component={HistoryBorrowScreen}
    />
    <HistoryBorrowStack.Screen name="Details" component={DetailsScreen} />
  </HistoryBorrowStack.Navigator>
);
const ProfileStackScreen = () => (
  <ProfileStack.Navigator headerMode="none">
    <ProfileStack.Screen name="Profile" component={ProfileScreen} />
  </ProfileStack.Navigator>
);
const TabsStackScreen = () => (
  <Tabs.Navigator
    initialRouteName="Home"
    labeled={false}
    activeColor="#3498db"
    inactiveColor="#aaa"
    barStyle={styles.barBackground}>
    <Tabs.Screen
      name="Home"
      component={HomeStackScreen}
      options={{
        tabBarLabel: 'Home',
        tabBarIcon: ({color}) => (
          <MaterialCommunityIcons name="home" color={color} size={26} />
        ),
      }}
    />
    <Tabs.Screen
      name="HistoryBorrow"
      component={HistoryBorrowStackScreen}
      options={{
        tabBarLabel: 'History Borrow',
        tabBarIcon: ({color}) => (
          <MaterialCommunityIcons name="clock" color={color} size={26} />
        ),
      }}
    />
    <Tabs.Screen
      name="Profile"
      component={ProfileStackScreen}
      options={{
        tabBarLabel: 'Profile',
        tabBarIcon: ({color}) => (
          <MaterialIcons name="people" color={color} size={26} />
        ),
      }}
    />
  </Tabs.Navigator>
);

export class RootStack extends Component {
  render() {
    return (
      <Auth.Navigator headerMode="none" initialRouteName="Splash1">
        <Auth.Screen name="Splash1" component={Splash1Screen} />
        <Auth.Screen name="Swiper" component={SwiperScreen} />
        <Auth.Screen name="SignUp" component={SignUpScreen} />
        <Auth.Screen name="SignIn" component={SignInScreen} />
        <Auth.Screen name="TabsStack" component={TabsStackScreen} />
      </Auth.Navigator>
    );
  }
}

const mapStateToProps = ({auth}) => {
  return {auth};
};

const mapDispatchToProps = dispatch => {
  return {
    currentUserAction: () => {
      dispatch(currentUserActionCreator());
    },
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(RootStack);

const styles = StyleSheet.create({
  barBackground: {
    backgroundColor: '#fff',
    borderTopColor: '#aaa',
    borderTopWidth: 1,
  },
});
