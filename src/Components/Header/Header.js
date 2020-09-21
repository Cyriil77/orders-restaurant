import React, { useState, useEffect, useContext } from 'react';
import { Link } from 'react-router-dom';
import FirebaseContext from '../Firebase/Context';

export default function Header() {

    // Get acess to function of firebase
    const firebase = useContext(FirebaseContext);
    const [userSession, setUserSession] = useState(null);

    // If user is not connected and verify user for display admin in menu
    firebase.auth.onAuthStateChanged(user => {
        user != null &&
        user.email === 'cyril@hotmail.fr' ? setUserSession(user) : setUserSession(null);
    });


    return userSession === null ? (
        <div>
            <nav>
                <ul>
                    <li>
                        <Link to="">Acceuil</Link>
                        <Link to="">Panier</Link>
                    </li>
                </ul>
            </nav>
        </div>
    ) : (
            <div>
                <nav>
                    <ul>
                        <li>
                            <Link to="">Acceuil</Link>
                            <Link to="">Panier</Link>
                            <Link to="admin">Admin</Link>
                        </li>
                    </ul>
                </nav>
            </div>
        )

}