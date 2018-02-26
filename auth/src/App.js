import React, { Component } from 'react';
import { View } from 'react-native';
import firebase from 'firebase';
import { Header, Button, Spinner, CardSection } from './components/common';
import LoginForm from './components/LoginForm';

export default class App extends Component {
  state = { loggedIn: null };

  componentWillMount() {
    firebase.initializeApp({
      apiKey: 'AIzaSyCjaXMe5ifGpHj-fVk5PsKUrNjNKlHW7jY',
      authDomain: 'auth-3292e.firebaseapp.com',
      databaseURL: 'https://auth-3292e.firebaseio.com',
      projectId: 'auth-3292e',
      storageBucket: 'auth-3292e.appspot.com',
      messagingSenderId: '11848134817'
    });

    firebase.auth().onAuthStateChanged((user) => {
      if (user) {
        this.setState({ loggedIn: true });
      } else {
        this.setState({ loggedIn: false });
      }
    });
  }

  renderContent() {
    if (this.state.loggedIn) {
      return (
        <CardSection>
          <Button onPress={() => firebase.auth().signOut()}>
            Log Out
          </Button>
        </CardSection>
      );
    } else if (this.state.loggedIn === null) {
      return <Spinner size="large" />;
    }

    return <LoginForm />;
  }

  render() {
    return (
      <View>
        <Header headerText="Authentication" />
        {this.renderContent()}
      </View>
    );
  }
}
