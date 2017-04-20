import React, { Component } from 'react';
import { database, auth, googleAuthProvider } from './firebase';

import reactLogo from './react-logo.svg';
import firebaseLogo from './firebase-logo.svg';
import './App.css';

class App extends Component {
  constructor(props) {
    super(props);

    this.state = {
      data: null,
      newData: '',
      currentUser: {}
    }

    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.displayCurrentUser = this.displayCurrentUser.bind(this);
  }

  componentDidMount() {
    auth.onAuthStateChanged((currentUser) => {
      database.ref('/guides').on('value', (snapshot) => {
        const data = snapshot.val();
        this.setState({ data });
      });

      this.setState({ currentUser: currentUser || {} })
    });
  }

  handleChange(event) {
    const newData = event.target.value;
    this.setState({ newData })
  }

  handleSubmit(event) {
    event.preventDefault();
    database.ref('/guides').push({ name: this.state.newData });
  }

  // Auth
  signIn() {
    auth.signInWithPopup(googleAuthProvider);
  }

  signOut() {
    auth.signOut();
  }

  displayCurrentUser() {
    return <img className="App-nav-img" onClick={this.signOut}
      src={this.state.currentUser.photoURL}
      alt={this.state.currentUser.displayName}
    />
  }

  render() {
    return (
      <div className="App">
        <div className="App-nav">
          <span className="App-nav-title">Firebase + React Sample</span>
          <span className="App-nav-button">{this.state.currentUser.email ? this.displayCurrentUser() : <a href="#" onClick={this.signIn}>Sign In</a>}</span>
        </div>
        <div className="App-header">
          <img src={reactLogo} className="main-logo" alt="logo" />
          <img src={firebaseLogo} className="main-logo" alt="logo" />
          <h2>Welcome to React and Firebase</h2>
        </div>
        <p className="App-intro">
        </p>
        <div className="AppBody">
          <form className="App-form" onSubmit={this.handleSubmit}>
            <input className="text" name="name" placeholder="New data" type="text" onChange={this.handleChange} />
            <input className="button" type="submit" value="Push" />
          </form>
          <pre className="AppBody-fb-db">{JSON.stringify(this.state.data, null, 2)}</pre>
        </div>
      </div>
    );
  }
}

export default App;
