import React, { useState, useContext, useEffect } from 'react';

import Orders from '../Orders/Orders';
import ValidateOrder from '../ValidateOrder/ValidateOrder';

// Firebase context (methods)
import FirebaseContext from '../Firebase/Context';

// Context order
import ContextOrder from '../Context/ContextOrder';




export default function Welcome(props) {

    const firebase = useContext(FirebaseContext);

    const [userSession, setUserSession] = useState(null);
    const [order, setOrders] = useState([]);

    useEffect(() => {

        let listener = firebase.auth.onAuthStateChanged(user => {
            user ? setUserSession(user.uid) : props.history.push('/');
        })

        firebase.displayOrder().get()
            .then(querySnapshot => {
                const foundOrders = [];
                querySnapshot.forEach(doc => foundOrders.push(doc.data()));
                setOrders(foundOrders);
            })
            .catch(error => console.log(error));


        return () => {
            listener()
        }
    }, []);


    return userSession === null ? (
        <div><p>Loading</p></div>
    ) : (
            <div>
                Welcome {userSession.email}
                <button onClick={firebase.signoutUser}>Se déconnecter</button>

                <ContextOrder.Provider value={[]}>
                    {order.map((datas, index) => (
                        <Orders name={datas.nom} price={datas.prix} compositions={datas.compo} uid={userSession} id={datas.id} />
                    ))}
                    <ValidateOrder />
                </ContextOrder.Provider>
            </div>

        )

}
