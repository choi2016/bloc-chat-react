import React, { Component } from 'react';
import './App.css';
import * as firebase from 'firebase';
import { RoomList } from './components/RoomList.js';
import { MessageList } from './components/MessageList.js';

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
    this.state = {activeRoom: ""};
    this.activeRoom = this.activeRoom.bind(this);
  }

  activeRoom(room) {
    this.setState({ activeRoom: room })
  }

  render() {
    const showMessages = this.state.activeRoom;

    return (
      <div className="App">
        <h1>{this.state.activeRoom.title || "Select A Room"}</h1>
        <RoomList firebase={firebase} activeRoom={this.activeRoom} />
        { showMessages ?
        (<MessageList firebase={firebase} activeRoom={this.state.activeRoom.key}/>)
        : (null)
        }
      </div>
      
    );
  }
}

export default App;
