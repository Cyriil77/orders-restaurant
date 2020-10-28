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

            }).catch((err) => {
                setError(err);
            })
    };

    const error = err !== '' && <span>{err.message}</span>;
    console.log(error)

    return (
        <div className="container-fluid">
            <div className="row">

                <form className="form d-flex flex-column justify-content-center align-items-center
                    col-xl-6
                    col-lg-6
                    col-md-12
                    col-sm-12"
                    onSubmit={handleSubmit}
                >

                    <div className="ctnr-form shadow
                        col-xl-10
                        col-lg-12
                        col-md-10
                        col-sm-10 my-sm-4
                        col-12 my-3"
                    >

                        <h1 className="login">Se connecter</h1>

                        {error !== false ? <div className="alert alert-danger" role="alert">
                            {error}
                        </div> : null}


                        <div className="ctnr-input d-flex flex-column
                            col-xl-10
                            col-lg-10
                            col-md-8
                            col-sm-10
                            col-12"
                        >
                            <label for="email"><strong>E-mail:</strong></label>
                            <input
                                type="text"
                                placeholder="email"
                                value={mail}
                                onChange={handleChange}
                                id="mail"
                            >
                            </input>

                            <label className="mt-4" for="password"><strong>Mot de passe:</strong> </label>
                            <input
                                type="password"
                                placeholder="Mot de passe"
                                value={password}
                                onChange={handleChange}
                                id="password"
                                className="mb-4">
                            </input>

                            {/* sm-d-flex sm-flex-column sm-align-items-start */}
                            <div className="justify-content-between d-flex ">
                                <input
                                    className="btn btn btn-secondary"
                                    type="submit">
                                </input>

                                <Link className="my-3" to='signup'> Mot de passe oublié ?</Link>
                            </div>
                            <Link className="my-3" to='signup'> Pas encore inscrit ? <span>S'inscrire</span>  </Link>
                        </div>
                    </div>
                </form>


                <div className="d-none d-lg-block
                    col-xl-6
                    col-lg-6
                    col-md-12
                    col-sm-12"
                >
                    <img src={background}></img>
                </div>
            </div>
        </div>
    )
}
