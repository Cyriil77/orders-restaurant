import React, { useContext, useState } from 'react';
import { Link } from 'react-router-dom'
import FirebaseContext from '../Firebase/Context';
import './style.css';
import background from '../../image/Account.png';

export default function Login(props) {

    // Value of input
    const datas = {
        mail: '',
        password: ''
    };

    // Get context
    const firebase = useContext(FirebaseContext);

    // Attribute state with object
    const [loginDatas, setLoginDatas] = useState(datas);

    // Error
    const [err, setError] = useState('');

    // Destructuring
    const { mail, password } = loginDatas;

    // Change the state with the new value
    const handleChange = (e) => {
        setLoginDatas({ ...loginDatas, [e.target.id]: e.target.value });
    };

    const handleSubmit = (e) => {
        e.preventDefault();

        // Send data to firebase
        firebase.loginUser(mail, password)
            .then(() => {
                // Redirection in Welcome componenent
                props.history.push('./welcome');

                // Reset datas
                setLoginDatas({ ...datas });

            })
            .catch((err) => {
                setError(err);
            })
    };

    const error = err !== '' && <span>{err.message}</span>;


    return (
        <div className="container">

            <form className="form" onSubmit={handleSubmit}>

                <div className="ctnr-form">
                    <h1 className="login">Se connecter</h1>

                    <div className="ctnr-input">

                        {error}

                        <input
                            type="text"
                            placeholder="email"
                            value={mail}
                            onChange={handleChange}
                            id="mail">
                        </input>

                        <input
                            type="password"
                            placeholder="Mot de passe"
                            value={password}
                            onChange={handleChange}
                            id="password">
                        </input>

                        <div>
                            <input
                                type="submit">
                            </input>

                            <Link to='signup'> Mot de passe oublié ?</Link>
                        </div>
                        <Link className="not-signup" to='signup'> Pas encore inscrit ? <span>S'inscrire</span>  </Link>
                    </div>
                </div>








            </form>


            <div className="ctnr-img">
                <img src={background}></img>
            </div>
        </div>
    )
}
