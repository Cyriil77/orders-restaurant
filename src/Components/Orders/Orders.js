import React, { useState, useContext } from 'react';

import orderContext from '../Context/ContextOrder';


export default function Orders(props) {

    const [orders, setOrders] = useState(0);
    const orderContextt = useContext(orderContext);

    const addQuantity = () => {
        setOrders(orders + 1);


        let found = false;
        let index = 0;

        for (let i = 0; i < orderContextt.length; i++) {

            // Verify if index is push
            if (orderContextt[i].id == props.id) {
                found = true;
                index = i;
                break;
            }

        }

        if (found) {

            // Update quantity
            orderContextt[index].quantity = orders;

        } else {
            // Push value in context
            orderContextt.push({
                quantity: orders,
                name: props.name,
                id: props.id
            });
        }


    }

    const removeQuantity = () => {
        orders === 0 ? setOrders(0) : setOrders(orders - 1);

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
