import React, {Component} from 'react';
import {
  Text,
  StyleSheet,
  View,
  TextInput,
  TouchableOpacity,
} from 'react-native';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import Feather from 'react-native-vector-icons/Feather';
import * as Animatable from 'react-native-animatable';
import {connect} from 'react-redux';
import {loginUserActionCreator} from '../redux/actions/auth';

import qs from 'querystring';

export class SignIn extends Component {
  constructor(props) {
    super(props);
    this.state = {
      borderColor: null,
      isWrong: false,
      email: '',
      password: '',
      isSecure: true,
      isEmpty: false,
      isInvalid: false,
    };
  }

  onFocus(value) {
    this.setState({
      borderColor: value,
    });
  }

  handleOnChangeEmail = val => {
    this.setState({
      email: val,
      isEmpty: false,
      isInvalid: false,
    });
  };

  handleOnChangePassword = val => {
    this.setState({
      password: val,
      isEmpty: false,
      isInvalid: false,
    });
  };

  handleSecure = () => {
    this.setState({
      isSecure: !this.state.isSecure,
    });
  };

  handleSubmitLogin = async () => {
    this.setState({
      isInvalid: false,
    });
    const data = {
      email: this.state.email,
      password: this.state.password,
    };

    if (data.email === '' || data.password === '') {
      return this.setState({isEmpty: true});
    }
    if (data.email !== '' || data.password !== '') {
      this.setState({isEmpty: false, isInvalid: false});
      await this.props.loginUserAction(qs.stringify(data));
    }
  };

  componentDidUpdate = prevProps => {
    if (
      prevProps.auth.isFulfilledSignIn !== this.props.auth.isFulfilledSignIn
    ) {
      this.props.navigation.navigate('TabsStack');
    }

    if (prevProps.auth.isInvalid !== this.state.isInvalid) {
      this.setState({isInvalid: true});
    }
  };

  render() {
    const borderActiveEmail = this.state.borderColor === 'email';
    const colorActiveEmail = this.state.borderColor === 'email';
    const borderActivePassword = this.state.borderColor === 'password';
    const colorActivePassword = this.state.borderColor === 'password';

    return (
      <View style={styles.container}>
        <Text style={styles.title}> Login </Text>
        <Text style={styles.text}> Login with Email and Password </Text>
        <View style={styles.action}>
          <View
            style={[
              styles.section,
              borderActiveEmail && styles.borderActive,
              !borderActiveEmail && styles.borderNonActive,
            ]}>
            <MaterialIcons
              name="email"
              size={20}
              color={this.state.borderColor === 'email' ? '#3465d9' : 'gray'}
            />
            <TextInput
              name="email"
              placeholder="Email"
              style={[
                styles.textInput,
                colorActiveEmail && styles.colorActive,
                !colorActiveEmail && styles.colorActive,
              ]}
              value={this.state.email}
              onFocus={() => this.onFocus('email')}
              onChangeText={val => this.handleOnChangeEmail(val)}
            />
          </View>
          <View
            style={[
              styles.section,
              borderActivePassword && styles.borderActive,
              !borderActivePassword && styles.borderNonActive,
            ]}>
            <MaterialIcons
              name="lock"
              size={20}
              color={this.state.borderColor === 'password' ? '#3465d9' : 'gray'}
            />
            <TextInput
              name="password"
              placeholder="Password"
              style={[
                styles.textInput,
                colorActivePassword && styles.colorActive,
                !colorActivePassword && styles.colorActive,
              ]}
              onFocus={() => this.onFocus('password')}
              value={this.state.password}
              onChangeText={val => this.handleOnChangePassword(val)}
              secureTextEntry={this.state.isSecure ? true : false}
            />
            <TouchableOpacity onPress={this.handleSecure}>
              {this.state.isSecure ? (
                <Feather
                  name="eye-off"
                  size={20}
                  color={
                    this.state.borderColor === 'password' ? '#3465d9' : 'gray'
                  }
                />
              ) : (
                <Feather
                  name="eye"
                  size={20}
                  color={
                    this.state.borderColor === 'password' ? '#3465d9' : 'gray'
                  }
                />
              )}
            </TouchableOpacity>
          </View>
        </View>
        {this.state.isInvalid ? (
          <Animatable.View animation="fadeInLeft" duration={500}>
            <View styles={styles.wrongEmailOrPass}>
              <Text style={styles.textWrong}>
                Wrong email or password, careful ;)
              </Text>
            </View>
          </Animatable.View>
        ) : null}
        {this.state.isEmpty ? (
          <Animatable.View animation="fadeInLeft" duration={500}>
            <View styles={styles.wrongEmailOrPass}>
              <Text style={styles.textWrong}>
                Email or password do not empty! OK ./
              </Text>
            </View>
          </Animatable.View>
        ) : null}
        <TouchableOpacity style={styles.login} onPress={this.handleSubmitLogin}>
          <Text style={styles.textLogin}>LOGIN</Text>
        </TouchableOpacity>
        <View style={styles.signup}>
          <Text style={[styles.textSignup, styles.textSecondary]}>
            Don't have an account?
          </Text>
          <TouchableOpacity
            onPress={() => this.props.navigation.navigate('SignUp')}>
            <Text style={[styles.textSignup, styles.textSignupPrimary]}>
              Sign Up
            </Text>
          </TouchableOpacity>
        </View>
      </View>
    );
  }
}

const mapStateToProps = ({auth}) => {
  return {
    auth,
  };
};

const mapDispatchToProps = dispatch => {
  return {
    loginUserAction: data => {
      dispatch(loginUserActionCreator(data));
    },
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(SignIn);

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
    justifyContent: 'center',
    paddingHorizontal: 30,
    paddingVertical: 100,
  },
  title: {
    color: '#3465d9',
    fontWeight: 'bold',
    fontSize: 30,
  },
  text: {
    color: 'gray',
  },
  section: {
    flexDirection: 'row',
    borderWidth: 1,
    borderRadius: 50,
    paddingHorizontal: 15,
    alignItems: 'center',
    marginTop: 10,
  },
  textInput: {
    flex: 1,
    paddingLeft: 10,
  },
  textLogin: {
    color: 'white',
    fontSize: 15,
    fontWeight: 'bold',
  },
  login: {
    width: '100%',
    height: 40,
    backgroundColor: '#3465d9',
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 25,
    borderRadius: 50,
  },
  signup: {
    marginTop: 25,
    flexDirection: 'row',
    justifyContent: 'center',
  },
  textSignup: {
    textAlign: 'center',
  },
  textSecondary: {
    color: 'gray',
  },
  textSignupPrimary: {
    color: '#3465d9',
    marginLeft: 3,
  },
  borderActive: {
    borderColor: '#3465d9',
  },
  borderNonActive: {
    borderColor: 'gray',
  },
  colorActive: {
    color: '#3465d9',
  },
  colorNonActive: {
    color: 'gray',
  },
  wrongEmailOrPass: {
    paddingTop: 10,
  },
  textWrong: {
    color: 'red',
  },
  action: {
    marginVertical: 10,
    marginTop: 20,
  },
});
