import Rebase from "re-base";
import firebase from "firebase";

const firebaseApp = firebase.initializeApp({
  apiKey: "AIzaSyBCbbjem0keyRC-jpVAom8DKV_hCKDlUmE",
  authDomain: "catch-of-the-day-yesh.firebaseapp.com",
  databaseURL: "https://catch-of-the-day-yesh.firebaseio.com"
});

const base = Rebase.createClass(firebaseApp.database());

// named export
export { firebaseApp };

export default base;
