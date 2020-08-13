import * as firebase from 'firebase';

const firebaseConfig = {
    apiKey: "AIzaSyDLCjDBl8G-UJJqTZAjza9Ilkvies8IWsg",
    authDomain: "chores-5fd06.firebaseapp.com",
    databaseURL: "https://chores-5fd06.firebaseio.com",
    projectId: "chores-5fd06",
    storageBucket: "chores-5fd06.appspot.com",
    messagingSenderId: "105046415156",
    appId: "1:105046415156:web:3377b6431d15f66753b761",
    measurementId: "G-YZM6YV3NJH"
  };
  
  firebase.initializeApp(firebaseConfig);

  export default firebase;