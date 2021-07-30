import React, {useEffect, useState} from 'react';
import * as constants from "../../../../constants";
import {Button} from "@material-ui/core";
import ORDER, {SERVER_URL} from "../../../../constants";
import emailjs from 'emailjs-com';


function MasterView(props) {

    const [masters, setMasters] = useState([]);
    const [orders, setOrders] = useState([]);

    const getMasters = async () => {
        try {
            const response = await fetch(constants.SERVER_URL + `masters`)
            const jsonData = await response.json()
            setMasters(jsonData)
        } catch (e) {
            console.log(e.message)
        }
    }

    const getOrders = async () => {
        try {
            const response = await fetch(SERVER_URL + `orders`)
            const jsonData = await response.json()
            setOrders(jsonData)
            console.log(orders)
        } catch (e) {
            console.log(e.message)
        }
    }

    useEffect(() => {
        getOrders()
    }, [])

    useEffect(() => {
        getMasters()
    }, [])

    function sendEmail(e) {
        e.preventDefault();
        emailjs.sendForm('gmail', 'template_gv8gk0m', e.target, 'user_hv0hRS1aIzu9chJ0LXehi')
            .then((result) => {
                console.log(result.text);
            }, (error) => {
                console.log(error.text);
            });
        e.target.reset()
    }

    return (
        <div>
            {
                <div>
                    <p>Order</p>
                    {ORDER.name}
                </div>
            }
            {
                masters?.map((master) =>
                    <form id={master.master_id} className="mt-5" onSubmit={sendEmail}>
                        <p> {master.master_name}, {master.ranking} </p>
                        <Button id={master.master_id} type={`submit`}>Выбрать</Button>
                    </form>
                )
            }
        </div>
    );
}

export default MasterView;