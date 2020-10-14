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
            })
            .catch((err) => {
                setErr(err);
            })
    }



    return (
        <div className="container">



            {error}
            <form className="form" onSubmit={handleSubmit}>

                <div className="ctnr-form">
                    <h1 className="login">S' inscrire</h1>

                    <div className="ctnr-input">
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
                        <Link className="not-signup" to='login'> Déjà insrit ? <span>Se connecter</span>  </Link>
                    </div>
                </div>








            </form>


            <div className="ctnr-img">
                <img src={background}></img>
            </div>
        </div>
    )
}
