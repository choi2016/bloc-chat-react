import React, { Component } from 'react';

export class User extends Component {
  constructor(props) {
    super(props);
    this.signIn = this.signIn.bind(this);
    this.signOut = this.signOut.bind(this);
  }

  signIn() {
    const provider = new this.props.firebase.auth.GoogleAuthProvider();
    this.props.firebase.auth().signInWithPopup(provider).then((result) => {
      const user = result.user;
      this.props.setUser(user);
    });
  }

  signOut() {
    this.props.firebase.auth().signOut().then(() => {
      this.props.setUser(null);
    });
  }

  componentDidMount() {
    this.props.firebase.auth().onAuthStateChanged(user => {
      this.props.setUser(user);
    });
  }

  render() {
    return(
    <div>
      <p>{ this.props.user ? this.props.user.displayName : 'guest'  } </p>
      {this.props.user ?
        <input type = "button" value = "Sign Out" onClick = { (e) => this.signOut()} />
        :
      <input type = "button" value = "Sign In" onClick = { (e) => this.signIn()} />
      }
    </div>

    )
  }
}