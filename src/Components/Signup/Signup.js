import React, { useState, useContext } from 'react';
import FirebaseContext from "../Firebase/Context";


export default function Signup() {


    const signupAuthContext = useContext(FirebaseContext);
    
    const datas = {
        mail: '',
        password: ''
    };

    // get datas for update it
    const [signupDatas, setSignupDatas] = useState(datas);


    const handleChange = e => {
        // Get all datas, cibling id, get value, update
        // cibling id: mail = mail / password = password
        setSignupDatas({...signupDatas, [e.target.id]: e.target.value});
    }

    const handleSubmit = (e) => {
        e.preventDefault();
        signupAuthContext.signupUser(signupDatas.mail, signupDatas.password)
    }

    return (
        <div>
            Signup
            <form onSubmit={handleSubmit}>

                <input
                    type="text"
                    placeholder="email"
                    onChange={handleChange}
                    id="mail">
                </input>

                <input
                    type="password"
                    placeholder="Mot de passe"
                    onChange={handleChange}
                    id="password">
                </input>

                <input
                    type="submit">
                </input>

            </form>
        </div>
    )
}
