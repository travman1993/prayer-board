const firebaseConfig = {
    apiKey: "AIzaSyCO3Z7PQhCHQCIdh2fq3uPkoCWH8gp0xyU",
    authDomain: "lifted-706f5.firebaseapp.com",
    projectId: "lifted-706f5",
    storageBucket: "lifted-706f5.firebasestorage.app",
    messagingSenderId: "98841807260",
    appId: "1:98841807260:web:c97d63e3b87ad06c59e059"
  };
  
  // Initialize Firebase
  firebase.initializeApp(firebaseConfig);
  
  // Export services globally
  const db = firebase.firestore();
  const auth = firebase.auth();
  
  // Sign in anonymously
  auth.signInAnonymously()
    .then(() => {
      console.log("Anonymous user signed in");
    })
    .catch((error) => {
      console.error("Auth error:", error);
    });
  EOF
  cat firebase-config.js
  Output
  
  // Firebase Configuration
  const firebaseConfig = {
    apiKey: "AIzaSyCO3Z7PQhCHQCIdh2fq3uPkoCWH8gp0xyU",
    authDomain: "lifted-706f5.firebaseapp.com",
    projectId: "lifted-706f5",
    storageBucket: "lifted-706f5.firebasestorage.app",
    messagingSenderId: "98841807260",
    appId: "1:98841807260:web:c97d63e3b87ad06c59e059"
  };
  
  // Initialize Firebase
  firebase.initializeApp(firebaseConfig);
  
  // Export services globally
  const db = firebase.firestore();
  const auth = firebase.auth();
  
  // Sign in anonymously
  auth.signInAnonymously()
    .then(() => {
      console.log("Anonymous user signed in");
    })
    .catch((error) => {
      console.error("Auth error:", error);
    });