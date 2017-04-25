# React + Firebase Setup

This project was bootstrapped with [Create React App](https://github.com/facebookincubator/create-react-app).

### Includes:
- Firebase setup
- Authentication
- Database: Retrieve and push data
- Cloud Storage: Upload file and save to database
- Cloud Functions: Cloud Messaging, Message notification

### Getting Started
- Create your Firebase Project in `http://console.firebase.google.com`.
- Copy config in dashboard's  **Web Setup** and paste to `firebase.js`.
- Clone project and install dependencies.
```
> git clone 
> cd react-firebase
> npm install
```

### Authentication
See [Firebase Authentication](https://firebase.google.com/docs/auth/web/start) docs.
`firebase.auth()`

Sign-In method is using `GoogleAuthProvider` with a pop-up window. When `ComponentDidMount` was called,
`auth.onAuthStateChanged` will listen to current auth user state. When the user is logged-in, user state in the component will set.

### Database
See [Firebase Authentication](https://firebase.google.com/docs/auth/) docs.
`firebase.database()`

Initially created an object `guides` as our first collection to push our data. The `guidesRef` is the database reference for the `guides` object in firebase.
Pushing the new data will also add the current User id, who created the data.

### Cloud Storage
See [Firebase Storage](https://firebase.google.com/docs/storage/web/start) docs.
`firebase.storage()`

We have file input to accept images (`png|gif|jpeg`),
`onChange` will upload the file first to the given storage ref and then get the file path and save to `users` in database.
We can also listen to state changes while the file is uploading which we can display the percentage of the upload progress.

### Cloud Functions
See [Cloud Functions](https://firebase.google.com/docs/functions/get-started) for more details.
Checkout the [examples](https://github.com/firebase/functions-samples) of other functions
The example here is creating message alert using cloud functions

Follow this steps to get started.
1.  Create a file named `firebase-messaging-sw.js` in public folder to serve it statically in the host.
This file is our [Service Worker](https://developers.google.com/web/fundamentals/getting-started/primers/service-workers) for messaging. Follow this [guide](https://firebase.google.com/docs/cloud-messaging/js/receive#handle_messages_when_your_web_app_is_in_the_foreground). 
You can find your **sender id** located at your project `settings > cloud functions > sender id`
- Create handler here for showing the notification in the device.

2. Create the function in `function/index.js`. See the file.

3. Create file `request-messaging-permission` to notify new logged-in users if they want to allow notification.
- Apply this method during user login in the app.

4. Check function logs in firebase console.

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
- If you only edited the firebase-generated folder `functions/**`, you can just deploy by running `firebase deploy --only functions`.




