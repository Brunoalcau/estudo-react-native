/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 * @flow
 */
import { Navigation } from 'react-native-navigation';
import { Provider } from 'react-redux';
import { createStore, applyMiddleware } from 'redux';
import ReduxThunk from 'redux-thunk'
import registerScreens from './src/Screens/screens'
import reducers from './src/reducers';
import firebase from 'firebase';


const store = createStore(reducers, {}, applyMiddleware(ReduxThunk));

registerScreens(store,  Provider);

const config = {
  apiKey: "AIzaSyAYrUg5pyNWMfPYsWfUlrSc3cT-xx8Mj90",
  authDomain: "app9-da99e.firebaseapp.com",
  databaseURL: "https://app9-da99e.firebaseio.com",
  projectId: "app9-da99e",
  storageBucket: "app9-da99e.appspot.com",
  messagingSenderId: "516797699735"
};

firebase.initializeApp(config);

Navigation.startSingleScreenApp({
  screen: {
    screen: 'app9.login',
    title: 'Login',
    navigatorStyle: {
      navBarTextFontSize: 18,
      hideBackButtonTitle: false,
      statusBarHideWithNavBar: false,
      navBarHidden: true
    },
    navigatorButtons: {}
  },
  appStyle: {
    keepStyleAcrossPush: false
  }
})