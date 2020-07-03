import React, {Component} from 'react';
import {
  Text,
  View,
  StyleSheet,
  Image,
  Dimensions,
  TouchableOpacity,
} from 'react-native';
import Swiper from 'react-native-swiper';
// import * as Animatable from 'react-native-animatable';
import LinearGradient from 'react-native-linear-gradient';

export default class SwiperComponent extends Component {
  // constructor(props) {
  //   super(props);
  //   this.state = {
  //     animation_signup: null,
  //     animation_login: null,
  //     show: false,
  //   };
  // }

  onIndexChanged(index) {
    if (index === 2) {
      this.setState({
        animation_signup: 'bounceInLeft',
        animation_login: 'bounceInRight',
        show: true,
      });
    } else {
      this.setState({
        animation_signup: null,
        animation_login: null,
        show: false,
      });
    }
  }

  skipButton = () => (
    <View style={styles.skipButton}>
      <TouchableOpacity
        onPress={() => this.props.navigation.navigate('SignIn')}>
        <Text style={styles.skipButtonText}>SKIP {'>'}</Text>
      </TouchableOpacity>
    </View>
  );

  render() {
    return (
      <>
        <Swiper
          loop={false}
          dot={<View style={styles.dot} />}
          activeDot={<View style={styles.activeDot} />}
          onIndexChanged={index => this.onIndexChanged(index)}>
          <View style={styles.slide}>
            <View style={styles.header}>
              <Image
                source={require('../assets/photo1.png')}
                style={styles.image}
              />
            </View>
            <View style={styles.footer}>
              <Text style={styles.title}>Make Cool</Text>
              <Text style={styles.text}>
                Hai, membaca buku membuatmu Cool, yuk join aplikasi LibMaster
                sekarang juga!
              </Text>
              {/* <TouchableOpacity
                onPress={() => this.props.navigation.navigate('SignIn')}>
                <LinearGradient
                  colors={['#02509E', '#4AB7FF']}
                  start={{x: 0, y: 1}}
                  end={{x: 1, y: 0}}
                  style={styles.skipButton}>
                  <Text style={styles.skipText}>SKIP</Text>
                </LinearGradient>
              </TouchableOpacity> */}
            </View>
          </View>

          <View style={styles.slide}>
            <View style={styles.header}>
              <Image
                source={require('../assets/photo2.png')}
                style={styles.image}
              />
            </View>
            <View style={styles.footer}>
              <Text style={styles.title}>Make Corious</Text>
              <Text style={styles.text}>
                Hai, membaca buku membuatmu Penasaran akan pengetahuan yang
                luas, yuk join aplikasi LibMaster
              </Text>
              {/* <TouchableOpacity
                onPress={() => this.props.navigation.navigate('SignIn')}>
                <LinearGradient
                  colors={['#02509E', '#4AB7FF']}
                  start={{x: 0, y: 1}}
                  end={{x: 1, y: 0}}
                  style={styles.skipButton}>
                  <Text style={styles.skipText}>SKIP</Text>
                </LinearGradient>
              </TouchableOpacity> */}
            </View>
          </View>

          <View style={styles.slide}>
            <View style={styles.header}>
              <Image
                source={require('../assets/photo3.png')}
                style={styles.image}
              />
            </View>
            <View style={styles.footer}>
              <Text style={styles.title}>Make Awesome</Text>
              <Text style={styles.text}>
                Hai, membaca buku membuatmu Menarik oleh lawan bicaramu karena
                wawasanmu setelah membaca buku, yuk join aplikasi LibMaster
              </Text>

              {/* {this.state.show ? (
                <View style={styles.wrapperButton}>
                  <Animatable.View
                    animation={this.state.animation_signup}
                    delay={0}
                    duration={1500}
                    useNativeDriver>
                    <TouchableOpacity
                      style={[styles.button, styles.buttonOutline]}
                      onPress={() => this.props.navigation.navigate('SignUp')}>
                      <Text style={styles.buttonTextOutline}>SIGN UP</Text>
                    </TouchableOpacity>
                  </Animatable.View>
                  <Animatable.View
                    animation={this.state.animation_login}
                    delay={0}
                    duration={1500}
                    useNativeDriver>
                    <TouchableOpacity
                      style={[styles.button, styles.buttonPrimary]}
                      onPress={() => this.props.navigation.navigate('SignIn')}>
                      <Text style={styles.buttonTextPrimary}>LOGIN</Text>
                    </TouchableOpacity>
                  </Animatable.View>
                </View>
              ) : null} */}
            </View>
          </View>
        </Swiper>
        <this.skipButton />
      </>
    );
  }
}

const {width, height} = Dimensions.get('screen');
const height_image = height * 0.5 * 0.8;
const width_image = height_image * 1.1;
const width_button = width * 0.3;

const styles = StyleSheet.create({
  slide: {
    flex: 1,
    backgroundColor: '#f1f3f6',
  },
  header: {
    flex: 2,
    justifyContent: 'center',
    alignItems: 'center',
  },
  footer: {
    flex: 1,
    alignItems: 'center',
    paddingHorizontal: 20,
  },
  image: {
    width: width_image,
    height: '80%',
  },
  title: {
    fontSize: 25,
    fontWeight: 'bold',
    color: '#3498db',
    textAlign: 'center',
  },
  text: {
    color: 'gray',
    textAlign: 'center',
    marginTop: 10,
  },
  dot: {
    backgroundColor: 'rgba(52,101,217,.4)',
    width: 8,
    height: 8,
    borderRadius: 4,
    marginHorizontal: 5,
    // marginVertical: 3,
  },
  activeDot: {
    backgroundColor: '#3465d9',
    width: 20,
    height: 8,
    borderRadius: 4,
    marginHorizontal: 5,
    // marginVertical: 3,
  },
  wrapperButton: {
    flexDirection: 'row',
  },
  button: {
    width: width_button,
    height: 40,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 50,
    // marginTop: 15,
  },
  buttonOutline: {
    borderColor: '#3465d9',
    borderWidth: 1,
    marginRight: 20,
  },
  buttonTextOutline: {
    color: '#3465d9',
  },
  buttonPrimary: {
    backgroundColor: '#3465d9',
  },
  buttonTextPrimary: {
    color: 'white',
  },
  // skipButton: {
  //   marginTop: 20,
  //   width: width * 0.5,
  //   height: 40,
  //   borderRadius: 50,
  //   alignItems: 'center',
  //   justifyContent: 'center',
  //   backgroundColor: '#3465d9',
  // },
  // skipText: {
  //   fontSize: 15,
  //   color: 'white',
  // },
  skipButton: {
    // justifyContent: 'center',
    alignItems: 'flex-end',
    height: 50,
    paddingRight: 40,
  },
  skipButtonText: {
    fontSize: 20,
    color: 'grey',
  },
});
