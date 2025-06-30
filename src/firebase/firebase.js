// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth"; // For authentication
import { getFirestore } from "firebase/firestore"; // For Firestore database
import { getStorage } from "firebase/storage"; // For file storage (if needed)

// Your Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyBKCajKNhUNRjVzYg773h8J6IirBwKWgYw", // hardcoded directly
  authDomain: "android-app-f5d0f.firebaseapp.com",
  projectId: "android-app-f5d0f",
  storageBucket: "android-app-f5d0f.appspot.com",
  messagingSenderId: "960254778960",
  appId: "1:960254778960:android:fbf35567a963480c13bb55",
  measurementId: "G-MEASUREMENT_ID"
};


// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Initialize Firebase services
const auth = getAuth(app); // Firebase authentication service
const db = getFirestore(app); // Firestore database service
const storage = getStorage(app); // Firebase storage service

// Export the services for use in other parts of your app
export { auth, db, storage };
