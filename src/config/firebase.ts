// Import the functions you need from the SDKs you need
import { initializeApp } from 'firebase/app';
import { getAuth, GoogleAuthProvider } from 'firebase/auth';
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
	apiKey: 'AIzaSyDnjgHpufWX980T4c1xy6P0mcow9-Ol7tg',
	authDomain: 'sociallysoda.firebaseapp.com',
	projectId: 'sociallysoda',
	storageBucket: 'sociallysoda.appspot.com',
	messagingSenderId: '1048303170847',
	appId: '1:1048303170847:web:5717910309b5e2291c6c2a'
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const provider = new GoogleAuthProvider();
