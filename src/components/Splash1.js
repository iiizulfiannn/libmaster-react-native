import React, {Component} from 'react';
import {StyleSheet, View, Dimensions} from 'react-native';
import * as Animatable from 'react-native-animatable';
import AsyncStorage from '@react-native-community/async-storage';

export default class Splash1 extends Component {
  constructor(props) {
    super(props);
    this.state = {
      user: null,
    };
  }
  componentDidMount = () => {
    AsyncStorage.getItem('user').then(value => this.setState({user: value}));
    setTimeout(() => {
      if (this.state.user !== null) {
        this.props.navigation.navigate('TabsStack');
      } else {
        this.props.navigation.navigate('SignIn');
      }
    }, 6000);
  };

  render() {
    return (
      <View style={styles.container}>
        <Animatable.Image
          animation="bounceIn"
          duration={3000}
          source={require('../assets/logo.png')}
          style={styles.logo}
          resizeMode="contain"
        />
      </View>
    );
  }
}
const {height} = Dimensions.get('screen');
const height_logo = height * 0.2;
const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#fff',
  },
  logo: {
    width: height_logo,
    height: height_logo,
  },
});
