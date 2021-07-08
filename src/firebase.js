import firebase from 'firebase'
const firebaseConfig = {
    apiKey: "AIzaSyBfOywva1dta5rzZTGXFqTyClRF6Egal7E",
    authDomain: "whatsapp-clone-bd943.firebaseapp.com",
    projectId: "whatsapp-clone-bd943",
    storageBucket: "whatsapp-clone-bd943.appspot.com",
    messagingSenderId: "587354028001",
    appId: "1:587354028001:web:8fa9a9fbfa51ea02b604a0",
    measurementId: "G-0EM4M07D28"
  };

  const firebaseApp= firebase.initializeApp(firebaseConfig)
const DB= firebaseApp.firestore()
const auth=firebase.auth();
const provider= new firebase.auth.GoogleAuthProvider()

export {auth,provider}
export default DB