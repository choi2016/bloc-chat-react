import React, { Component } from 'react';
import './App.css';
import * as firebase from 'firebase';
import { RoomList } from './components/RoomList.js';

  var config = {
    apiKey: "AIzaSyDPRXbrBr7UA68cVm5w8mMzENdqDtUrdPs",
    authDomain: "bloc-chat-react-20852.firebaseapp.com",
    databaseURL: "https://bloc-chat-react-20852.firebaseio.com",
    projectId: "bloc-chat-react-20852",
    storageBucket: "bloc-chat-react-20852.appspot.com",
    messagingSenderId: "531975769149"
  };
  firebase.initializeApp(config);

class App extends Component {
  render() {
    return (
      <div className="App">
        <h1>Bloc Chat React</h1>
        <RoomList firebase = {firebase}/>
      </div>
      
    );
  }
}

export default App;