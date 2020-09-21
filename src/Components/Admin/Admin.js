import React, { useState, useContext, useEffect } from 'react';
import FirebaseContext from '../Firebase/Context';


export default function Admin(props) {

    // Value input
    const datas = {
        name: '',
        price: '',
        compositions: ''
    };

    // Get context
    const firebase = useContext(FirebaseContext);

    // State
    const [orders, setOrders] = useState(datas);

    const [userSession, setUserSession] = useState(null);

    // Destructuring
    const { name, price, compositions } = orders;



    const handleSubmit = (e) => {
        e.preventDefault();

        // Add orders in firebase
        firebase.setOrders(name, price, compositions);

        // Reset inputs
        setOrders({ ...datas });
    }

    // Change state
    const handleChange = (e) => {
        setOrders({ ...orders, [e.target.id]: e.target.value });
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

    return (
        <div>
            <p>Ajouter un plat</p>
            <form onSubmit={handleSubmit}>

                <label>Nom du plat</label>
                <input type="text"
                    placeholder="pate boulo"
                    id="name"
                    value={name}
                    onChange={handleChange}>
                </input>

                <label>Prix</label>
                <input type="number"
                    placeholder="10"
                    id="price"
                    value={price}
                    onChange={handleChange}>
                </input>

                <label>Composition</label>
                <input type="text"
                    placeholder="pate, bolognaise, oignons"
                    id="compositions"
                    value={compositions}
                    onChange={handleChange}>
                </input>

                <input type="submit"></input>

                <button
                    onClick={firebase.signoutUser}>
                    Se déconnecter
                </button>
            </form>
        </div>
    )
}
