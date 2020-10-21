import React, { useContext, useState, useEffect } from 'react';
import Header from '../Header/Header';
import Footer from '../Footer/Footer';
import FirebaseContext from '../Firebase/Context';

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
                    const order = doc.data().futurOrder
                    result.push(order)
                })
            }).then(() => {
                result.forEach((el) => {
                    setDatas(el)
                })
            })
        })


    }, [userSession]);

    return (
        <div>
            <Header />
            <h2>Récapitulatif</h2>

            { datas === null ?
                <div>Chargement ...</div>
                :
                <>
                    {datas.map((elem, key) => {
                           return <div className="test" key={key}>
                               
                                <hr/>
                                {elem.obj.map((el, key) => {
                                   return <p key={key}>{el.name}</p>
                                })}
                            </div>

                    })}
                </>
            }

            <Footer />
        </div>
    )
}
