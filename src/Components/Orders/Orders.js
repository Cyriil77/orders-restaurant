import React, { useState, useContext, useEffect } from 'react';

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
            order[index].quantity = orders + 1;

        } else {
            // Push value in context
            order.push({
                quantity: orders + 1,
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
            order[index].quantity = orders - 1;
        }

    };


    // style="width: 18rem;"
    return (

        <div className="card m-2 shadow" key={props.id} >
            <div className="card-body">
                <h5 className="card-title">{props.name}</h5>
                <p className="card-text">{props.price}€</p>
            </div>
            <ul className="list-group list-group-flush">
                <li  className="list-group-item">Compositions: {props.compositions}</li>

                <li className="list-group-item">
                    Quantité souhaitée: {orders}
                </li>
            </ul>
            <div className="card-body">
                <input
                    type="button"
                    value="Ajouter"
                    className="card-link btn btn-outline-success"
                    onClick={addQuantity}>
                </input>
                <input
                    type="button"
                    value="Diminuer"
                    className="card-link btn btn-outline-danger"
                    onClick={removeQuantity}>
                </input>
            </div>
        </div>

    )

}
