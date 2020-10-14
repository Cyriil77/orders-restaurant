import React, { useContext, useState, useEffect } from 'react'
import orderContext from '../ContextOrder/ContextOrder';
import './style.css';
import { Link } from 'react-router-dom'

import FirebaseContext from '../Firebase/Context';
import Payment from '../Payment/Payment';


export default function ValidateOrder(props) {

    // Get context
    const contextOrder = useContext(orderContext);
    const firebase = useContext(FirebaseContext);

    const [userSession, setUserSession] = useState(null);
    const [array, setArray] = useState([])


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
        setArray(contextOrder)

        let obj;

        for (let i = 0; i < array.length; i++) {
            obj = array
            firebase.addOrder(userSession.uid, userSession.email, obj)
        }

    }





    return (
        <div className="">

            <Link to="payment"> Validé</Link>

            <form onSubmit={handleClick}>
            <input type="submit"></input>
            </form>
            

            {/* {array.map((datas, key) => (
                <ul key={datas.id}>
                    <li>{datas.name}</li>
                </ul>
            ))} */}

        </div>
    )
}
