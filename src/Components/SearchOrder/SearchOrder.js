import React, { useState, useEffect, useContext } from 'react'
import Orders from '../Orders/Orders';
import './style.css'

export default function SearchOrder(props) {

    let [search, setSearch] = useState("")


    const updateSearch = (e) => {
        search = e.target.value.substr(0, 20)
        setSearch(search)
    };

    // return data if ordor.nom is equal to data in input type search
    const filteredOrder = props.datas.filter((order) => {
        return order.nom.indexOf(search) !== -1;
    });


    return (
        <>
            <input type="text" placeholder="Rechercher un plat" value={search} onChange={updateSearch} />
            <div className="container-orders">
                {filteredOrder.map((datas, index, key) => (
                    <Orders key={datas.id} name={datas.nom} price={datas.prix} compositions={datas.compo} id={datas.id} />
                ))}
            </div>
        </>
    )
}
