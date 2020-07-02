import React, { Component } from 'react';
import { Redirect } from 'react-router';
import Navigationbar from '../Navigationbar';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import Draggable from "react-draggable";
import { Card, Container, Col, Row, Button, Alert } from "react-bootstrap";
import { Link } from "react-router-dom";
import { getCustomerCurrentOrders, changeOrderStatus } from '../../actions/orderActions'

class CustomerOrders extends Component {
    constructor(props) {
        super(props);
        this.setState({
            pending_orders: []
        });

        this.cancelOrder = this.cancelOrder.bind(this);
        this.props.getCustomerCurrentOrders();
    }

    componentWillMount() {
        document.title = "Your Orders";
    }

    componentWillReceiveProps(nextProps) {
        if (nextProps.orders_list) {
            var { orders_list } = nextProps;

            if (orders_list === "NO_PENDING_ORDERS") {
                this.setState({
                    message: orders_list
                });
            }
            else if (orders_list === "STATUS_UPDATED") {
                this.props.getCustomerCurrentOrders();
                this.setState({
                    message: "ORDER_CANCELLED"
                });
            }
            else if (orders_list === "ORDER_ERROR") {
                this.setState({
                    message: "ORDER_ERROR"
                });
            }
            else if (orders_list.length) {
                this.setState({
                    pending_orders: orders_list
                });
            }
        }
    }

    cancelOrder = (e) => {
        let data = {
            order_id: e.target.name,
            order_status: "ORDER_CANCELLED"
        };

        this.props.changeOrderStatus(data);
    };

    render() {
        let redirectVar = null;
        let orders = [];
        let orderCards = null;
        let message = null;
        if (!localStorage.getItem("user_id") || localStorage.getItem("is_owner") === "true") {
            redirectVar = <Redirect to="/" />
        }
        if (this.state && this.state.message === "ORDER_CANCELLED") {
            message = <Alert variant="success">Your order is cancelled.</Alert>
        }
        else if (this.state && this.state.message === "ORDER_ERROR") {
            message = <Alert variant="warning">Your order could not be cancelled.</Alert>
        }
        else if (this.state && this.state.message === "NO_PENDING_ORDERS") {
            message = (
                <Link to="/orders/history">
                    <Alert variant="warning">You do not have any pending orders. Click here to view your past orders.</Alert>
                </Link>
            );
        }
        if (this.state && this.state.pending_orders) {
            orders = this.state.pending_orders;
            if (orders.length > 0) {
                orderCards = orders.map(order => {
                    return (
                        <Draggable>
                            <Card style={{ width: "60rem", margin: "2%" }}>
                                <Card.Body>
                                    <Row>
                                        <Col>
                                            <Card.Title>{order.restaurant.res_name}</Card.Title>
                                            <Card.Subtitle className="mb-2 text-muted">{order.restaurant.res_address} | {order.restaurant.res_zip_code}</Card.Subtitle>
                                            <Row>
                                                <Link to={{ pathname: "/orders/details", state: { order_details: order, prevPath: "/orders" } }}>
                                                    <Button variant="link">Order Details</Button>
                                                </Link>
                                                <Link to={{ pathname: "/orders/billing", state: { order_details: order, prevPath: "/orders" } }}>
                                                    <Button variant="link">Billing Details</Button>
                                                </Link>
                                            </Row>
                                        </Col>
                                        <Col align="center">
                                            <Card.Text>{order.order_status}</Card.Text>
                                            <Card.Text>{order.order_date}</Card.Text>
                                        </Col>
                                        <Col align="right">
                                            <Link to={{ pathname: "/orders/messenger", state: { order_details: order, prevPath: "/orders" } }}>
                                                <Button variant="success" name={order._id}>Message Restaurant</Button>&nbsp;
                                        </Link>
                                            <br /><br />
                                            <Button variant="secondary" name={order._id} onClick={this.cancelOrder}>Cancel Order</Button>&nbsp;
                                </Col>
                                    </Row>
                                </Card.Body>
                            </Card>
                        </Draggable>
                    );
                });
            }
        }
        return (
            <div>
                {redirectVar}
                <Navigationbar /><br />
                <Container className="justify-content">
                    <h3>Your Pending Orders</h3><br />
                    {message}
                    {orderCards}
                    <center>
                        <Button href="/home">Home</Button>
                    </center>
                </Container>
            </div>
        )
    }
}

CustomerOrders.propTypes = {
    getCustomerCurrentOrders: PropTypes.func.isRequired,
    changeOrderStatus: PropTypes.func.isRequired,
    orders_list: PropTypes.object.isRequired,
    order_status: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
    orders_list: state.order.orders_list
});

export default connect(mapStateToProps, { getCustomerCurrentOrders, changeOrderStatus })(CustomerOrders);