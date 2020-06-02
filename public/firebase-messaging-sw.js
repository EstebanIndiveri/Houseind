// importScripts("https://www.gstatic.com/firebasejs/7.6.2/firebase-app.js");
// importScripts("https://www.gstatic.com/firebasejs/7.6.2/firebase-messaging.js");

// importScripts("https://www.gstatic.com/firebasejs/7.5.2/firebase-app.js");
// importScripts("https://www.gstatic.com/firebasejs/7.5.2/firebase-messaging.js");

importScripts('https://www.gstatic.com/firebasejs/4.8.1/firebase-app.js');
importScripts('https://www.gstatic.com/firebasejs/4.8.1/firebase-messaging.js');

const firebaseConfig = {
    apiKey: "AIzaSyBQtXZUfY7Qwkoca5wuIVH-PTPlR54BIFY",
    authDomain: "projecrud.firebaseapp.com",
    databaseURL: "https://projecrud.firebaseio.com",
    projectId: "projecrud",
    storageBucket: "projecrud.appspot.com",
    messagingSenderId: "960780967800",
    appId: "1:960780967800:web:a62d4084b6e7a89483f28d",
    measurementId: "G-1W8S4CS2EQ"
  };

  

  firebase.initializeApp(firebaseConfig);
  const messaging=firebase.messaging();