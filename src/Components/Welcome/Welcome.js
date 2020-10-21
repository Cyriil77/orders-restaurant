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
            user ? setUserSession(user) : props.history.push('/');
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

                <ContextOrder.Provider value={[]}>

                    <div className="container-orders">

                        {/* send datas orders for the orders component */}
                        {order.map((datas, index, key) => (
                            <Orders key={datas.id} name={datas.nom} price={datas.prix} compositions={datas.compo} uid={userSession.uid} id={datas.id} />
                        ))}

                    </div>

                    <ValidateOrder />

                </ContextOrder.Provider>

                <Footer />

            </div>

        )

}
