import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import React from 'react';
import io from "socket.io-client";

//const socket = io.connect('/');
const socket = io();

class NameBox extends React.Component { 

  render() {
      return (
          <input id = "name" type="text" placeholder="Name" defaultValue = "" className="form-control" onChange = {this.props.handleChange}></input>
      )
  }
}

class MessageBox extends React.Component { 

  render() {
      return (
          <textarea id = "message" type="text" placeholder="Name" defaultValue = "" className="form-control" onChange = {this.props.handleChange}></textarea>
      )
  }
}

class SendButton extends React.Component {

  render() {
      return (
          <button id="send" className="btn btn-success" type="button" onClick = {this.props.handleClick} > Send </button>
      )
  }
}

class App extends React.Component {

  constructor(props) {

    super(props);

    this.state = {
      nmBox : <NameBox handleChange = {this.handleNameChange}/>,
      msgBox : <MessageBox handleChange = {this.handleMsgChange}/>,
      sendButton : <SendButton handleClick = {this.sendMessage}/>,
      nmVal : "",
      msgVal : "",
      msgList: <div></div>
    }

  }

    handleNameChange = (event) => {

      this.setState(
      {
          nmVal: event.target.value
      });
    }

    handleMsgChange = (event) => {

      this.setState(
      {
          msgVal: event.target.value
      });
    }

    sendMessage = () => {
      const data = {name: this.state.nmVal, message: this.state.msgVal};

      fetch('http://localhost:9000/messages', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        mode: 'cors',
        body: JSON.stringify(data)
      })
      .then(response => {
        try {
          response.json();
        } catch(error) {
          console.log('Error happened here 1');
          console.error(error);
        }})
      .then(data => {
        try {
          console.log('Success:', data);
        } catch (error) {
            console.log('Error happened here 2');
            console.error(error);
        }
        
      })
      .catch((error) => {
        console.error('Error:', error);
      });
    } 
    
    getMessages = () => {
    
      fetch('http://localhost:9000/messages')
        .then(res => res.json())
        .then(data => {

          const listItems = data.map((listItem) => {
            return <div key = {listItem._id}>
              <h4>
                {listItem.name}
              </h4>      
              <p>
                {listItem.message}
              </p>      
            </div>;
          })

          const newMsgList = <div id="messages">{listItems}</div>;

          this.setState(
          {
            msgList: newMsgList
          });        
        })     
    }

    componentWillMount() {
      this.getMessages();
    }

 
  render() {
    return (
      <div className ="container">
          <br/>
          <div className = "jumbotron">
              <h1 className="display-4"> Send Message</h1>
              <br/>
              {this.state.nmBox}
              <br/>
              {this.state.msgBox}
              <br/>
              {this.state.sendButton}
          </div>         
          {this.state.msgList}         
      </div>
    )
  }
}

export default App;