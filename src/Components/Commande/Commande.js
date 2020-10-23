import React, { useContext, useState, useEffect } from 'react';
import { Link } from 'react-router-dom';

import Header from '../Header/Header';
import Footer from '../Footer/Footer';

import background from '../../image/Payment.png'
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
            isPay: true
        })

    };


    return userSession === null ? (

        <div>
            <p>Chargement ...</p>
        </div>
    ) : (
            <>
                <Header email={userSession.email} />

                <h1 className="title-page">Commande</h1>

                <hr/>

                {datas === null ? <div>Chargement ...</div> :

                    <section className="container-commande">
                        <div className="container-datas-btn">
                            <div>
                                <p>Vérification de votre commande:</p>
                                <ul>
                                    {datas.obj.map((elem, key) => {
                                        return <li> {elem.quantity} {elem.name} </li>
                                    })}
                                </ul>
                            </div>

                            <div className="btn-validate-come-back">
                                <button className="btn-payment" onClick={userPayment}>Procéder au payement</button>

                                <Link className="btn-payment" to="welcome">Revenir à mes choix</Link>
                            </div>
                        </div>
                        <div className="img-commande">
                            <img src={background}></img>
                        </div>

                    </section>

                }

                <Footer />
            </>
        )
}