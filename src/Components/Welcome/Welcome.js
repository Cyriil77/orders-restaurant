import React, { useState, useContext, useEffect } from 'react';

import Orders from '../Orders/Orders';
import ValidateOrder from '../ValidateOrder/ValidateOrder';
import Header from '../Header/Header';
import Footer from '../Footer/Footer';

import './style.css'

// Firebase context (methods)
import FirebaseContext from '../Firebase/Context';

// Context order
import ContextOrder from '../ContextOrder/ContextOrder';




export default function Welcome(props) {

    // Function in context
    const firebase = useContext(FirebaseContext);

    // User Session
    const [userSession, setUserSession] = useState(null);

    // set datas about order from firabse
    const [order, setOrders] = useState([]);

    useEffect(() => {

        let listener = firebase.auth.onAuthStateChanged(user => {
            user ? setUserSession(user.email) : props.history.push('/');
        })

        firebase.displayOrder().get().then(querySnapshot => {

            const foundOrders = [];

            querySnapshot.forEach(doc => foundOrders.push(doc.data()));
            setOrders(foundOrders);

        }).catch(error =>
            console.log(error)
        );


        return () => {
            listener()
        }
    }, []);


    return userSession === null ? (

        <div>
            <p>Chargement ...</p>
        </div>

    ) : (
            <div>

                <Header email={userSession.email} />

                <h1 className="title-page">Choix de vos commandes</h1>
                <hr/>

                <section className="container-orders">

                    <ContextOrder.Provider value={[]}>

                        {/* send datas orders for the orders component */}
                        {order.map((datas, index, key) => (
                            <Orders key={datas.id} name={datas.nom} price={datas.prix} compositions={datas.compo} uid={userSession.uid} id={datas.id} />
                        ))}

                        <ValidateOrder />

                    </ContextOrder.Provider>

                </section>

                <Footer />

            </div>

        )

}
