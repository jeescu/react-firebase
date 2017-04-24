var functions = require('firebase-functions');
var admin = require('firebase-admin');

// // Create and Deploy Your First Cloud Functions
// // https://firebase.google.com/docs/functions/write-firebase-functions
//
// exports.helloWorld = functions.https.onRequest((request, response) => {
//  response.send("Hello from Firebase!");
// });

admin.initializeApp(functions.config().firebase);

exports.newMessageAlert = functions.database.ref('/guides/{guide}')
    .onWrite(event => {
        const guide = event.data.val();
        const guideUserKey = guide.uid;

        const getTokens = admin.database().ref('users').once('value')
            .then(snapshot => {
                const tokens = [];
                snapshot.forEach(user => {
                    const userKey = user.key;
                    const token = user.child('token').val();
                    // get other user tokens except the sender
                    if (userKey !== guideUserKey && token) tokens.push(token);
                });
                return tokens;                
            });
        
        const getAuthor = admin.auth().getUser(guideUserKey);

        Promise.all([getTokens, getAuthor]).then(([ tokens, author ]) => {
            const payload = {
                notification: {
                    title: `React + Firebase from ${author.displayName}`,
                    body: guide.content,
                    icon: author.photoURL
                }
            }
            admin.messaging().sendToDevice(tokens, payload).catch(console.error);
        });
    });
