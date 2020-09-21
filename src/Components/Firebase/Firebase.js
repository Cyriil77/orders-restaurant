import app from 'firebase/app';
import 'firebase/firestore';
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


export default class Firebase {
    constructor() {
        app.initializeApp(firebaseConfig);
        this.auth = app.auth();
        this.db = app.firestore().collection('orders');
    }

    // Method I can call in all files and use it with the provider who is index.js at the root
    // Signup
    signupUser = (email, password) => this.auth.createUserWithEmailAndPassword(email, password);

    // Login
    loginUser = (email, password) => this.auth.signInWithEmailAndPassword(email, password);

    // Disconnected
    signoutUser = () => {this.auth.signOut()};

    // Send orders in database
    setOrders = (name, price, compositions) => this.db.doc().set({nom: name, prix: price, compo: compositions});


    displayOrder = () => this.db;

}