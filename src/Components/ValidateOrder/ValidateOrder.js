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
    const [datas, setDatas] = useState(null)


    // // Verify Session
    // useEffect(() => {

    //     let listener = firebase.auth.onAuthStateChanged(user => {
    //         user ? setUserSession(user) : props.history.push('/');
    //     })

    //     return () => {
    //         listener();
    //     }
    // }, [userSession]);

    useEffect(() => {

        let result = []
        firebase.auth.onAuthStateChanged(user => {
            user ? setUserSession(user) : props.history.push('/')

            firebase.getUserOrder().where('uid', '==', user.uid).get().then(function (querySnapshot) {
                querySnapshot.forEach(doc => {
                    result.push(doc.data().futurOrder[0].obj)
                })
            }).then(() => {
                result.forEach(element => {
                    setDatas(element)
                });
            })
        })


    }, [userSession]);



    const handleClick = () => {
        datas === null ? firebase.addOrder(userSession.uid, userSession.email, contextOrder) : firebase.getUserOrder().doc(userSession.uid).update({
            futurOrder: firebase.test1().arrayUnion({
                date: new Date(),
                obj: contextOrder
            })
        })
        
    }



    return (
        <div className="validate-order">

            <Link to="commande" onClick={handleClick}>Validé</Link>


        </div>
    )
}
