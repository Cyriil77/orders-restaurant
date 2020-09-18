// import React, { useState } from 'react'
// import * as firebase from 'firebase/app';
// import '../Database/Database'
// import 'firebase/firebase-auth';
// import 'firebase/firebase-firestore';
// export default function Login() {

//     const [email, setEmail] = useState('');
//     const [password, setPassword] = useState('');

//     const login = (e) => {
//         e.preventDefault()
//         firebase.auth().signInWithEmailAndPassword(email, password).then((result) => {
//             console.log(result)
//         }).catch((error) => {
//             let errorCode = error.code;
//             let errorMessage = error.message;

//         });
//     }
//     return (
//         <div>
//             <h2>Se connecter</h2>
//             <form>
//                 <input type="text"
//                     placeholder="Adresse mail"
//                     value={email}
//                     onChange={e => setEmail(e.target.value)}>
//                 </input>

//                 <input type="password"
//                     placeholder="Mot de passe"
//                     value={password}
//                     onChange={e => setPassword(e.target.value)}></input>

//                 <input type="button" value="Valider" onClick={login}></input>
//             </form>
//         </div>
        
//     )
// }

import React from 'react'

export default function Login() {
    return (
        <div>
            Login
        </div>
    )
}
