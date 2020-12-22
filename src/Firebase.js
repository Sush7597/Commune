import firebase from 'firebase'

const firebaseConfig = {
    apiKey: "AIzaSyB1--VL9SjxKMhFDfL4Uu_nZFDja3fTQo4",
    authDomain: "commune-7597.firebaseapp.com",
    projectId: "commune-7597",
    storageBucket: "commune-7597.appspot.com",
    messagingSenderId: "1091202682841",
    appId: "1:1091202682841:web:988bc8f84d83cf6e2a13c8",
    measurementId: "G-HKHRS7WYMN"
  };

  const firebaseApp = firebase.initializeApp(firebaseConfig)
  const db = firebaseApp.firestore()
  const auth = firebase.auth()
  const provider = new firebase.auth.GoogleAuthProvider()

  export {auth, provider}
  export default db;