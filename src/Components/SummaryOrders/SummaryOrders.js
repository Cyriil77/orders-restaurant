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

        let result = [];
        firebase.auth.onAuthStateChanged(user => {
            user ? setUserSession(user) : props.history.push('/')

            firebase.getUserOrder().where('uid', '==', user.uid).get().then(function (querySnapshot) {
                querySnapshot.forEach(doc => {


                    // Get all orders
                    const order = doc.data().futurOrder;
                    result.push(order);
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

            <>
                <Header email={userSession.email} />
                <section className="container-fluid min-height">
                    <h1 className="title-page">Récapitulatif</h1>
                    <hr />

                    {datas === null || datas === undefined ? <div>Vous n'avez effectué aucun achat</div> :

                        <>

                            <table className="table">

                                <thead className="thead-dark">
                                    <tr>
                                        <th scope="col">Date</th>
                                        <th scope="col">Nom</th>
                                        <th scope="col">Quantité</th>
                                        <th scope="col">Prix €</th>
                                        <th scope="col">Prix à l'unité €</th>
                                    </tr>
                                </thead>

                                <tbody>

                                    {datas.map((elem, key) => {

                                        // Get date of all datas
                                        let date = new Date(elem.date.seconds * 1000)
                                        const number = [0,1,2,3,4,5,6,7,8,9]
                                        let minutes;
                                        for (let i = 0; i < number.length; i++) {
                                            const element = number[i];
                                            if(date.getMinutes() === element){
                                                minutes = '0' + element

                                            }
                                            console.log(minutes)
                                        }
                                        
                                        return elem.obj.map((el, key) => {

                                            const price = el.quantity * el.price;


                                            return <tr className="test" key={key}>

                                                <th>
                                                    {date.getDate()}/
                                                    {date.getMonth() + 1}/
                                                    {date.getFullYear()}
                                                    à <strong>{date.getHours()}</strong>:
                                                    {minutes !== undefined ?<strong>{minutes}</strong> : <strong>{date.getMinutes()}</strong>}:
                                                    <strong>{date.getSeconds()}</strong></th>
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
                </section>

                <Footer />
            </>

        )
}
