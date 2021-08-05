import React, {useEffect, useState} from 'react';
import {Button} from "@material-ui/core";
import * as constants from "../../../../constants";
import emailjs from 'emailjs-com';
import {useLocation, Redirect} from 'react-router-dom'
import {SERVER_URL} from "../../../../constants";
import InputCustomer from "../../admin-content/customers/InputCustomer";

function MasterView(props) {
    const [masters, setMasters] = useState([]);
    const [orders, setOrders] = useState([]);
    const [customers, setCustomers] = useState([]);
    const location = useLocation()

    const getCustomers = () => {
        fetch(SERVER_URL + `/customers`)
            .then((res) => {
                return res.json()
            })
            .then((data) => {
                setCustomers(data)
            })
            .catch((e) => {
                console.error(e)
            })
    }

    const getMasters = () => {
        fetch(SERVER_URL + `/masters`)
            .then((res) => {
                return res.json()
            })
            .then((data) => {
                return setMasters(data)
            })
            .catch((e) => {
                console.error(e)
            })
    }

    const getOrders = () => {
        fetch(SERVER_URL + `/orders`)
            .then((res) => {
                return res.json()
            })
            .then((data) => {
                return setOrders(data)
            })
            .catch((e) => {
                console.error(e)
            })
    }


    useEffect(() => {
        getOrders()
    }, [])

    useEffect(() => {
        getMasters()
    }, [])

    useEffect(() => {
        getCustomers()
    }, [])

    const Time = location.state.data.time
    const START_TIME = Time
    const END_TIME = new Date(2001, 0, 0, (Number(Time.split(':')[0]) + Number(constants.WORK_TYPES[location.state.data.type].value))).getHours() + ":00"


    async function sendData(e) {
        e.preventDefault();
        emailjs.sendForm('gmail', 'template_gv8gk0m', e.target, 'user_hv0hRS1aIzu9chJ0LXehi')
            .then((result) => {
                console.log(result.text);
            }, (error) => {
                console.log(error.text);
            });
        e.target.reset()

        if (!isCustomerExist()){
            try {
                const body = {customer_name: location.state.data.name, customer_email: location.state.data.email}
                console.log(body)
                // await fetch(SERVER_URL+ `/customers`, {
                //     method: "POST",
                //     headers: {"Content-Type": "application/json"},
                //     body: JSON.stringify(body)
                // });
            } catch (e) {
                console.log(e.message)
            }
        }
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
                    if (o.order_time.split('T')[1] > START_TIME && o.order_time.split('T')[1] < END_TIME) {
                        flag++
                        return
                    }
                }
            }
        })
        return flag !== 1;
    }


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
                        <form id={master.master_id} className="mt-5">
                            <input value={master.master_name} readOnly/>
                            <input value={master.ranking} readOnly/>
                            <Button id={master.master_id} type={`submit`}
                                    disabled={!isMasterAvailable(master)}
                            >Выбрать</Button>
                        </form>
                    )
                }
            </form>
        </div>
    );
}

export default MasterView;