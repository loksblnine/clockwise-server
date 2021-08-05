import React, {useEffect, useState, ReactElement} from 'react'
import Button from "@material-ui/core/Button";

function Header(props) {
    return (
        <div className="header">
            <div className="h1">
                <h1> Clockwise Clockware</h1>
            </div>
            {window.location.pathname === '/login' ? null : window.location.pathname !== '/access_succeed'
                ? <Button href={'/login'}>Вход</Button> : <Button href={'/'}>Выход</Button>}

        </div>
    );
}

export default Header