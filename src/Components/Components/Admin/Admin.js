import React, { useState, useContext, useEffect } from 'react';
import FirebaseContext from '../Firebase/Context';

import Header from '../Header/Header';
import Footer from '../Footer/Footer';
import './style.css'


export default function Admin(props) {

    // Get context
    const firebase = useContext(FirebaseContext);

    // Value input
    const datas = {
        name: '',
        price: '',
        compositions: ''
    };

    // State
    const [orders, setOrders] = useState(datas);

    // Destructuring
    const { name, price, compositions } = orders;

    const [userSession, setUserSession] = useState(null);
    const input = document.querySelector('.send-datas')




    const handleSubmit = (e) => {
        e.preventDefault();

        let datas;

        firebase.displayOrder().orderBy('id', 'desc').limit(1).get().then(querySnapshot => {
            querySnapshot.forEach((doc) =>
                datas = doc.data().id
            )

            // Add orders in firebase
            if({...datas} == ""){
                console.log('vide')
            }
            // firebase.setMenu(name, price, compositions, datas + 1)


        }).catch(error => console.log(error));

        // Reset inputs
        setOrders({ ...datas });
    }

    // Change state
    const handleChange = (e) => {
        setOrders({ ...orders, [e.target.id]: e.target.value });
        if (name !== '' && price !== '' && compositions !== '') {
            input.removeAttribute('disabled');
            input.style.color = '#665df5';
        }
    };

    // Verify Session
    useEffect(() => {

        let listener = firebase.auth.onAuthStateChanged(user => {
            user ? setUserSession(user) : props.history.push('/');
        })

        return () => {
            listener();
        }
    }, [userSession]);



    return userSession === null ? (
        <div>
            <p>Chargement...</p>
        </div>
    ) : (
        <>
            <Header email={userSession.email}/>
            <div>
                <h1 className="title-page">Ajouter un plat</h1>
                <hr />

                <form className="form-admin" onSubmit={handleSubmit}>

                    <div>
                        <label>Nom du plat:</label>
                        <input type="text"
                            placeholder="pate boulo"
                            id="name"
                            value={name}
                            onChange={handleChange}>
                        </input>

                        <label>Prix:</label>
                        <input type="number"
                            placeholder="10"
                            id="price"
                            value={price}
                            onChange={handleChange}
                            min="0">
                        </input>

                        <label>Compositions:</label>
                        <input type="text"
                            placeholder="pate, bolognaise, oignons"
                            id="compositions"
                            value={compositions}
                            onChange={handleChange}>
                        </input>

                        <input disabled className="send-datas" type="submit"></input>

                    </div>

                </form>
            </div>
            <Footer />
        </>
    )
}
