import React, {Component} from 'react';
import {StyleSheet, View, Dimensions} from 'react-native';
import * as Animatable from 'react-native-animatable';

export default class Splash2 extends Component {
  componentDidMount = () => {
    setTimeout(() => {
      this.props.navigation.navigate('TabsStack');
    }, 5000);
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
