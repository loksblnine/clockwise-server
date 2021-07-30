import React from 'react';
import {Button} from "@material-ui/core";
import {IS_USER_AUTHORISED} from "../../constants";


function Header() {
    if (IS_USER_AUTHORISED.is)
    return (
        <div className="header">
            <div className="h1">
                <h1> Clockwise Clockware</h1>
            </div>
        </div>
    );
    else{ return (
        <div className="header">
            <div className="h1">
                <h1> Clockwise Clockware</h1>
            </div>
            <div className="button">
                <Button href='/login'>Вход</Button>
            </div>
        </div>
    );}
}

export default Header