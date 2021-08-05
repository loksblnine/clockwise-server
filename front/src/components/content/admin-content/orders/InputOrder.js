import React, {Fragment, useState} from "react";
import {SERVER_URL} from "../../../../constants";

const InputOrder = () => {
    const [order, setOrder] = useState({
        customer_id:'',
        master_id:'',
        city_id:'',
        work_id:'',
        order_time: ''
    });

    const onSubmitForm = async e => {
        e.preventDefault();

        try {
            const body = {order}
            console.log(JSON.stringify(body.order))
            await fetch(SERVER_URL + `/orders`, {
                method: "POST",
                headers: {"Content-Type": "application/json"},
                body: JSON.stringify(body.order)
            });
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
            <button type="button" className="btn btn-success" data-toggle="modal"
                    data-target="#addOrder">
                Добавить
            </button>

            <div className="modal fade" id="addOrder" tabIndex="-1" role="dialog"
                 aria-labelledby="exampleModalLabel" aria-hidden="true">
                <div className="modal-dialog" role="document">
                    <div className="modal-content">
                        <div className="modal-header">
                            <h1 className="modal-title" id="exampleModalLabel">Добавить заказ</h1>
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
                                    onClick={e => onSubmitForm(e)}>Сохранить изменения
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </Fragment>
    )
}
export default InputOrder;