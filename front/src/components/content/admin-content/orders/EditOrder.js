import React, {Fragment, useState} from "react";
import {SERVER_URL} from "../../../../constants";


const EditOrder = (initialOrder) => {

    const [order, setOrder] = useState(initialOrder.order);

    const updateOrder = async (e) => {
        e.preventDefault()
        try {
            const body = {order}
            await fetch(SERVER_URL+`/orders/${order.order_id}`, {
                method: "PUT",
                headers: {"Content-Type": "application/json"},
                body: JSON.stringify(body.order)
            })

        } catch (e) {
            console.log(e.message)
        }
    }

    const handleChange = e => {
        const { name, value } = e.target;
        setOrder(prevState => ({
            ...prevState,
            [name]: value
        }));
    };

    return (
        <Fragment>
            <button type="button" className="btn btn-warning" data-toggle="modal"
                    data-target={`#id${order.order_id}`}>
                Редактировать
            </button>

            <div className="modal fade" id={`id${order.order_id}`} tabIndex="-1" role="dialog"
                 aria-labelledby="exampleModalLabel" aria-hidden="true">
                <div className="modal-dialog" role="document">
                    <div className="modal-content">
                        <div className="modal-header">
                            <h2 className="modal-title" id="exampleModalLabel">Редактировать заказ</h2>
                            <button type="button" className="close" data-dismiss="modal">
                                <span aria-hidden="true">&times;</span>
                            </button>
                        </div>
                        <div className="modal-body">
                            <input className="form-control" value={order.master_id} name={`master_id`}
                                   onChange={handleChange}/>

                            <input className="form-control" value={order.customer_id} name={`customer_id`}
                                   onChange={handleChange}/>

                            <input className="form-control" value={order.city_id} name={`city_id`}
                                   onChange={handleChange}/>

                            <input className="form-control" value={order.work_id} name={`work_id`}
                                   onChange={handleChange}/>

                            <input className="form-control" value={order.order_time} name={`order_time`}
                                   onChange={handleChange}/>
                        </div>
                        <div className="modal-footer">
                            <button type="button" className="btn btn-secondary" data-dismiss="modal">Закрыть</button>
                            <button type="button" className="btn btn-primary"
                                    onClick={e => updateOrder(e)}>Сохранить изменения
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </Fragment>
    )
}

export default EditOrder;