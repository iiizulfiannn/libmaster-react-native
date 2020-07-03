import {
  registerUserAction,
  loginUserAction,
  pending,
  rejected,
  fulfilled,
  resetStateAction,
  currentUserAction,
} from '../actions/actionTypes';
import AsyncStorage from '@react-native-community/async-storage';

const initialValue = {
  currentUser: {},
  isLoading: false,
  isRejected: false,
  isFulfilledSignIn: false,
  isFulfilledSignUp: false,
  isInvalid: false,
  message: '',
};

const auth = (prevState = initialValue, action) => {
  switch (action.type) {
    case registerUserAction + pending:
      return {
        ...prevState,
        isLoading: true,
        isRejected: false,
        isFulfilledSignUp: false,
      };
    case registerUserAction + rejected:
      return {
        ...prevState,
        isRejected: true,
        isLoading: false,
        message: 'Failed Register',
      };
    case registerUserAction + fulfilled:
      return {
        ...prevState,
        isFulfilledSignUp: true,
        isLoading: false,
        message: 'Register Success',
      };

    case loginUserAction + pending:
      return {
        ...prevState,
        isLoading: true,
        isRejected: false,
        isFulfilledSignIn: false,
        isInvalid: false,
      };
    case loginUserAction + rejected:
      return {
        ...prevState,
        isRejected: true,
        isLoading: false,
        message: 'Failed Login',
        isInvalid: false,
      };
    case loginUserAction + fulfilled:
      const status = action.payload.status;

      if (status === 204) {
        return {
          ...prevState,
          isFulfilledSignIn: false,
          isLoading: false,
          isInvalid: true,
        };
      }

      let user;
      if (status === 200) {
        user = action.payload.data.data;
        AsyncStorage.setItem('user', JSON.stringify(user));
      }
      return {
        ...prevState,
        isFulfilledSignIn: true,
        isLoading: false,
        isInvalid: false,
        message: `Welcome, ${user.fullname}`,
      };

    case currentUserAction:
      const currentUser = JSON.parse(AsyncStorage.getItem('user'));
      console.log(currentUser);

      return {
        ...prevState,
        currentUser,
      };

    case resetStateAction:
      return {
        ...prevState,
        isFulfilled: false,
        isInvalid: false,
        isLoading: false,
        isRejected: false,
      };

    default:
      return {
        ...prevState,
      };
  }
};

export default auth;
