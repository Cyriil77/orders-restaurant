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

            // Get actual user
            firebase.getUserOrder().where('uid', '==', user.uid).get().then(function (querySnapshot) {
                querySnapshot.forEach(doc => {

                    if (doc.data().futurOrder[doc.data().futurOrder.length - 1].isPay === false) {
                        const lastOrder = doc.data().futurOrder[doc.data().futurOrder.length - 1];
                        result = lastOrder;
                    }


                })

            }).then(() => {
                setDatas(result);
            })

        })


    }, [userSession]);


    const userPayment = () => {

        console.log(datas)

        //deleteId is the id from the post you want to delete

        firebase.getUserOrder().where('uid', '==', userSession.uid).get().then(function (querySnapshot) {
            querySnapshot.forEach(doc => {

                const futurOrder = doc.data().futurOrder;
                const idToDelete = datas.id
                console.log(idToDelete)

                firebase.getUserOrder().doc(userSession.uid).update({
                    futurOrder: futurOrder.filter(post => post.id !== idToDelete)
                })
                    .catch(function (error) {
                        console.error("Error removing document: ", error);
                    });

            })

        })

        firebase.getUserOrder().doc(userSession.uid).update({

            futurOrder: firebase.addInArray().arrayUnion({
                isPay: true,
                date: datas.date,
                obj: datas.obj
            })
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

                <hr />

                {datas === null ? <div>Chargement ...</div> :

                    <section className="container-commande">
                        <div className="container-datas-btn">
                            {datas !== undefined ?
                                <div>
                                    <p>Vérification de votre commande:</p>
                                    <ul>
                                        {datas.obj.map((elem, key) => {
                                            return <li> {elem.quantity} {elem.name} </li>
                                        })}
                                    </ul>
                                </div>
                                : <p>Vous n'avez aucune commande</p>}

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