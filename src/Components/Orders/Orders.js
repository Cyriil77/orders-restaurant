import React, { useState, useContext } from 'react';

import orderContext from '../Context/ContextOrder';


export default function Orders(props) {

    const [orders, setOrders] = useState(0);
    const orderContextt = useContext(orderContext);


    const addQuantity = () => {
        setOrders(orders + 1);

        // Vérify if id exist in context
        if (props.id in orderContextt == true) {

            // Loop in datas in context
            orderContextt.forEach(element => {

                // Verify ID
                if (element.id == props.id) {

                    // Update the context with the new value of the exact order
                    element.quantity = orders;
                };
            });
        } else {
            // If the id of order is not created with this datas -> push the the value in context
            orderContextt.push({
                quantity: orders,
                name: props.name,
                id: props.id
            });
        };

    };

    const removeQuantity = () => {
        orders === 0 ? setOrders(0) : setOrders(orders - 1);
        if (props.id in orderContextt == true) {

            // Loop in datas in context
            orderContextt.forEach(element => {

                // Verify ID
                if (element.id == props.id) {

                    // Update the context with the new value of the exact order
                    element.quantity = orders;
                }
            });
        }
    };

    return (
        <div>
            <li key={props.id}>
                Nom: {props.name}
            </li>
            <li >
                Compositions: {props.compositions}
            </li>
            <li  >
                Prix: {props.price}
            </li>
            <input
                type="button"
                value="Ajouter"
                onClick={addQuantity}>
            </input>
            <input
                type="button"
                value="diminuer"
                onClick={removeQuantity}
                style={{ marginBottom: '30px' }}>
            </input>
            Quantité totale{orders}

        </div>
    )
}
