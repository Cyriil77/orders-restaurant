import React, { useState, useContext } from 'react';
import { Link } from 'react-router-dom'

import FirebaseContext from "../Firebase/Context";

import './style.css';

import background from '../../image/Account.png';


export default function Signup(props) {

    // Get functions with context
    const firebase = useContext(FirebaseContext);

    // Datas for 2 inputs
    const datas = {
        mail: '',
        password: ''
    };

    // get datas for update it
    const [signupDatas, setSignupDatas] = useState(datas);

    // Error
    const [err, setErr] = useState('');

    // Destructuring -> mail and password is in object datas
    const { mail, password } = signupDatas;

    // detect if string is empty else display the errors
    const error = err !== '' && <span>{err.message}</span>;


    const handleChange = (e) => {

        // Get all datas, cibling id, get value, update
        // cibling id: mail = mail / password = password with the new value
        setSignupDatas({ ...signupDatas, [e.target.id]: e.target.value });
    }

    const handleSubmit = (e) => {
        e.preventDefault();

        firebase.signupUser(mail, password)
            .then((result) => {
                setSignupDatas({ ...datas });

                // Add user on database
                firebase.setUserId(result.user.uid, result.user.email, result.user.uid)
                props.history.push('/login')
            })
            .catch((err) => {
                setErr(err);
            })
    }



    return (

        <div className="container-fluid">
            <div className="row">

                <form className="form d-flex flex-column justify-content-center align-items-center col-xl-6 col-lg-6 col-md-12 col-sm-12" onSubmit={handleSubmit}>
                    <div className="ctnr-form shadow col-xl-10 col-lg-12 col-md-10 col-sm-10 col-12">

                        <h1 className="login">S' inscrire</h1>

                        {error !== false ? <div className="alert alert-danger" role="alert">
                            {error}
                        </div> : null}


                        <div className="ctnr-input d-flex flex-column col-xl-10 col-lg-10 col-md-8 col-sm-10 col-12">
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
                                    type="submit"
                                    className="btn btn-secondary">
                                </input>

                                <Link className="my-3" to='login'> Déjà insrit ? <span>Se connecter</span>  </Link>
                            </div>

                        </div>
                    </div>
                </form>


                <div className="col-xl-6 col-lg-6 col-md-12 col-sm-12">
                    <img src={background}></img>
                </div>
            </div>
        </div>
    )
}