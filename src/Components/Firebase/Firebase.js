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

        // Access authentification
        this.auth = app.auth();

        // Acess database
        this.userDb = app.firestore().collection('user');
        this.orderDb = app.firestore().collection('orders');
    }

    // Method I can call in all files and use it with the provider who is index.js at the root


    // Signup auth
    signupUser = (email, password) => this.auth.createUserWithEmailAndPassword(email, password);

    // Send user signup datas in database
    setUserId = (uid, email) => this.userDb.doc(uid).set({ email: email, uid: uid })

    // Login
    loginUser = (email, password) => this.auth.signInWithEmailAndPassword(email, password);

    // Disconnected
    signoutUser = () => { this.auth.signOut() };

    // Send orders in database for admin
    setMenu = (name, price, compositions, id) => this.orderDb.doc().set({
        nom: name,
        prix: price,
        compo: compositions,
        id: id
    });

    // Get datas
    displayOrder = () => this.orderDb;
    displayOrderr = () => this.userDb;

    addOrder = (uid, mail, obj) => this.userDb.doc(uid).set({
        uid: uid,
        email: mail,
        futurOrder: [
            {
                date: new Date(),
                obj
            }
        ]
    })



}