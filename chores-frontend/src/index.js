import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import * as serviceWorker from './serviceWorker';
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

ReactDOM.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
  document.getElementById('root')
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
