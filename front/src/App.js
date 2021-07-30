//libs
import React, {Fragment} from 'react';
import {BrowserRouter as Router, Route, Switch} from "react-router-dom";
//css
import './App.css';

//components
import AdminPanel from "./components/content/admin-content/login-form/AdminPanel";
import Header from "./components/header/Header";
import Footer from "./components/footer/Footer";
import OrderForm from "./components/content/customer-content/orderform/OrderForm";
import MasterView from "./components/content/customer-content/mastersview/MasterView";
import LoginForm from "./components/content/admin-content/login-form/LoginForm";
import ListOrders from "./components/content/admin-content/orders/ListOrders";
import ListMasters from "./components/content/admin-content/masters/ListMasters";


const App = () => {
    return (
        <Fragment>
            <Header/>
            <Router>
                <Switch>
                    <Route exact path='/' component={OrderForm}/>
                    <Route exact path='/choose_master' component={MasterView}/>
                    <Route exact path='/login' component={LoginForm}/>
                    <Route exact path='/access_succeed' component={AdminPanel}/>
                </Switch>
            </Router>
            <Footer/>
        </Fragment>
    );
}
export default App;