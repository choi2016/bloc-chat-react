import React, { Component } from 'react';

export class MessageList extends Component {
  constructor(props) {
    super(props);
      this.state = { username: "", content: "", sentAt: "", roomId: "", messages: []}
      this.messagesRef = this.props.firebase.database().ref("messages");
      this.handleChange = this.handleChange.bind(this);
      this.createMessage = this.createMessage.bind(this);
  }

  handleChange(e) {
    e.preventDefault();
    this.setState({
      username: this.props.user,
      content: e.target.value,
      sentAt: this.props.firebase.database.ServerValue.TIMESTAMP,
      roomId: this.props.activeRoom
    });
  }

  createMessage(e) {
    e.preventDefault();
    this.messagesRef.push({
      username: this.state.username,
      content: this.state.content,
      sentAt: this.state.sentAt,
      roomId: this.state.roomId
    });
    this.setState({ username: "", content: "", sentAt: "", roomId: "" });
  }

  componentDidMount() {
    this.messagesRef.on('child_added', snapshot => {
      const message = snapshot.val();
      message.key = snapshot.key;
      this.setState({ messages: this.state.messages.concat(message) })
    });
  }

    render() {
        const activeRoom = this.props.activeRoom;
        const messageList = this.state.messages
        .filter(message => message.roomId === activeRoom)
        .map(message => {
            return <div className="current-message" key={message.key}>{message.username}: {message.content}</div>
        })
       
        return (
                <div className="chatroom-messages">
                    <div>{messageList}
                    </div>
           
                    <form onSubmit={(e) => this.handleSubmit(e)}>
                        <input type="text" name="newmessage" placeholder="New Message" value={this.state.content} 
                        onChange={(e) => this.handleChange(e)} />
                        <button type="submit" onClick={(e) => this.createMessage(e)}>Send</button>
                        </form>
                    </div>   
        );
    }
}