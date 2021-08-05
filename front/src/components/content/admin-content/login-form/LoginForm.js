import React, {useState} from 'react';
import {useFormik} from 'formik';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import * as constants from "../../../../constants";


const LoginForm = () => {
    const formik = useFormik({
        initialValues: {
            email: 'admin@example.com',
            password: 'passwordsecret',
        },
        onSubmit: (values) => {
            if (constants.ADMIN_LOGIN === values.email && constants.ADMIN_PASSWORD === values.password) {
                window.location = "/access_succeed"
            }
            else {
                alert("wrong pass")
            }
        }
    })
    const loginPageStyle = {
        margin: "32px auto 37px",
        maxWidth: "40%",
        background: "#fff",
        padding: "30px",
        borderRadius: "10px",
        boxShadow: "0px 0px 10px 10px rgba(0,0,0,0.15)"
    };

    return (
        <div style={loginPageStyle}>
            <form onSubmit={formik.handleSubmit}>
                <TextField
                    fullWidth
                    id="email"
                    name="email"
                    label="Email"
                    value={formik.values.email}
                    onChange={formik.handleChange}
                    error={formik.touched.email && Boolean(formik.errors.email)}
                    helperText={formik.touched.email && formik.errors.email}
                />
                <TextField
                    fullWidth
                    id="password"
                    name="password"
                    label="Password"
                    type="password"
                    value={formik.values.password}
                    onChange={formik.handleChange}
                    error={formik.touched.password && Boolean(formik.errors.password)}
                    helperText={formik.touched.password && formik.errors.password}
                />
                <Button color="primary" variant="contained" fullWidth type="submit" className={"mt-5"}>
                    Войти
                </Button>
            </form>
        </div>
    );
};
export default LoginForm
