import React, { useContext, useState, useEffect } from 'react';

import Header from '../Header/Header';
import Footer from '../Footer/Footer';

import FirebaseContext from '../Firebase/Context';

import './style.css'

export default function SummaryOrders(props) {

    const firebase = useContext(FirebaseContext);

    const [userSession, setUserSession] = useState(null);
    const [datas, setDatas] = useState(null);

    useEffect(() => {

        let result = []
        firebase.auth.onAuthStateChanged(user => {
            user ? setUserSession(user) : props.history.push('/')

            firebase.getUserOrder().where('uid', '==', user.uid).get().then(function (querySnapshot) {
                querySnapshot.forEach(doc => {


                    // Get all orders
                    const order = doc.data().futurOrder
                    result.push(order)
                })

            }).then(() => {

                result.forEach((el) => {
                    setDatas(el);
                })

            })

        })


    }, [userSession]);

    return userSession === null ? (
        <div>
            <p>Chargement...</p>
        </div>
    ) : (
            <div>

                <Header email={userSession.email} />

                <h2>Récapitulatif</h2>

                {datas === null ? <div>Chargement ...</div> :

                    <>

                        <table>

                            <thead>
                                <tr>
                                    <th>Date</th>
                                    <th>Nom</th>
                                    <th>Quantité</th>
                                    <th>Prix</th>
                                    <th>Prix à l'unité</th>
                                </tr>
                            </thead>

                            <tbody>

                                {datas.map((elem, key) => {

                                    // Get date of all datas
                                    let date = new Date(elem.date.seconds * 1000)

                                    
                                    return elem.obj.map((el, key) => {

                                        const price = el.quantity * el.price

                                        return <tr className="test" key={key}>

                                            <td>{date.getDate()}/{date.getMonth() + 1}/{date.getFullYear()} à {date.getHours()}:{date.getMinutes()}:{date.getSeconds()}</td>
                                            <td>{el.name}</td>
                                            <td>{el.quantity}</td>
                                            <td>{price}</td>
                                            <td>{el.price}</td>

                                        </tr>

                                    })

                                })}

                            </tbody>
                            
                        </table>

                    </>

                }

                <Footer />

            </div>

        )
}
