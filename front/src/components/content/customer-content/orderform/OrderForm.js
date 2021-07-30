import React, {useEffect, useState} from 'react';
import {withFormik, Form, Field} from 'formik';
import * as Yup from 'yup';
import * as constants from "../../../../constants";
import MasterView from "../mastersview/MasterView";

const OrderPage = (props) => {
    const [cities, setCities] = useState([]);
    const [order, setOrder] = useState({
        name:'',
        email:'',
        city:''
    })
    const handleChange = e => {
        const { name, value } = e.target;
        setOrder(prevState => ({
            ...prevState,
            [name]: value
        }));
    };
    const getCities = async () => {
        try {
            const response = await fetch(constants.SERVER_URL + `cities`)
            const jsonData = await response.json()
            setCities(jsonData)
        } catch (e) {
            console.log(e.message)
        }
    }

    useEffect(() => {
        getCities()
    }, [])

    const loginPageStyle = {
        margin: "32px auto 37px",
        maxWidth: "530px",
        background: "#fff",
        padding: "30px",
        borderRadius: "10px",
        boxShadow: "0px 0px 10px 10px rgba(0,0,0,0.15)"
    };

    const {touched, errors} = props;

    return (
        <React.Fragment>
            <div className="container">
                <div className="login-wrapper" style={loginPageStyle}>
                    <h2>Clockwise - чиним clocks для вас </h2>
                    <form className="form-container">

                        <div className="form-group">
                            <label htmlFor={`name`}>Имя</label>
                            <input type={`name`} id={`name`} name={`name`}
                                   value={order.name} onChange={handleChange}
                                   className={"form-control"} placeholder="Имя"/>
                            {touched.name && errors.name &&
                            <span className="help-block text-danger">{errors.name}</span>}
                        </div>

                        <div className="form-group">
                            <label htmlFor="email">Email</label>
                            <Field type={`email`} id={`email`} name={`email`}
                                   value={order.email} onChange={handleChange}
                                   className={"form-control"}  placeholder="email"/>
                            {touched.email && errors.email &&
                            <span className="help-block text-danger">{errors.email}</span>}
                        </div>

                        <div className="form-group">
                            <label htmlFor="city">Город</label>
                            <select type={`city`} id={`city`} name={`city`}
                                    value={order.city} onChange={handleChange}
                                    className={"form-control"}
                                    placeholder="Выберите ваш город">
                                {cities?.map(city =>
                                    <option value={city.city_id}>{city.city_name} </option>)}
                            </select>
                        </div>

                        {/*<div className="form-group">*/}
                        {/*    <label htmlFor="date">Дата заказа</label>*/}
                        {/*    <Field type="date" id="date" className={"form-control"}*/}
                        {/*           placeholder="Введите дату" required/>*/}
                        {/*    {touched.date && errors.date &&*/}
                        {/*    <span className="help-block text-danger">{errors.date}</span>}*/}
                        {/*</div>*/}

                        {/*<div className="form-group">*/}
                        {/*    <label htmlFor="time">Время заказа (8:00 - 17:00)</label>*/}
                        {/*    <Field type="time" id="time" className={"form-control"}*/}
                        {/*           placeholder="Введите время" required step="3600"/>*/}
                        {/*</div>*/}

                        {/*<div className="form-group">*/}
                        {/*    <label htmlFor="date"> Выберите тип поломки </label>*/}
                        {/*    <div>*/}
                        {/*        <label className="miro-radiobutton">*/}
                        {/*            <input type="radio" value="1" name="radio"*/}
                        {/*                   id="radio_1" checked/>*/}
                        {/*            <span>Маленькие часы</span>*/}
                        {/*        </label>*/}
                        {/*        <label className="miro-radiobutton">*/}
                        {/*            <input type="radio" value="2" name="radio"*/}
                        {/*                   id="radio_2"/>*/}
                        {/*            <span>Средние часы</span>*/}
                        {/*        </label>*/}
                        {/*        <label className="miro-radiobutton">*/}
                        {/*            <input type="radio" value="3" name="radio"*/}
                        {/*                   id="radio_3"/>*/}
                        {/*            <span>Большие часы</span>*/}
                        {/*        </label>*/}
                        {/*    </div>*/}
                        {/*</div>*/}
                        <button type="submit" className="btn btn-primary">Выбрать мастера</button>
                    </form>
                </div>
            </div>
        </React.Fragment>
    );
}

const OrderForm = withFormik({
    mapPropsToValues: (props) => {
        return {
            name: props.name || '',
            email: props.email || '',
            city: props.city || '',
            type: props.type || '',
            time: props.time || '',
            date: props.date || ''
        }
    },
    handleSubmit: (values) => {
        console.log(values)

    }
})(OrderPage);

export default OrderForm