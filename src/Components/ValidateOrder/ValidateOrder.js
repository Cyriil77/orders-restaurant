import React, { useContext, useState } from 'react'
import orderContext from '../Context/ContextOrder';

import FirebaseContext from '../Firebase/Context';


export default function ValidateOrder() {

    const contextOrder = useContext(orderContext);

    // Get context
    const firebase = useContext(FirebaseContext);

    const [orderDatas, setOrderDatas] = useState([{}])




    const handleClick = (e) => {
        e.preventDefault()
       setOrderDatas(contextOrder)
       console.log(orderDatas)
    }

    return (
        <div>
            <input type="button" value={"Valider"} onClick={handleClick}></input>

        </div>
    )
}
