import React, { Component } from 'react';
import { Redirect } from 'react-router';
import Navigationbar from '../Navigationbar.js';
import CustomerHome from './CustomerHome.js';
import OwnerHome from './OwnerHome.js';

class Home extends Component {
    componentWillMount(){
        document.title = "Grubhub | Food Delivery | Order Food online";
    }
    render() {
        let homeComponent = null;
        let redirectVar = null;
        if (localStorage.getItem("token")) {
            if (localStorage.getItem("is_owner") === "true")
                homeComponent = <OwnerHome />
            else
                homeComponent = <CustomerHome />
        }
        else {
            redirectVar = <Redirect to="/" />
        }
        return (
            <div>
                {redirectVar}
                <Navigationbar />
                {homeComponent}
            </div>
        )
    }
}
//export Login Component
export default Home;