import React, {useEffect, useState, ReactElement} from 'react';
import {Button} from "@material-ui/core";


function renderIf(condition: boolean | Array<any>, children: ReactElement): ReactElement | null {
    return (Array.isArray(condition) ? condition.length > 0 : condition) ? children : null;
}

function Header(props) {

    const isLoggedIn = props.isUserLoggedIn;

    return (
        <div className="header">
            <div className="h1">
                <h1> Clockwise Clockware</h1>
            </div>
            {renderIf(!isLoggedIn,
                <div className="button">
                    <Button href='/login'>Вход</Button>
                </div>)}
        </div>
    );
}

export default Header