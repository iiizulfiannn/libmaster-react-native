import 'react-native-gesture-handler';
import React, {Component} from 'react';
import {Provider} from 'react-redux';
import store from './src/redux/store';
import {NavigationContainer} from '@react-navigation/native';
import {Provider as PaperProvider} from 'react-native-paper';
import {RootStack} from './src/screens/RootStack';

export default class App extends Component {
  render() {
    return (
      <Provider store={store}>
        <PaperProvider>
          <NavigationContainer>
            <RootStack />
          </NavigationContainer>
        </PaperProvider>
      </Provider>
    );
  }
}
