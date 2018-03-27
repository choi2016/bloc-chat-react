import React, { Component } from 'react';
import './App.css';
import * as firebase from 'firebase';
import { RoomList } from './components/RoomList.js';
import { MessageList } from './components/MessageList.js';
import { User } from './components/User.js';

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
  constructor(props) {
    super(props);
    this.state = {activeRoom: "", user: null};
    this.activeRoom = this.activeRoom.bind(this);
    this.setUser = this.setUser.bind(this);
  }

  activeRoom(room) {
    this.setState({ activeRoom: room })
  }

  setUser(user) {
    this.setState({ user: user });
  }

  render() {
    const showMessages = this.state.activeRoom;

    return (
      <div className="App">
        <h1>{this.state.activeRoom.title || "Select A Room"}</h1>
        <User firebase={firebase} setUser={this.setUser} user = { this.state.user} />
        <RoomList firebase={firebase} activeRoom={this.activeRoom} user = { this.state.user} />
        { showMessages ?
        (<MessageList firebase={firebase} activeRoom={this.state.activeRoom.key} user = { this.state.user} />)
        : (null)
        }
      </div>
      
    );
  }
}

export default App;
