import React from "react";
export const SERVER_URL = `https://enigmatic-spire-58695.herokuapp.com/`

export const WORK_TYPES = {
    SMALL: {
        key: "small",
        id: "1",
        value: "60"
    },
    AVERAGE: {
        key: "average",
        id: "2",
        value: "120"
    },
    BIG: {
        key: "big",
        id: "3",
        value: "180"
    },
}

export const EMAIL_MESSAGE = "qwerty"

export const IS_USER_AUTHORISED = {is:false};
export const IS_ORDER_SUBMITTED = {is:false};


export const ADMIN_LOGIN = "admin@example.com"
export const ADMIN_PASSWORD = "passwordsecret"

export const DATE_FROM = new Date()
export const DATE_TO = new Date(new Date().getFullYear(), new Date().getMonth()+1, new Date().getDate())

export default window.ORDER = {
    name:"",
    email:"",
    city_id:"",
    date:"",
    time:"",
    type_id:"",
    master_id:""
}