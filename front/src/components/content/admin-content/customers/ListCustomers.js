import React, {Fragment, useEffect, useState} from "react";
import EditCustomer from "./EditCustomer";
import InputCustomer from "./InputCustomer";
import {SERVER_URL} from "../../../../constants";

const ListCustomers = () => {
    const [customers, setCustomers] = useState([]);

    const deleteCustomer = async (id)=>{
        try {
            await fetch(SERVER_URL+`customers/${id}`, {
                method: "DELETE"
            });
            setCustomers(customers.filter(customer => customer.customer_id !== id))
        } catch (e) {
            console.log(e.message)
        }
    }

    const getCustomers = async () => {
        try {
            const response = await fetch(SERVER_URL+`customers`)
            const jsonData = await response.json()
            setCustomers(jsonData)
        } catch (e) {
            console.log(e.message)
        }
    }

    useEffect(() => {
        getCustomers()
    }, [])

    return (
        <Fragment>
            {" "}
            <h2 className="text-left mt-5">Список покупателей</h2>
            <table className="table mt-5 text-justify">
                <thead>
                <tr>
                    <th scope="col">#</th>
                    <th scope="col">Имя</th>
                    <th scope="col">e-mail</th>
                    <th scope="col">Изменить</th>
                    <th scope="col">Удалить</th>
                </tr>
                </thead>

                <tbody>
                {customers.map(customer=>(
                    <tr key={customer.customer_id}>
                        <th scope="row"> {customer.customer_id}</th>
                        <td>{customer.customer_name}</td>
                        <td>{customer.customer_email}</td>
                        <td><EditCustomer customer = {customer}/></td>
                        <td><button className="btn btn-danger"
                                    onClick={()=>deleteCustomer(customer.customer_id)}>Удалить</button></td>
                    </tr>
                ))}

                </tbody>
            </table>
            <InputCustomer/>
        </Fragment>
    )
}
export default ListCustomers