import React, { useContext, useState } from 'react';
import { Link } from 'react-router-dom'
import FirebaseContext from '../Firebase/Context';

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
            setLoginDatas({...datas});
            
        })
        .catch((err) => {
            setError(err);
        })
    };

    const error = err !== '' && <span>{err.message}</span>;


    return (
        <div>
            {error}
            <form onSubmit={handleSubmit}>
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

                <input
                    type="submit">
                </input>

            </form>
            <Link to='signup'> S'inscrire </Link>
        </div>
    )
}
