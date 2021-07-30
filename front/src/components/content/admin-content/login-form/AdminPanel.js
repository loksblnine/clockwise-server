import React from 'react';
import {BrowserRouter as Router, Route, Switch} from "react-router-dom";
import Button from "@material-ui/core/Button"
import {LinkContainer} from 'react-router-bootstrap'
import './AdminPanel.css'

//components
import ListMasters from "../masters/ListMasters";
import ListCities from "../cities/ListCities";
import ListCustomers from "../customers/ListCustomers";
import ListOrders from "../orders/ListOrders";
import LoginForm from "./LoginForm";
import {IS_USER_AUTHORISED} from "../../../../constants";

function AdminPanel() {
    IS_USER_AUTHORISED.is = true;
    return (
        <Router>
            <div className="router">
                <h2>Администрирование</h2>

                <LinkContainer to='/masters'>
                    <Button className="btn btn-xl">Мастера</Button>
                </LinkContainer>
                <LinkContainer to='/cities'>
                    <Button className="btn btn-xl ">Города</Button>
                </LinkContainer>
                <LinkContainer to='/customers'>
                    <Button className="btn btn-xl">Покупатели</Button>
                </LinkContainer>
                <LinkContainer to='/orders'>
                    <Button className="btn btn-xl">Заказы</Button>
                </LinkContainer>
                <Switch>
                    <Route exact path='/masters' component={ListMasters}/>
                    <Route exact path='/cities' component={ListCities}/>
                    <Route exact path='/customers' component={ListCustomers}/>
                    <Route exact path='/orders' component={ListOrders}/>
                </Switch>
            </div>
        </Router>
    );
}

export default AdminPanel;