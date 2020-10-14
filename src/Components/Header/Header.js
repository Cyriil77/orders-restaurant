import React, { useState, useEffect, useContext } from 'react';
import { Link } from 'react-router-dom';
import FirebaseContext from '../Firebase/Context';
import './style.css'

export default function Header(props) {

    // Get acess to function of firebase
    const firebase = useContext(FirebaseContext);
    const [userSession, setUserSession] = useState();

    // If user is not connected and verify user for display admin in menu
    firebase.auth.onAuthStateChanged(user => {


        // user != null && user.email === 'cyril@hotmail.fr' ? setUserSession(user) : setUserSession(user);
        setUserSession(user)
    });



    return userSession !== 'cyril@hotmail.fr' ? (

        <header>

            <h2>
                Bonjour {props.email}
            </h2>
            <div className="nav-disconnected">
                <nav>
                    <ul>
                        <li>
                            <Link to="">Acceuil</Link>
                            <Link to="payment">Commande</Link>
                            <Link to="">Récapitulatif</Link>
                        </li>
                    </ul>
                </nav>

                <button onClick={firebase.signoutUser}>Se déconnecter</button>
            </div>


        </header>

    ) : (
            <header>
                <div>
                    <nav>
                        <ul>
                            <li>
                                <Link to="">Acceuil</Link>
                                <Link to="admin">Admin</Link>
                            </li>
                        </ul>
                    </nav>
                </div>
            </header>

        )

}