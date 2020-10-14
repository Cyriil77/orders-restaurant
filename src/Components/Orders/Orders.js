import React, { useState, useContext } from 'react';

import './style.css';

import orderContext from '../ContextOrder/ContextOrder';


export default function Orders(props) {

    const [orders, setOrders] = useState(0);
    const order = useContext(orderContext);


    let found = false;
    let index = 0;

    const addQuantity = () => {
        setOrders(orders + 1);

        for (let i = 0; i < order.length; i++) {

            // Verify if index is push
            if (order[i].id == props.id) {
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
                id: props.id
            });
        }

    }

    const removeQuantity = () => {
        orders === 0 ? setOrders(0) : setOrders(orders - 1);

        for (let i = 0; i < order.length; i++) {

            // Verify if index is push
            if (order[i].id == props.id) {
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
            <li key={props.id}>
                Nom: {props.name}
            </li>
            <li >
                Compositions: {props.compositions}
            </li>
            <li>
                Prix: {props.price}
            </li>
            <input
                type="button"
                value="Ajouter"
                onClick={addQuantity}>
            </input>
            <input
                type="button"
                value="Diminuer"
                onClick={removeQuantity}
            >
            </input>
            <p>Vous souhaitez {orders} {props.name}</p>

        </div>

    )
}
