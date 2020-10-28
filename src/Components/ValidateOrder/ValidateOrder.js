import React, { useContext, useState, useEffect } from 'react'
import { Link } from 'react-router-dom'

import orderContext from '../ContextOrder/ContextOrder';
import FirebaseContext from '../Firebase/Context';

import './style.css'

export default function ValidateOrder(props) {

    const contextOrder = useContext(orderContext);
    const firebase = useContext(FirebaseContext);

    const [userSession, setUserSession] = useState(null);
    const [datas, setDatas] = useState(null);
    // const [isDisabled, setIsDisabled] = useState(true);


    useEffect(() => {
        let result = [];

        firebase.auth.onAuthStateChanged(user => {
            user ? setUserSession(user) : props.history.push('/');

            firebase.getUserOrder().doc(user.uid).get().then(querySnapshot => {

                // If 0 order is push set datas = null
                if (querySnapshot.data().futurOrder == undefined) {
                    return;
                } else {
                    result.push(querySnapshot.data().futurOrder[0].obj);
                }
            }).then(() => {
                result.forEach(element => {
                    setDatas(element);
                });
            }).catch(err => {
                console.log(err)
            })
        })
    }, [userSession]);




    const handleClick = () => {
        let lastId;

        if (datas === null) {
            firebase.addOrder(userSession.uid, userSession.email, contextOrder)
        } else {
            firebase.getUserOrder().doc(userSession.uid).get().then(querySnapshot => {
                lastId = querySnapshot.data().futurOrder[querySnapshot.data().futurOrder.length - 1].id
            }).then(() => {
                firebase.getUserOrder().doc(userSession.uid).update({

                    futurOrder: firebase.addInArray().arrayUnion({
                        id: lastId + 1,
                        isPay: false,
                        date: new Date(),
                        obj: contextOrder
                    })

                })
            }).catch(err => {
                console.log(err)
            })
        }
    }

    const div = document.querySelectorAll('.ctnr-datas')
    if (div.length % 3 === 0) {
        const hr = document.createElement('hr')
    }

    return (
        <>

            <div className="validate-order">
                <hr className="line-validate" />
                <Link className="btn btn-outline-success" to="commande" onClick={handleClick}>Valider votre commande</Link>


            </div>
        </>
    )
}
