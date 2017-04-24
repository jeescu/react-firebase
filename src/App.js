import React, { Component } from 'react';
import { database, auth, googleAuthProvider, storage } from './firebase';
import registerMessaging from './request-messaging-permission';

import FileInput from 'react-file-input';

import reactLogo from './react-logo.svg';
import firebaseLogo from './firebase-logo.svg';
import './App.css';

class App extends Component {
  constructor(props) {
    super(props);

    this.state = {
      guides: null,
      newData: '',
      currentUser: {},
      userImages: null
    }

    this.userRef = database.ref('/users').child('Anonymous');
    this.guidesRef = database.ref('/guides');
    this.userStorageRef = storage.ref('/user-files').child('Anonymous');

    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleFileSubmit = this.handleFileSubmit.bind(this);
    this.displayCurrentUser = this.displayCurrentUser.bind(this);
  }

  componentDidMount() {
    auth.onAuthStateChanged((currentUser) => {
      this.setState({ currentUser: currentUser || {} });      
      
      if (currentUser) {
        // Init current user Refs
        this.userRef = database.ref('/users').child(currentUser.uid);
        this.userStorageRef = storage.ref('/user-files').child(currentUser.uid);

        this.guidesRef.on('value', (snapshot) => {
          const guides = snapshot.val();
          this.setState({ guides });
        });

        this.userRef.child('images').on('value', (snapshot) => {
          const userImages = snapshot.val();
          if (userImages) {
            this.setState({ userImages });
          }
        });
        // register function messaging alert for this user
        registerMessaging(currentUser);
        // Add user to users database if not exist
        this.userRef.once('value', (snapshot) => {
          const userData = snapshot.val();
          if (!userData) {
            this.userRef.set({ name: currentUser.displayName });
          }
        });

      } else {
        this.setState({ guides: null, userImages: null });
      }
    });
  }

  // Form Events
  handleChange(event) {
    const newData = event.target.value;
    this.setState({ newData })
  }

  handleSubmit(event) {
    event.preventDefault();
    this.guidesRef.push({ name: this.state.newData });
  }

  handleFileSubmit(event) {
    const file = event.target.files[0];
    const uploadTask = this.userStorageRef.child(file.name).put(file, { contentType: file.type });

    uploadTask.on('state_changed', (snapshot) => {
      console.log(snapshot.bytesTransferred / snapshot.totalBytes * 100 + '%');
    });

    uploadTask.then((snapshot) => {
      this.userRef.child('images').push(snapshot.downloadURL);
    });
  }

  // Auth Events
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

  displayUserImages() {
    const { userImages } = this.state;
    if (userImages) {
      const imageIds = Object.keys(userImages);
      return imageIds.map((id) => <img
        key={id}
        className="App-image"
        src={userImages[id]}
      />);
    }
  }

  render() {
    return (
      <div className="App">
        <div className="App-nav">
          <span className="App-nav-title">React + Firebase Setup</span>
          <span className="App-nav-button">{this.state.currentUser.email ? this.displayCurrentUser() : <a href="#" onClick={this.signIn}>Sign In</a>}</span>
        </div>
        <div className="App-header">
          <img src={reactLogo} className="main-logo" alt="logo" />
          <img src={firebaseLogo} className="main-logo" alt="logo" />
          <h2>Welcome to React and Firebase</h2>
        </div>

        <p className="App-intro">
          <code><b>Database</b></code>
        </p>
        <div className="AppBody">
          <form className="App-form" onSubmit={this.handleSubmit}>
            <input className="text" name="name" placeholder="New data" type="text" onChange={this.handleChange} />
            <input className="button" type="submit" value="Push" />
          </form>
          <pre className="AppBody-fb-db">{JSON.stringify(this.state.guides, null, 2)}</pre>
        </div>

        <p className="App-intro">
          <code><b>Cloud Storage</b></code>
        </p>
        <div className="AppBody">
          <FileInput
            className="file"
            accept=".png,.gif,.jpg"
            placeholder="Select an image"
            onChange={this.handleFileSubmit}
          />

          <div className="App-images">
            {this.displayUserImages()}
          </div>
        </div>
      </div>
    );
  }
}

export default App;
