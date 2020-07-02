import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Draggable from "react-draggable";
import { connect } from 'react-redux';
import { Card, Container, Col, Row, Button, Alert } from "react-bootstrap";
import { Link } from "react-router-dom";
import { getOwnerPastOrders } from '../../actions/orderActions'

class OwnerOrderHistory extends Component {
    constructor(props) {
        super(props);

        this.props.getOwnerPastOrders();
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
                                            <Card.Title>{order.customer.customer_name}</Card.Title>
                                            <Card.Subtitle className="mb-2 text-muted">{order.customer.customer_address}</Card.Subtitle>
                                            <Card.Subtitle className="mb-2 text-muted">{order.customer.customer_phone_number}</Card.Subtitle>
                                            <br />
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
                                                <Button variant="success" name={order._id}>Message Customer</Button>&nbsp;
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
        else {
            message = <Alert variant="warning">You did not complete any orders yet.</Alert>
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

OwnerOrderHistory.propTypes = {
    getOwnerPastOrders: PropTypes.func.isRequired,
    orders_list: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
    orders_list: state.order.orders_list
});

export default connect(mapStateToProps, { getOwnerPastOrders })(OwnerOrderHistory);