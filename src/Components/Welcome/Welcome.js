import React, { useState, useContext, useEffect } from 'react';

import ValidateOrder from '../ValidateOrder/ValidateOrder';
import Header from '../Header/Header';
import Footer from '../Footer/Footer';

import './style.css'

// Firebase context (methods)
import FirebaseContext from '../Firebase/Context';

// Context order
import ContextOrder from '../ContextOrder/ContextOrder';
import SearchOrder from '../SearchOrder/SearchOrder';




export default function Welcome(props) {

    // Function in context
    const firebase = useContext(FirebaseContext);

    // User Session
    const [userSession, setUserSession] = useState(null);

    // set datas about order from firabse
    const [order, setOrders] = useState([]);

    useEffect(() => {

        firebase.auth.onAuthStateChanged(user => {
            user ? setUserSession(user) : props.history.push('/');
        })

        firebase.displayOrder().get().then(querySnapshot => {

            const foundOrders = [];

            querySnapshot.forEach(doc => foundOrders.push(doc.data()));
            setOrders(foundOrders);

        }).catch(error =>
            console.log(error)
        );

    }, [userSession]);


    return userSession === null ? (

        <div>
            <p>Chargement ...</p>
        </div>

    ) : (
            <>

                <Header email={userSession.email} />

                <main className="container-fluid">

                    <h1 className="title-page">Choix de vos commandes</h1>
                    <hr/>

                    <ContextOrder.Provider value={[]}>

                        <SearchOrder datas={order} />

                        <ValidateOrder />

                    </ContextOrder.Provider>

                </main>

                <Footer />

            </>

        )

}
