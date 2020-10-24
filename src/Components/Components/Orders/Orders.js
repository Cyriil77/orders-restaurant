import React, { useState, useContext } from 'react';

import orderContext from '../ContextOrder/ContextOrder';

import './style.css';




export default function Orders(props) {

    //  Display quantity
    const [orders, setOrders] = useState(0);

    // Context for send datas
    const order = useContext(orderContext);


    let found = false;
    let index = 0;

    const addQuantity = () => {

        setOrders(orders + 1);

        for (let i = 0; i < order.length; i++) {

            // Verify if index is push
            if (order[i].id === props.id) {
                found = true;
                index = i;
                break;
            }

        }

        if (found) {
            // Update quantity
            order[index].quantity = orders;

        } else {
            // Push value in context
            order.push({
                quantity: orders,
                name: props.name,
                id: props.id,
                price: props.price,
            });

        }

    }

    const removeQuantity = () => {

        orders === 0 ? setOrders(0) : setOrders(orders - 1);

        for (let i = 0; i < order.length; i++) {
            // Verify if index is push
            if (order[i].id === props.id) {
                found = true;
                index = i;
                break;
            }
        }

        if (found) {
            // Update quantity
            order[index].quantity = orders;
        }

    };

    return (

        <div className="ctnr-datas">

            <div className="datas">
                <li key={props.id}>
                    Nom: {props.name}
                </li>

                <li>
                    Compositions: {props.compositions}
                </li>

                <li>
                    Prix: {props.price}€
                </li>
            </div>
            <input
                type="button"
                value="Ajouter"
                onClick={addQuantity}>
            </input>

            <input
                type="button"
                value="Diminuer"
                onClick={removeQuantity}>
            </input>

            <p>Vous souhaitez {orders} {props.name}</p>

        </div>

    )

}
