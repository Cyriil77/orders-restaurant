import React, { useContext, useState, useEffect } from 'react'
import { Link } from 'react-router-dom'

import orderContext from '../ContextOrder/ContextOrder';
import FirebaseContext from '../Firebase/Context';

import './style.css'

export default function ValidateOrder(props) {

    // Get context
    const contextOrder = useContext(orderContext);
    const firebase = useContext(FirebaseContext);

    const [userSession, setUserSession] = useState(null);
    const [datas, setDatas] = useState(null)


    useEffect(() => {

        let result = [];

        firebase.auth.onAuthStateChanged(user => {
            user ? setUserSession(user) : props.history.push('/');

            firebase.getUserOrder().where('uid', '==', user.uid).get().then(function (querySnapshot) {

                querySnapshot.forEach(doc => {
                    // If 0 order is push set datas = null
                    result.push(doc.data().futurOrder[0].obj);
                })

            })

                .then(() => {

                    result.forEach(element => {
                        setDatas(element);
                    });

                })

        })


    }, [userSession]);



    const handleClick = () => {

        // Verify is datas exist else push in firebase
        datas === null ? firebase.addOrder(userSession.uid, userSession.email, contextOrder) : firebase.getUserOrder().doc(userSession.uid).update({

            futurOrder: firebase.addInArray().arrayUnion({
                isPay: false,
                date: new Date(),
                obj: contextOrder
            })

        })

    }

    return (
        <>
            <hr />
            <div className="validate-order">

                <Link to="commande" onClick={handleClick}>Valider votre commande</Link>

            </div>
        </>
    )
}
