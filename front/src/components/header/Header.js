import React, {useEffect, useState, ReactElement} from 'react'
import Button from "@material-ui/core/Button";
import {useLocation} from "react-router-dom";

function Header(props) {
    const location = useLocation()
    return (
        <div className="header">
            <div className="h1">
                <h1> Clockwise Clockware</h1>
            </div>
            {location.pathname === '/login'
                ? null
                : location.pathname !== '/access_succeed'
                    ? <Button href={'/login'}>Вход</Button>
                    : <Button href={'/'}>Выход</Button>}
        </div>
    );
}

export default Header