import React, {useEffect, useState} from 'react';
import {useFormik} from 'formik';
import * as constants from "../../../../constants";
import {useHistory} from "react-router-dom";
import {SERVER_URL} from "../../../../constants";



const orderPageStyle = {
    margin: "32px auto 37px",
    maxWidth: "1000px",
    background: "#fff",
    padding: "30px",
    borderRadius: "10px",
    boxShadow: "0px 0px 10px 10px rgba(0,0,0,0.15)"
};

const OrderForm = (props) => {
    const [cities, setCities] = useState([]);
    const history = useHistory()

    const getCities = () => {
        fetch(SERVER_URL + `/cities`)
            .then((res) => {
                return res.json()
            })
            .then((data) => {
                setCities(data)
            })
            .catch((e) => {
                console.error(e)
            })
    }

    useEffect(() => {
        getCities()
    }, [])

    const formik = useFormik({
        initialValues: {
            name: '',
            email: '',
            city: '1',
            date: constants.DATE_FROM,
            time: constants.TIME_FROM,
            type: '1'
        },
        onSubmit: (values) => {
            history.push({
                pathname: '/masters_choosing',
                state: {data: values}
            })
        },
    });
    return (
        <form onSubmit={formik.handleSubmit}>
            <div className="form-group">
                <label htmlFor={`name`}>Имя</label>
                <input type={`name`} id={`name`} name={`name`}
                       value={formik.values.name} onChange={formik.handleChange}
                       className={"form-control"} placeholder="Имя"
                       required/>
            </div>
            <div className="form-group">
                <label htmlFor="email">Email</label>
                <input type={`email`} id={`email`} name={`email`}
                       value={formik.values.email} onChange={formik.handleChange}
                       className={"form-control"} placeholder="email"
                       required/>
            </div>

            <div className="form-group">
                <label htmlFor={`city`}>Город</label>
                <select id={`city`} name={`city`}
                        value={formik.values.city} onChange={formik.handleChange}
                        className={"form-control"}
                        placeholder="Выберите ваш город">
                    {cities?.map(city =>
                        <option value={city.city_id}>{city.city_name} </option>)}
                </select>
            </div>

            <div className="form-group">
                <label htmlFor={`date`}>Введите дату заказа </label>
                <input type={`date`} id={`date`} name={`date`}
                       min={constants.DATE_FROM} max={constants.DATE_TO}
                       required pattern="[0-9]{4}.[0-9]{2}.[0-9]{2}"
                       onChange={formik.handleChange}/>
            </div>

            <div className="form-group">
                <label htmlFor={`time`}>Время заказа (8:00 - 17:00) </label>
                <input type={`time`} name={`time`}
                       min={constants.TIME_FROM} max={constants.TIME_TO}
                       required step='3600'
                       pattern="([01]?[0-9]|2[0-3]):[0][0]" id="24h"
                       spellCheck="true" autoComplete="true"
                       onChange={formik.handleChange}/>
            </div>
            <div className="form-group">
                <label htmlFor={`type`}> Выберите тип поломки </label>
                <div onChange={formik.handleChange}>
                    <label className="miro-radiobutton">
                        <input type={`radio`} value={`1`} name={`type`}
                               id={`radio_1`}/>
                        <span>Маленькие часы </span>
                    </label>
                    <label className="miro-radiobutton">
                        <input type={`radio`} value={`2`} name={`type`}
                               id={`radio_2`}/>
                        <span>Средние часы </span>
                    </label>
                    <label className="miro-radiobutton">
                        <input type={`radio`} value={`3`} name={`type`}
                               id={`radio_3`}/>
                        <span>Большие часы </span>
                    </label>
                </div>
            </div>
            <button type="submit" className="btn btn-primary">Выбрать мастера</button>
        </form>
    );
}

export default OrderForm;