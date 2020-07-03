import React, {Component} from 'react';
import {
  Text,
  StyleSheet,
  View,
  Image,
  TouchableOpacity,
  Dimensions,
} from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import {logOut} from '../utils/http';
import AsyncStorage from '@react-native-community/async-storage';

export default class Profile extends Component {
  constructor(props) {
    super(props);
    this.state = {
      user: {},
    };
  }
  componentDidMount = () => {
    AsyncStorage.getItem('user').then(value =>
      this.setState({user: JSON.parse(value)}),
    );
  };
  handleLogout = () => {
    logOut();
    this.props.navigation.navigate('Swiper');
  };

  render() {
    // console.log(this.state.user.fullname);
    return (
      <View style={styles.container}>
        <View style={styles.imageContainer}>
          <Image
            source={{uri: 'https://placeimg.com/100/100/people'}}
            style={styles.image}
          />
        </View>
        <View style={styles.info}>
          <Text style={styles.infoName}>{this.state.user.fullname}</Text>
          <Text style={styles.infoEmail}>{this.state.user.email}</Text>
        </View>
        <View style={styles.wrapperButton}>
          <TouchableOpacity
            onPress={() => this.props.navigation.navigate('HistoryBorrow')}>
            <LinearGradient
              start={{x: 0, y: 0}}
              end={{x: 1, y: 0}}
              colors={['#02509E', '#4AB7FF']}
              style={styles.button}>
              <Text style={styles.textLogout}>HISTORY BORROW</Text>
            </LinearGradient>
          </TouchableOpacity>
          <TouchableOpacity onPress={this.handleLogout}>
            <LinearGradient
              start={{x: 0, y: 0}}
              end={{x: 1, y: 0}}
              colors={['#02509E', '#4AB7FF']}
              style={styles.button}>
              <Text style={styles.textLogout}>LOG OUT</Text>
            </LinearGradient>
          </TouchableOpacity>
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  imageContainer: {
    marginTop: 30,
    width: 100,
    height: 100,
  },
  image: {
    width: 100,
    height: 100,
    borderWidth: 2,
    borderColor: 'white',
    borderRadius: 50,
  },
  wrapperButton: {
    marginTop: 30,
  },
  button: {
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 20,
    paddingVertical: 10,
    borderRadius: 100,
    width: Dimensions.get('screen').width * 0.7,
  },
  textLogout: {
    color: '#fff',
  },
  info: {
    marginTop: 20,
    alignItems: 'center',
    justifyContent: 'center',
  },
  infoName: {
    fontSize: 25,
  },
  infoEmail: {
    color: '#555',
  },
});
