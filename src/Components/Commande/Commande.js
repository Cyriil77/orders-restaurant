import React, { useContext, useState, useEffect } from 'react';
import { Link } from 'react-router-dom';

import Header from '../Header/Header';
import Footer from '../Footer/Footer';
import './style.css'

// Firebase context (methods)
import FirebaseContext from '../Firebase/Context';

export default function Payment(props) {

    const firebase = useContext(FirebaseContext);

    // User datas
    const [userSession, setUserSession] = useState(null);

    // Last order
    const [datas, setDatas] = useState(null);

    // Verify Session
    useEffect(() => {

        let result;

        firebase.auth.onAuthStateChanged(user => {
            user ? setUserSession(user) : props.history.push('/');

            firebase.getUserOrder().where('uid', '==', user.uid).get().then(function (querySnapshot) {
                querySnapshot.forEach(doc => {

                    // Get last order for display it before the payment
                    const lastOrder = doc.data().futurOrder[doc.data().futurOrder.length - 1];
                    result = lastOrder;

                })

            }).then(() => {
                setDatas(result);
            })
            
        })


    }, [userSession]);


    const userPayment = () => {

        firebase.getUserOrder().doc(userSession.uid).update({
            isPay : true
        })

    };


    return userSession === null ? (

        <div>
            <p>Chargement</p>
            </div>
        ) : (
        <div>

            <Header email={userSession.email} />

            <h1>Commande</h1>

            {datas === null ? <div>Chargement ...</div> :

                <>
                {/* Display datas about last order */}
                    {datas.obj.map((elem, key) => {
                        return <div key={key}> Vous avez commandé: {elem.quantity} {elem.name} </div>
                    })}

                    <button onClick={userPayment}>Valider le payement</button>

                    <Link to="welcome">Revenir à mes choix</Link>
                </>

            }

            <Footer />

        </div>
    )
}