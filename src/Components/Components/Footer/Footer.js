import React from 'react';
import { Link } from 'react-router-dom';

import './style.css'

export default function Footer() {
    return (
        <footer className="footer">
            <nav>
                <ul>
                    <li>
                        <Link to="welcome">Accueil</Link>
                        <Link to="commande">Commande</Link>
                        <Link to="summaryOrders">Récapitulatifs</Link>
                    </li>
                </ul>
            </nav>
        </footer>
    )
}
