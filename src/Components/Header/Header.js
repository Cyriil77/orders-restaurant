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
                            <Link to="summaryOrders">Récapitulatifs</Link>
                        </li>
                    </ul>
                </nav>

                <button onClick={firebase.signoutUser}>Se déconnecter</button>

            </div>

        </header>

    ) : (
            <header>

                <nav className="navbar navbar-expand-lg navbar-dark bg-dark">
                    <a className="navbar-brand" href="#">Logo</a>
                    <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarText" aria-controls="navbarText" aria-expanded="false" aria-label="Toggle navigation">
                        <span className="navbar-toggler-icon"></span>
                    </button>
                    <div className="collapse navbar-collapse" id="navbarText">
                        <ul className="navbar-nav mr-auto">
                            <li className="nav-item active">

                                <Link className="nav-link" to="welcome">Accueil</Link>
                            </li>
                            <li className="nav-item">
                                <Link className="nav-link" to="commande">Commande</Link>
                            </li>
                            <li className="nav-item">
                                <Link className="nav-link" to="summaryOrders">Récapitulatifs</Link>
                            </li>
                            <li className="nav-item">
                                <Link className="nav-link" to="admin">Administrateur</Link>
                            </li>
                        </ul>

                        <button className="btn btn-light" onClick={firebase.signoutUser}>Se déconnecter</button>
                    </div>
                </nav>
            </header>

        )

}