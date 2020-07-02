import React, { Component } from 'react';
import { Redirect } from 'react-router';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Button, Alert, Container, Table, Card } from "react-bootstrap";
import Navigationbar from '../Navigationbar.js';
import { getCustomer } from '../../actions/profileActions'
import { placeOrder } from '../../actions/orderActions'

class ConfirmOrder extends Component {
    constructor(props) {
        super(props);

        this.props.getCustomer();
        this.placeOrder = this.placeOrder.bind(this);
    }

    componentWillMount() {
        document.title = "Your Order";
        if (this.props.location.state) {
            this.setState({
                restaurant: this.props.location.state.restaurant,
                cart_items: this.props.location.state.cart_items,
                discount: this.props.location.state.discount,
                delivery: this.props.location.state.delivery,
                tax: this.props.location.state.tax,
                sub_total: this.props.location.state.subTotal,
                total: this.props.location.state.total
            });
        }
    };

    componentWillReceiveProps(nextProps) {
        if (nextProps.user) {
            var { user } = nextProps;

            this.setState({
                customer: user
            });
        }

        if (nextProps.order_status) {
            var { order_status } = nextProps;

            this.setState({
                message: order_status
            });
        }
    }

    placeOrder = (e) => {
        e.preventDefault();
        let data = {
            customer: this.state.customer,
            restaurant: this.state.restaurant,
            order_status: 'ORDER_PLACED',
            sub_total: this.state.sub_total,
            discount: (this.state.discount * this.state.sub_total / 100).toFixed(2),
            delivery: this.state.delivery,
            tax: (this.state.tax * this.state.sub_total / 100).toFixed(2),
            total: this.state.total,
            cart_items: this.state.cart_items
        }
        this.props.placeOrder(data);
    };

    render() {
        let redirectVar = null,
            order = null,
            address = "",
            phone_number = "",
            message = null;

        if (!localStorage.getItem("token") || localStorage.getItem("is_owner") === "true") {
            redirectVar = <Redirect to="/" />
        }
        if (this.state.message === "ORDER_PLACED") {
            redirectVar = <Redirect to="/orders" />
        }
        else if (this.state.message === "ORDER_ERROR") {
            message = <Alert variant="warning">There was some error processing your order!</Alert>
        }
        else if (!localStorage.getItem("cart_items") || localStorage.getItem("cart_items").length === 0) {
            redirectVar = <Redirect to="/cart" />
        }

        if (this.state) {
            if(this.state.customer){
                address = this.state.customer.address;
                phone_number = this.state.customer.phone_number;
            }
            order = (
                <div>
                    <Card style={{width: "40rem", height: "35rem"}}>
                        <Card.Title>
                            <br />
                            <h3>{this.state.restaurant.res_name}</h3>
                            {this.state.restaurant.res_address} | {this.state.restaurant.res_zip_code}
                        </Card.Title>
                        <Card.Body>
                            <Table style={{ width: "90%" }}>
                                <tbody>
                                    <tr>
                                        <td colSpan="4">Your purchase</td>
                                        <td align="center">$ {this.state.sub_total}</td>
                                    </tr>
                                    <tr>
                                        <td colSpan="4">Tax ({this.state.tax}%)</td>
                                        <td align="center">$ {(this.state.sub_total * this.state.tax / 100).toFixed(2)}</td>
                                    </tr>
                                    <tr>
                                        <td colSpan="4">Discounts ({this.state.discount}%)</td>
                                        <td align="center">$ {(this.state.sub_total * this.state.discount / 100).toFixed(2)}</td>
                                    </tr>
                                    <tr>
                                        <td colSpan="4">Delivery Charges</td>
                                        <td align="center">$ {this.state.delivery.toFixed(2)}</td>
                                    </tr>
                                    <tr>
                                        <td colSpan="4"><b>Total</b></td>
                                        <td align="center"><b>$ {this.state.total}</b></td>
                                    </tr>
                                    <br/>
                                    <tr>
                                        <td colSpan="4">Delivery Address</td>
                                        <td align="center">{address}</td>
                                    </tr>
                                    <tr>
                                        <td colSpan="4">Contact Number</td>
                                        <td align="center">{phone_number}</td>
                                    </tr>
                                </tbody>
                            </Table>
                            <center>
                                <Button variant="success" onClick={this.placeOrder}>Confirm Order</Button>&nbsp; &nbsp;
                                <Button variant="secondary" href="/home">Cancel</Button>
                            </center>
                            <br />
                        </Card.Body>
                    </Card>
                    <br />
                    <Button variant="info" href="/cart">Back to Cart</Button>
                </div>
            );
        }

        return (
            <div>
                {redirectVar}
                <Navigationbar /> <br />
                <Container>
                    <h3>Confirm your Order </h3>
                    <center>
                        {message}
                        {order}
                        <br /><br />
                    </center>
                </Container>
            </div >
        )
    }
}

ConfirmOrder.propTypes = {
    getCustomer: PropTypes.func.isRequired,
    placeOrder: PropTypes.func.isRequired,
    user: PropTypes.object.isRequired,
    order_status: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
    user: state.profile.user,
    order_status: state.order.order_status
});

export default connect(mapStateToProps, { getCustomer, placeOrder })(ConfirmOrder);