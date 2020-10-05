import React, { useContext } from 'react'
import orderContext from '../Context/ContextOrder';

import FirebaseContext from '../Firebase/Context';


export default function ValidateOrder() {

    const contextOrder = useContext(orderContext);

    // Get context
    const firebase = useContext(FirebaseContext);


    console.log(contextOrder)

    const handleClick = (e) => {
        e.preventDefault()
    }

    return (
        <div>
            <input type="button" onClick={handleClick}></input>
            <div>

            </div>
        </div>
    )
}
