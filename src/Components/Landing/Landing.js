import React from 'react';

import { Link } from 'react-router-dom';


export default function Landing() {
    return (
        <div>
            <Link to="signup">Inscription</Link>
            <Link to="login">Connexion</Link>
        </div>
    )
}
