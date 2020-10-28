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
            {/* <label>Rechercher un plat:</label>
            <input type="search" className="my-4" placeholder="Rechercher un plat" value={search} onChange={updateSearch} /> */}

            <input type="search" className="form-control w-50 my-4"
             id="search-input" placeholder="Rechercher un plat..." autoComplete="off" alue={search} onChange={updateSearch} role="combobox"></input>
            <section className="row justify-content-center">

                {filteredOrder.map((datas, index, key) => (
                    <Orders key={datas.id} name={datas.nom} price={datas.prix} compositions={datas.compo} id={datas.id} />
                ))}

            </section>
        </>
    )
}
