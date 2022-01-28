import firebase from "firebase/compat/app";
// import firebase from "firebase/compat/app";
import "firebase/compat/database";
const firebaseConfig = {
  apiKey: "AIzaSyC26O-sQtToWKNu4wTYea5xbN-s4GjHWVk",
  authDomain: "crud-book-management.firebaseapp.com",
  projectId: "crud-book-management",
  storageBucket: "crud-book-management.appspot.com",
  messagingSenderId: "201362639926",
  appId: "1:201362639926:web:753ae4acef193b5d05dc97",
};
const firedb = firebase.initializeApp(firebaseConfig);
export default firedb.database().ref();
