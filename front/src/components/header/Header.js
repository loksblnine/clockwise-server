import React, {useEffect, useState, ReactElement} from 'react'
import Button from "@material-ui/core/Button";

function Header(props) {

    console.log("123", props.isUserLoggedIn)
    return (
        <div className="header">
            <div className="h1">
                <h1> Clockwise Clockware</h1>
            </div>
            {window.location.pathname !== '/login' && window.location.pathname !== '/access_succeed'
            && <Button href={'/login'}>Вход</Button>}

        </div>
    );
}

export default Header