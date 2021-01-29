import firebase from "firebase/app";

// Add the Firebase services that you want to use
import "firebase/auth";
export var firebaseConfig = {
    apiKey: "AIzaSyBVb9C3qsRGWRcz-AJ0veusZGjuK2JMu5A",
    authDomain: "gi-app-e2bb2.firebaseapp.com",
    projectId: "gi-app-e2bb2",
    storageBucket: "gi-app-e2bb2.appspot.com",
    messagingSenderId: "1093133212166",
    appId: "1:1093133212166:web:98bdcc5310e208d4530187"
  };
  // Initialize Firebase
firebase.initializeApp(firebaseConfig);
export default firebase;