import React, { useContext, useState, useEffect } from 'react'
import orderContext from '../ContextOrder/ContextOrder';
import './style.css';
import { Link } from 'react-router-dom'

import FirebaseContext from '../Firebase/Context';
import './style.css'

export default function ValidateOrder(props) {

    // Get context
    const contextOrder = useContext(orderContext);
    const firebase = useContext(FirebaseContext);

    const [userSession, setUserSession] = useState(null);



    // Verify Session
    useEffect(() => {

        let listener = firebase.auth.onAuthStateChanged(user => {
            user ? setUserSession(user) : props.history.push('/');
        })

        return () => {
            listener();
        }
    }, [userSession]);



    const handleClick = (e) => {
        e.preventDefault()

        firebase.addOrder(userSession.uid, userSession.email, contextOrder);

    }





    return (
        <div className="validate-order">

            <input type="button" value="Validé" onClick={handleClick}/>

        </div>
    )
}
