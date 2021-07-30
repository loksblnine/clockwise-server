import React, {Fragment, useReducer} from "react";
import {SERVER_URL} from "../../../../constants";
import reducer from "./reducer";


const InputOrder = () => {
    const [order, dispatch] = useReducer(reducer, {});

    const onSubmitForm = async e => {
        e.preventDefault();

        try {
            const body = {order}
            await fetch(SERVER_URL + `orders`, {
                method: "POST",
                headers: {"Content-Type": "application/json"},
                body: JSON.stringify(body)
            });
        } catch (e) {
            console.log(e.message)
        }
    }
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
                            <input className="form-control" value={order.master_id}
                                   onChange={e => dispatch({type: 'master_id', payload: e.target.value})}/>

                            <input className="form-control" value={order.customer_id}
                                   onChange={e => dispatch({type: 'customer_id', payload: e.target.value})}/>

                            <input className="form-control" value={order.city_id}
                                   onChange={e => dispatch({type: 'city_id', payload: e.target.value})}/>

                            <input className="form-control" value={order.work_id}
                                   onChange={e => dispatch({type: 'type_id', payload: e.target.value})}/>

                            <input className="form-control" value={order.order_time}
                                   onChange={e => dispatch({type: 'order_time', payload: e.target.value})}/>
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