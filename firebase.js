import firebase from "firebase/compat";
const firebaseApp = firebase.initializeApp({
    apiKey: "AIzaSyBw80XhJ-EtHHDVGuQPAgwgnOMGIIcab6U",
    authDomain: "instagram-clone-react-794c7.firebaseapp.com",
    projectId: "instagram-clone-react-794c7",
    storageBucket: "instagram-clone-react-794c7.appspot.com",
    messagingSenderId: "417170307987",
    appId: "1:417170307987:web:d017897b1733fe919b0666",
    measurementId: "${config.measurementId}"
  });
  const db = firebaseApp.firestore();
  const auth = firebase.auth();
  const storage = firebase.storage();
  export { db , auth , storage }; 