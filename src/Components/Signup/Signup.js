import React, { useState } from 'react'

export default function Signup() {


    const datas = {
        mail: '',
        password: ''
    }

    // get datas for update it
    const [signupDatas, setSignupDatas] = useState(datas)


    const handleChange = e => {
        // Get all datas, cibling id, get value, update
        // cibling id: mail = mail / password = password
        setSignupDatas({...signupDatas, [e.target.id]: e.target.value})
    }

    return (
        <div>
            Signup
            <form>

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
                    type="button"
                    value="Valider">
                </input>

            </form>
        </div>
    )
}
