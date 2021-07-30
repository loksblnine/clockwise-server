import React, {Fragment, useState} from "react";
import {SERVER_URL} from "../../../../constants";

const EditCustomer = ({customer}) => {
    const [customer_name, setCustomerName] = useState(customer.customer_name)
    const [customer_email, setCustomerEmail] = useState(customer.customer_email)

    const updateCustomer = async (e) => {
        e.preventDefault()
        try {
            const body = {customer_name, customer_email}
            await fetch(SERVER_URL+`/customers/${customer.customer_id}`, {
                method: "PUT",
                headers: {"Content-Type": "application/json"},
                body: JSON.stringify(body)
            })

        } catch (e) {
            console.log(e.message)
        }
    }

    return (
        <Fragment>
            <button type="button" className="btn btn-warning" data-toggle="modal"
                    data-target={`#id${customer.customer_id}`}>
                Редактировать
            </button>

            <div className="modal fade" id={`id${customer.customer_id}`} tabIndex="-1" role="dialog"
                 aria-labelledby="exampleModalLabel" aria-hidden="true">
                <div className="modal-dialog" role="document">
                    <div className="modal-content">
                        <div className="modal-header">
                            <h2 className="modal-title" id="exampleModalLabel">Редактировать покупателя</h2>
                            <button type="button" className="close" data-dismiss="modal">
                                <span aria-hidden="true">&times;</span>
                            </button>
                        </div>
                        <div className="modal-body">
                            <input className="form-control" placeholder="Иван Иванович Иванов" value={customer_name}
                                   onChange={e => setCustomerName(e.target.value)}/>
                            <input className="form-control" placeholder="5.0" value={customer_email}
                                   onChange={e => setCustomerEmail(e.target.value)}/>
                        </div>
                        <div className="modal-footer">
                            <button type="button" className="btn btn-secondary" data-dismiss="modal">Закрыть</button>
                            <button type="button" className="btn btn-primary"
                                    onClick={e => updateCustomer(e)}>Сохранить изменения
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </Fragment>
    )
}

export default EditCustomer;