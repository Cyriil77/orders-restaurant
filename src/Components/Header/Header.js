import React, { useState, useContext } from 'react';
import { Link } from 'react-router-dom';

import FirebaseContext from '../Firebase/Context';

import './style.css'

export default function Header(props) {

    // Get acess to function of firebase
    const firebase = useContext(FirebaseContext);

    const [userSession, setUserSession] = useState(null);

    // If user is not connected and verify user for display admin in menu
    firebase.auth.onAuthStateChanged(user => {
        setUserSession(user.email);
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
                            <Link to="welcome">Accueil</Link>
                            <Link to="commande">Commande</Link>
                            <Link to="summaryOrders">Récapitulatif</Link>
                        </li>
                    </ul>
                </nav>

                <button onClick={firebase.signoutUser}>Se déconnecter</button>

            </div>

        </header>

    ) : (
            <header>

                <h2>
                    Bonjour {props.email}
                </h2>

                <div className="nav-disconnected">

                    <nav>
                        <ul>
                            <li>
                                <Link to="welcome">Acceuil</Link>
                                <Link to="commande">Commande</Link>
                                <Link to="summaryOrders">Récapitulatif</Link>
                                <Link to="admin">Admin</Link>
                            </li>
                        </ul>
                    </nav>

                    <button onClick={firebase.signoutUser}>Se déconnecter</button>

                </div>
            </header>

        )

}