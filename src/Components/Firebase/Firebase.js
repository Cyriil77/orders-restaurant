import app from 'firebase/app';
import 'firebase/auth';

const firebaseConfig = {
    apiKey: "AIzaSyDXTa75WNFCxnmqnNuIsv0RcLkRdHfYNOE",
    authDomain: "orders-restaurant.firebaseapp.com",
    databaseURL: "https://orders-restaurant.firebaseio.com",
    projectId: "orders-restaurant",
    storageBucket: "orders-restaurant.appspot.com",
    messagingSenderId: "454513792586",
    appId: "1:454513792586:web:d37e6a07f657da2d5df8b3",
    measurementId: "G-XGKP1LD2PF"
};

// firebase.analytics();



export default class Firebase {
    constructor() {
        app.initializeApp(firebaseConfig);
        this.auth = app.auth();
    }

    // Signup
    signupUser = (email, password) => {
        this.auth.createUserWithEmailAndPassword(email, password);
    }
    // Login
    loginUser = (email, password) => {
        this.auth.signInWithEmailAndPassword(email, password);
    }

    // Disconnected
    signoutUser = () => {
        this.auth.signOut();
    }

}