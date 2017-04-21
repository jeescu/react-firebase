# React + Firebase Setup

This project was bootstrapped with [Create React App](https://github.com/facebookincubator/create-react-app).

### Includes:
- Firebase setup
- Authentication
- Database: Retrieve and push data
- Cloud Storage: Upload file and save to database

### Getting Started
- Create your Firebase Project in `http://console.firebase.google.com`.
- Copy config in dashboard's  **Web Setup** and paste to `firebase.js`.
- Clone project and install dependencies.
```
> git clone 
> cd react-firebase
> npm install
```

### Deployment process with firebase
1. Install **Firebase Tools** globally. (You may need `sudo` here)
```
> npm install -g firebase-tools
```
2. Login to firebase using this tool in CLI
```
> firebase login
```
3. CD to your working project and initialize firebase.
```
> cd react-firebase
> firebase init
```
4. Configure firebase:
- Allow CLI features for **Database**, **Functions**, **Hosting**.
- Select your Firebase project to be used.
- Accept default rules to write on default file `database.rules.json`
- Install dependencies.
- Choose a `build` name directory since we build our app.
- Select **Yes** for configuring single app page. This is suitable also when app is using `react-router`.
- **Firebase initialization complete!**

5. Then we will build our app.
```
> npm build
```
6. Deploy!
```
> firebase deploy
```
Access your running application to the given **Hosting URL**.

**__Important__**
- Make sure to rebuild your app if you made changes and want to deploy again.




