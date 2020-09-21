import React, { useState, useContext, useEffect } from 'react';
import FirebaseContext from '../Firebase/Context';

export default function Welcome(props) {

    const firebase = useContext(FirebaseContext);
    const [userSession, setUserSession] = useState(null)

    const [a, setA] = useState({})


    useEffect(() => {

        let listener = firebase.auth.onAuthStateChanged(user => {
            user ? setUserSession(user.uid) : props.history.push('/');
        })

        return () => {
            listener()
        }
    }, []);


    // useEffect(() => {

    //     let listener = firebase.displayOrder().get().then((querySnapshot) => {
    //         querySnapshot.forEach((doc) => {
    //             const myData = doc.data()
    //             setA(myData)

    //         });
    //     });

    //     return () => {
    //         listener()
    //     }
    // }, []);


    return userSession === null ? (
        <div><p>Loading</p></div>
    ) : (
            <div>
                Welcome {userSession.email}
                <button onClick={firebase.signoutUser}>Se déconnecter</button>

            </div>
        )

}
