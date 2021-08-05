import React, {Fragment, useEffect, useState} from "react";
import EditOrder from "./EditOrder";
import InputOrder from "./InputOrder";
import {SERVER_URL} from "../../../../constants";
import {getOrders} from "../../getData";

const ListOrders = () => {
    const [orders, setOrders] = useState([]);

    const deleteOrder = async (id) => {
        try {
            await fetch(SERVER_URL + `/orders/${id}`, {
                method: "DELETE"
            });
            getOrders(setOrders)
        } catch (e) {
            console.log(e.message)
        }
    }



    useEffect(() => {
        getOrders(setOrders)
    }, [])

    return (
        <Fragment>
            {" "}
            <h2 className="text-left mt-5">Список заказов</h2>
            <table className="table mt-5 text-justify">
                <thead>
                <tr>
                    <th scope="col"># заказа</th>
                    <th scope="col"># мастера</th>
                    <th scope="col"># покупателя</th>
                    <th scope="col"># города</th>
                    <th scope="col"># типа работы</th>
                    <th scope="col">Время заказа</th>
                    <th scope="col">Редактировать</th>
                    <th scope="col">Удалить</th>
                </tr>
                </thead>

                <tbody>
                {
                    orders.map(order => (
                        <tr key={order.order_id}>
                            <th scope="row"> {order.order_id}</th>
                            <td>{order.master_id}</td>
                            <td>{order.customer_id}</td>
                            <td>{order.city_id}</td>
                            <td>{order.work_id}</td>
                            <td>{order.order_time}</td>
                            <td><EditOrder order = {order}/></td>
                            <td>
                                <button className="btn btn-danger"
                                        onClick={() => deleteOrder(order.order_id)}>Удалить
                                </button>
                            </td>
                        </tr>
                    ))}

                </tbody>
            </table>
            <InputOrder/>
        </Fragment>
    )
}
export default ListOrders