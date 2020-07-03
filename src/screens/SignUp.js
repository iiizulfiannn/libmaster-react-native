import React, {Component} from 'react';
import {
  Text,
  StyleSheet,
  View,
  TextInput,
  TouchableOpacity,
} from 'react-native';

import {connect} from 'react-redux';
import {registerUserActionCreator} from '../redux/actions/auth';
import * as Animatable from 'react-native-animatable';

import qs from 'querystring';

import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import Feather from 'react-native-vector-icons/Feather';

export class SignUp extends Component {
  constructor(props) {
    super(props);
    this.state = {
      borderColor: null,
      fullname: '',
      email: '',
      password: '',
      fullNameInvalid: false,
      emailInvalid: false,
      passwordInvalid: false,
      fullNameEmpty: false,
      emailEmpty: false,
      passwordEmpty: false,

      isSecure: true,
    };
  }

  onFocus(value) {
    this.setState({
      borderColor: value,
    });
  }

  handleOnChangeFullname = val => {
    this.setState({
      emailInvalid: false,
      passwordInvalid: false,
      fullNameInvalid: false,
      fullNameEmpty: false,
      emailEmpty: false,
      passwordEmpty: false,
      fullname: val,
    });
  };

  handleOnChangeEmail = val => {
    this.setState({
      emailInvalid: false,
      passwordInvalid: false,
      fullNameInvalid: false,
      fullNameEmpty: false,
      emailEmpty: false,
      passwordEmpty: false,
      email: val,
    });
  };

  handleOnChangePassword = val => {
    this.setState({
      emailInvalid: false,
      passwordInvalid: false,
      fullNameInvalid: false,
      fullNameEmpty: false,
      emailEmpty: false,
      passwordEmpty: false,
      password: val,
    });
  };

  handleSecure = () => {
    this.setState({
      isSecure: !this.state.isSecure,
    });
  };

  handleRegister = async () => {
    const data = {
      fullname: this.state.fullname,
      email: this.state.email,
      password: this.state.password,
    };

    if (this.formValidation(data)) {
      await this.props.registerUserAction(qs.stringify(data));
    }
  };

  formValidation = data => {
    if (data.fullname === '') {
      this.setState({fullNameEmpty: true});
      return false;
    }
    if (data.fullname.length < 8) {
      this.setState({fullNameInvalid: true});
      return false;
    }
    if (data.email === '') {
      this.setState({emailEmpty: true});
      return false;
    }
    if (!data.email.includes('@')) {
      this.setState({emailInvalid: true});
      return false;
    }
    if (data.password === '') {
      this.setState({passwordEmpty: true});
      return false;
    }
    if (data.password.length < 8) {
      this.setState({passwordInvalid: true});
      return false;
    }

    return true;
  };

  errorMessage = ({message}) => (
    <Animatable.View animation="fadeInLeft" duration={500}>
      <View styles={styles.wrongEmailOrPass}>
        <Text style={styles.textWrong}>{message}</Text>
      </View>
    </Animatable.View>
  );

  componentDidUpdate = prevProps => {
    if (
      prevProps.auth.isFulfilledSignUp !== this.props.auth.isFulfilledSignUp
    ) {
      this.props.navigation.navigate('SignIn');
    }
  };

  render() {
    const borderActiveFullname = this.state.borderColor === 'fullname';
    const colorActiveFullname = this.state.borderColor === 'fullname';
    const borderActiveEmail = this.state.borderColor === 'email';
    const colorActiveEmail = this.state.borderColor === 'email';
    const borderActivePassword = this.state.borderColor === 'password';
    const colorActivePassword = this.state.borderColor === 'password';

    return (
      <View style={styles.container}>
        <Text style={styles.title}> Sign Up </Text>
        <Text style={styles.text}>
          {' '}
          Sign Up with Fullname, Email and Password{' '}
        </Text>
        <View style={styles.action}>
          <View
            style={[
              styles.section,
              borderActiveFullname && styles.borderActive,
              !borderActiveFullname && styles.borderNonActive,
            ]}>
            <MaterialIcons
              name="people"
              size={20}
              color={this.state.borderColor === 'fullname' ? '#3465d9' : 'gray'}
            />
            <TextInput
              name="fullname"
              placeholder="Fullname"
              style={[
                styles.textInput,
                colorActiveFullname && styles.colorActive,
                !colorActiveFullname && styles.colorActive,
              ]}
              value={this.state.fullname}
              onFocus={() => this.onFocus('fullname')}
              onChangeText={val => this.handleOnChangeFullname(val)}
            />
          </View>
          {this.state.fullNameInvalid ? (
            <this.errorMessage message={'Minimum 8 character'} />
          ) : null}
          {this.state.fullNameEmpty ? (
            <this.errorMessage message={'Fullname empty!'} />
          ) : null}

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
          {this.state.emailInvalid ? (
            <this.errorMessage message={'Must have @ character'} />
          ) : null}
          {this.state.emailEmpty ? (
            <this.errorMessage message={'Email empty!'} />
          ) : null}

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
          {this.state.passwordInvalid ? (
            <this.errorMessage message={'Minimum 8 character'} />
          ) : null}
          {this.state.passwordEmpty ? (
            <this.errorMessage message={'Password empty!'} />
          ) : null}
        </View>
        <TouchableOpacity style={styles.login} onPress={this.handleRegister}>
          <Text style={styles.textLogin}>SIGN UP</Text>
        </TouchableOpacity>
        <View style={styles.signup}>
          <Text style={[styles.textSignup, styles.textSecondary]}>
            Have an account?
          </Text>
          <TouchableOpacity
            onPress={() => this.props.navigation.navigate('SignIn')}>
            <Text style={[styles.textSignup, styles.textSignupPrimary]}>
              Login
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
    registerUserAction: data => {
      dispatch(registerUserActionCreator(data));
    },
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(SignUp);

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
    marginTop: 30,
  },
});
