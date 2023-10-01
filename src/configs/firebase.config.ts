import * as firebase from "firebase-admin";

const credentials = require("./data-share-auth-firebase-adminsdk-n3wpg-b44bd9465c.json");

firebase.initializeApp({
    credential: firebase.credential.cert(credentials),
    databaseURL: "https://data-share-auth-default-rtdb.firebaseio.com",
});

export default firebase;