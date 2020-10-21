{/* <table>
<thead>
    <tr>
        <th>Date</th>
        <th>Nom</th>
        <th>Quantité</th>
        <th>Prix</th>
    </tr>
</thead>
<tbody>

    {datas.map((elem, key) => {
        return <tr key={key}>

            {elem.obj.map((el, key) => {
                console.log(el)
                return <> 
                <td >{new Date().getDay()}</td>
                <td >{el.name}</td>
                <td >{el.quantity}</td>
                <td >{el.price}</td>

                </>
            })}
        </tr>

    })}
</tbody>
</table> */}