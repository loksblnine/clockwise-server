import React from "react";

export const SERVER_URL = `https://enigmatic-spire-58695.herokuapp.com`

export const WORK_TYPES = {
    1: {
        key: "small",
        id: "1",
        message: "маленьких часов ",
        value: "1"
    },
    2: {
        key: "average",
        id: "2",
        message: "средних часов ",
        value: "2"
    },
    3: {
        key: "big",
        id: "3",
        message: "больших часов ",
        value: "3"
    },
}

export const IS_ORDER_SUBMITTED = {is: false};

export const MY_EMAIL = "illya200457@gmail.com"

export const ADMIN_LOGIN = "admin@example.com"
export const ADMIN_PASSWORD = "passwordsecret"

export const DATE_FROM = new Date().toISOString().split('T')[0]
export const DATE_TO = new Date(new Date().getFullYear(), new Date().getMonth() + 1, new Date().getDate()).toISOString().split('T')[0]
export const TIME_FROM = new Date(2011, 0, 1, 8).toISOString().split('T')[1]
export const TIME_TO = new Date(2011, 0, 1, 17).toISOString().split('T')[1]