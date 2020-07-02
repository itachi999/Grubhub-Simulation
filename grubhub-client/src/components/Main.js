import React, { Component } from 'react';
import { Route } from 'react-router-dom';
import Login from './Login';
import OwnerSignup from './Signup/OwnerSignup';
import CustomerSignup from './Signup/CustomerSignup';
import Home from './Home/Home';
import Profile from './Profile/Profile';
import LandingPage from './LandingPage';
import Restaurant from './Restaurant/Restaurant'
import Cart from './Cart/Cart';
import Menu from './Menu/Menu';
import CustomerOrders from './Orders/CustomerOrders';
import OrderHistory from './Orders/OrderHistory';
import ConfirmOrder from './Cart/ConfirmOrder';
import OrderBillView from './Orders/OrderBillView';
import OrderItemsView from './Orders/OrderItemsView';
import OrderMessenger from './Orders/OrderMessenger';

class Main extends Component {
    render() {
        return (
            <div>
                <Route exact path="/" component={LandingPage} />
                <Route path="/login" component={Login} />
                <Route path="/ownersignup" component={OwnerSignup} />
                <Route path="/signup" component={CustomerSignup} />
                <Route path="/home" component={Home} />
                <Route path="/profile" component={Profile} />
                <Route path="/restaurant" component={Restaurant} />
                <Route exact path="/orders" component={CustomerOrders} />
                <Route path="/orders/history" component={OrderHistory} />
                <Route path="/orders/billing" component={OrderBillView} />
                <Route path="/orders/details" component={OrderItemsView} />
                <Route path="/orders/messenger" component={OrderMessenger} />
                <Route path="/cart" component={Cart} />
                <Route path="/menu" component={Menu} />
                <Route path="/order/confirm" component={ConfirmOrder} />
            </div>
        )
    }
}
export default Main;