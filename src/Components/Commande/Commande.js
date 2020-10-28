import React, { useContext, useState, useEffect } from 'react';
import { Link } from 'react-router-dom';

import Header from '../Header/Header';
import Footer from '../Footer/Footer';

import background from '../../image/Payment.png'
import './style.css'

// Firebase context (methods)
import FirebaseContext from '../Firebase/Context';

export default function Commande(props) {

    const firebase = useContext(FirebaseContext);

    // User datas
    const [userSession, setUserSession] = useState(null);

    // Last order
    const [datas, setDatas] = useState(null);

    // Verify Session
    useEffect(() => {

        firebase.auth.onAuthStateChanged(user => {
            user ? setUserSession(user) : props.history.push('/');

            // Get actual user
            firebase.getUserOrder().doc(user.uid).get().then(function (querySnapshot) {

                if (querySnapshot.data() !== undefined) {
                    if (querySnapshot.data().futurOrder.length > 1) {
                        const lastOrder = querySnapshot.data().futurOrder[querySnapshot.data().futurOrder.length - 1];
                        // console.log('> 1 ', lastOrder)
                        setDatas(lastOrder);
                    } else if (querySnapshot.data().futurOrder.length === 1) {
                        const lastOrder = querySnapshot.data().futurOrder[0]
                        // console.log('=== 1 ', lastOrder)
                        setDatas(lastOrder);
                    }
                }
            })
        })
    }, [userSession]);



    const userPayment = () => {

        firebase.getUserOrder().where('uid', '==', userSession.uid).get().then(function (querySnapshot) {
            querySnapshot.forEach(doc => {

                const futurOrder = doc.data().futurOrder;
                const idToDelete = datas.id

                firebase.getUserOrder().doc(userSession.uid).update({
                    futurOrder: futurOrder.filter(getId => getId.id !== idToDelete)
                })
            })

        }).then(() => {

            firebase.getUserOrder().doc(userSession.uid).update({

                futurOrder: firebase.addInArray().arrayUnion({
                    id: datas.id,
                    isPay: true,
                    date: datas.date,
                    obj: datas.obj
                })
            })
                .then(() => {
                    props.history.push('./summaryOrders');
                }).then(() => {
                    alert('Votre paiement a bien été effectué');
                })
        })

    };

    const deleteLastOrderUserWrong = () => {
        firebase.getUserOrder().doc(userSession.uid).get().then(function (querySnapshot) {

                console.log(querySnapshot.data())
                if (querySnapshot.data().futurOrder.length > 1) {
                    const futurOrder = querySnapshot.data().futurOrder;
                    const idToDelete = datas.id

                    firebase.getUserOrder().doc(userSession.uid).update({
                        futurOrder: futurOrder.filter(getId => getId.id !== idToDelete)
                    }).then(() => {
                        console.log('Update')
                    }).catch(function (error) {
                        console.error("Error removing document: ", error);
                    });
                } else if(querySnapshot.data().futurOrder.length === 1) {
                    firebase.getUserOrder().doc(userSession.uid).delete().then(function () {
                        console.log("Document successfully deleted!");
                    }).catch(function (error) {
                        console.error("Error removing document: ", error);
                    });

                }



        }).catch(function (error) {
            console.error(error);
        });
    }

    console.log(datas)
    return userSession === null ? (

        <div>
            <p>Chargement ...</p>
        </div>
    ) : (
            <>
                <Header email={userSession.email} />

                <main className="container-fluid min-height">
                    <h1 className="title-page">Commande</h1>

                    <hr />



                    <section className="row">

                        <div className="d-xl-flex align-items-xl-center my-4
                            col-xl-6
                            col-lg-6
                            col-md-6
                            col-sm-12"
                        >

                            <div className="card shadow p-4 col-xl-10 col-lg-12 col-md-12">


                                {/* Verify if datas is in wait of payment */}
                                {datas !== null && datas.isPay === false ?
                                    <>
                                        <div className="card-body">
                                            <h5 className="card-title">Vérification de votre commande:</h5>
                                            <ul className="card-text">
                                                {datas.obj.map((elem, key) => {
                                                    return <li key={key}> {elem.quantity} {elem.name} </li>
                                                })}
                                            </ul>
                                        </div>
                                        <div className="d-flex flex-column w-75">
                                            <input type="button" className="btn btn-outline-success my-2" value="Procéder au paiement" onClick={userPayment}></input>
                                            <Link className="btn btn-outline-secondary" onClick={deleteLastOrderUserWrong} to="welcome">Revenir à mes choix</Link>
                                        </div>
                                    </>

                                    : <>
                                        <p>Vous n'avez aucune commande</p>
                                        <Link className="btn btn-outline-secondary" to="welcome">Revenir à mes choix</Link>
                                    </>
                                }

                            </div>
                        </div>
                        <div className="d-none d-md-block
                            col-xl-6
                            col-lg-6
                            col-md-6
                            col-sm-12"
                        >
                            <img src={background}></img>
                        </div>

                    </section>

                </main>

                <Footer />
            </>
        )
}