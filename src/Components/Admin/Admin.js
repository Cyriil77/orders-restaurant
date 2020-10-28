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
    const [isDisabled, setIsDisabled] = useState(true);
    const input = document.querySelector('.send-datas');




    const handleSubmit = (e) => {
        e.preventDefault();

        let datas;

        firebase.displayOrder().orderBy('id', 'desc').limit(1).get().then(querySnapshot => {
            querySnapshot.forEach((doc) =>
                datas = doc.data().id
            )

            firebase.setMenu(name, price, compositions, datas + 1);


        }).catch(error => console.log(error));

        // Reset inputs
        setOrders({ ...datas });
    }

    // Change state
    const handleChange = (e) => {
        setOrders({ ...orders, [e.target.id]: e.target.value });
        if (name !== '' && price !== '' && compositions !== '') {
            setIsDisabled(false);
            input.style.color = '#665df5';
        } else if (isDisabled === false) {
            input.style.removeProperty('color');
            setIsDisabled(true);

        }
    };


    useEffect(() => {

        firebase.auth.onAuthStateChanged(user => {
            user ? setUserSession(user) : props.history.push('/');
        })
    }, [userSession]);



    return userSession === null ? (
        <div>
            <p>Chargement...</p>
        </div>
    ) : (
            <>
                <Header email={userSession.email} />
                <main className="container-fluid min-height">
                    <h1 className="title-page">Ajouter un plat</h1>
                    <hr />

                    <div className="d-flex justify-content-center align-items-center col-xl-12 col-lg-12 col-md-10 col-sm-10 col-12">
                        <form class="text-center border border-light col-xl-6 col-lg-12 col-md-10 col-sm-10 col-12 p-5" action="#!">

                            <label>Nom du plat:</label>
                            <input type="text"
                                placeholder="pate boulo"
                                id="name"
                                value={name}
                                onChange={handleChange}
                                className="form-control mb-4">
                            </input>
                            <label>Prix:</label>
                            <input type="number"
                                placeholder="10"
                                id="price"
                                value={price}
                                onChange={handleChange}
                                min="0"
                                className="form-control mb-4">
                            </input>


                            <label>Compositions:</label>
                            <input type="text"
                                placeholder="pate, bolognaise, oignons"
                                id="compositions"
                                value={compositions}
                                onChange={handleChange}
                                className="form-control mb-4">
                            </input>

                            <input type="submit" disabled={isDisabled} class="btn btn-info btn-block" value="Valider"></input>


                        </form>
                    </div>
                </main>
                <Footer />
            </>
        )
}


