import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import Draggable from "react-draggable";
import { Card, Container, Col, Row, Button, Alert } from "react-bootstrap";
import { Link } from "react-router-dom";
import { getCustomerPastOrders } from '../../actions/orderActions'

class CustomerOrderHistory extends Component {
    constructor(props) {
        super(props);
        this.setState({
            message: ""
        });

        this.props.getCustomerPastOrders();
    }

    componentWillReceiveProps(nextProps) {
        if (nextProps.orders_list) {
            var { orders_list } = nextProps;

            if (orders_list === "NO_COMPLETED_ORDERS") {
                this.setState({
                    message: orders_list
                });
            } else if (orders_list.length) {
                this.setState({
                    completed_orders: orders_list
                });
            }
        }
    }

    render() {
        let message = null;
        let orders = [];
        let orderCards = null;

        if (this.state && this.state.completed_orders) {
            orders = this.state.completed_orders;
            if (orders.length > 0) {
                orderCards = orders.map(order => {
                    return (
                        <Draggable>
                            <Card style={{ width: "50rem", margin: "2%" }}>
                                <Card.Body>
                                    <Row>
                                        <Col>
                                            <Card.Title>{order.restaurant.res_name}</Card.Title>
                                            <Card.Subtitle className="mb-2 text-muted">{order.restaurant.res_address} | {order.restaurant.res_zip_code}</Card.Subtitle>
                                            <Card.Text>{order.order_date}</Card.Text>
                                        </Col>
                                        <Col align="center">
                                            <Link to={{ pathname: "/orders/details", state: { order_details: order, prevPath: "/orders/history" } }}>
                                                <Button variant="link">Order Details</Button>
                                            </Link>
                                            <Link to={{ pathname: "/orders/billing", state: { order_details: order, prevPath: "/orders/history" } }}>
                                                <Button variant="link">Billing Details</Button>
                                            </Link>
                                        </Col>
                                        <Col align="center">
                                            <b>Order Status</b><br />
                                            {order.order_status}
                                            <br /><br />
                                            <Link to={{ pathname: "/orders/messenger", state: { order_details: order, prevPath: "/orders/history" } }}>
                                                <Button variant="success" name={order._id}>Message Restaurant</Button>&nbsp;
                                        </Link>
                                        </Col>
                                    </Row>
                                </Card.Body>
                            </Card>
                        </Draggable>
                    );

                });
            }
        }
        else if (this.state && this.state.message === "NO_COMPLETED_ORDERS") {
            message = <Alert variant="warning">You do not have any orders made in the past.</Alert>
        }
        return (
            <div>
                <Container className="justify-content">
                    <h3>Your past orders</h3>
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

CustomerOrderHistory.propTypes = {
    getCustomerPastOrders: PropTypes.func.isRequired,
    orders_list: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
    orders_list: state.order.orders_list
});

export default connect(mapStateToProps, { getCustomerPastOrders })(CustomerOrderHistory);