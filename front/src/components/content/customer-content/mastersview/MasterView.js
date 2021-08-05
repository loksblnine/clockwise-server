import React, {useEffect, useState} from 'react';
import {Button} from "@material-ui/core";
import * as constants from "../../../../constants";
import {useLocation, Redirect} from 'react-router-dom'
import {getMasters, getCustomers, getOrders} from "../../getData";

function MasterView(props) {
    const [masters, setMasters] = useState([]);
    const [orders, setOrders] = useState([]);
    const [customers, setCustomers] = useState([]);

    const location = useLocation()

    useEffect(() => {
        if (location.state) {
            getMasters(setMasters)
            getOrders(setOrders)
            getCustomers(setCustomers)
        }
    }, [])

    async function sendData(e) {
        // const body = {customer_name: location.state.data.name, customer_email: location.state.data.email}
        // await fetch(constants.SERVER_URL + `/customers`, {
        //     method: "POST",
        //     headers: {"Content-Type": "application/json"},
        //     body: JSON.stringify(body)
        // })
        console.log(123)
    }

    function isCustomerExist() {
        let flag = 0;
        customers.forEach(c => {
            if (c.customer_email === location.state.data.email) {
                flag++
                return
            }
        })
        return flag === 1;
    }

    if (!location.state) {
        return (
            <Redirect to="/"/>
        )
    }

    const isMasterAvailable = (master) => {
        let flag = 0;
        orders.forEach(o => {
            {
                if (o.master_id === master.master_id) {
                    if (o.order_time.split('T')[0] === location.state.data.date) {
                        if (o.order_time.split('T')[1] > START_TIME
                            && o.order_time.split('T')[1] < END_TIME
                        ) {
                            flag++
                            return
                        }
                    }
                }
            }
        })
        return flag !== 1;
    }

    const START_TIME = location.state.data.time
    const END_TIME = (Number(START_TIME.split(':')[0])
        + Number(constants.WORK_TYPES[location.state.data.type].value))
        + ":00"

    return (
        <div>
            <div>
                <h3>Выберите свободного мастера</h3>
                <p>Вы заказали
                    ремонт {constants.WORK_TYPES[location.state.data.type].message} на {location.state.data.date} в {START_TIME}-{END_TIME}</p>
            </div>
            <form onSubmit={sendData}>
                {
                    masters?.map((master) =>
                        <div key={master.master_id} id={master.master_id} className="mt-5">
                            <input value={master.master_name} readOnly/>
                            <input value={master.ranking} readOnly/>
                            <Button id={master.master_id} type={`submit`}
                                    disabled={!isMasterAvailable(master)}
                            >Выбрать</Button>
                        </div>
                    )
                }
            </form>
        </div>
    );
}

export default MasterView;