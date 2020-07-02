import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import backendServer from "../../webConfig";
import { Card, Container, Col, Form, Row, Button, Alert } from "react-bootstrap";
import Draggable from "react-draggable";
import { Link } from "react-router-dom";
import { getOwnerCurrentOrders, changeOrderStatus } from '../../actions/orderActions'
import { getOwner } from '../../actions/profileActions'

class OwnerHome extends Component {
    constructor(props) {
        super(props);

        this.props.getOwnerCurrentOrders();
        this.props.getOwner();
        this.onStatusChange = this.onStatusChange.bind(this);
    }

    componentWillReceiveProps(nextProps) {
        if (nextProps.orders_list) {
            var { orders_list, user } = nextProps;

            if (orders_list === "NO_PENDING_ORDERS") {
                this.setState({
                    message: orders_list,
                    pending_orders: []
                });
            }
            else if (orders_list === "STATUS_UPDATED") {
                this.props.getOwnerCurrentOrders();
                this.setState({
                    message: orders_list
                });
            }
            else if (orders_list.length) {
                this.setState({
                    pending_orders: orders_list
                });
            }

            if(user){
                this.setState({
                    restaurant: user
                });
            }
        }
    }

    onStatusChange = (e) => {
        e.preventDefault();
        let order_id = e.target.name;
        let newStatus = e.target.value;
        let orders = this.state.pending_orders;
        let index = orders.findIndex((order => order._id === order_id));
        orders[index].order_status = newStatus;

        let data = {
            order_id: order_id,
            order_status: newStatus
        };

        this.props.changeOrderStatus(data);
    };

    render() {
        let orders = [];
        let orderCards = null;
        let message = null;
        let statusDropdown;
        let statusOptions;
        let statuses = ["ORDER_PLACED", "ORDER_CONFIRMED", "PREPARING", "OUT_FOR_DELIVERY", "DELIVERED", "ORDER_DECLINED"];
        let restaurantDetails = null;

        if (this.state && this.state.message === "NO_PENDING_ORDERS" && typeof this.state.pending_orders !== "string" && this.state.pending_orders.length === 0) {
            message = (
                <Alert variant="warning">You do not have any pending orders.</Alert>
            );
        }
        else if (this.state && this.state.message === "STATUS_UPDATED") {
            message = (
                <Alert variant="success">Order Status Updated</Alert>
            );
        }

        if (this.state && this.state.restaurant) {
            let restaurant = this.state.restaurant;
            let resImageSrc = `${backendServer}/grubhub/images/restaurant/${restaurant.res_image}`;
            restaurantDetails = (
                <Card bg="info" text="white" style={{ width: "70rem", height: "15rem", margin: "2%" }}>
                    <Row>
                        <Col>
                            <Card.Img style={{ width: "18rem", height: "15rem" }} src={resImageSrc} />
                        </Col>
                        <Card.Body>
                            <Card.Title><h1>{restaurant.res_name}</h1></Card.Title>
                            <br />
                            <Card.Text><h4>{restaurant.address} | {restaurant.res_zip_code} | {restaurant.phone_number}</h4></Card.Text>
                            <br />
                            <Card.Text><h4>Cuisine: {restaurant.res_cuisine}</h4></Card.Text>
                        </Card.Body>
                    </Row>
                </Card>
            );
        }
        if (this.state && this.state.pending_orders && typeof this.state.pending_orders !== "string") {
            orders = this.state.pending_orders;
            if (orders.length > 0) {
                orderCards = orders.map(order => {
                    statusOptions = statuses.map(status => {
                        if (status === order.order_status) {
                            return <option selected>{status}</option>;
                        }
                        return <option>{status}</option>;
                    });
                    statusDropdown = (
                        <Form.Control as="select" style={{ width: "80%" }} name={order._id} onChange={this.onStatusChange}>
                            {statusOptions}
                        </Form.Control>
                    );
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
                                            <Link to={{ pathname: "/orders/details", state: { order_details: order, prevPath: "/home" } }}>
                                                <Button variant="link">Order Details</Button>
                                            </Link>
                                            <Link to={{ pathname: "/orders/billing", state: { order_details: order, prevPath: "/home" } }}>
                                                <Button variant="link">Billing Details</Button>
                                            </Link>
                                        </Col>
                                        <Col align="center">
                                            <b>Order Status</b>
                                            <br />
                                            {statusDropdown}
                                            <br />
                                            <Link to={{ pathname: "/orders/messenger", state: { order_details: order, prevPath: "/home" } }}>
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
        return (
            <div>
                <Container className="justify-content">
                    <br />
                    {restaurantDetails}
                    <h4>Pending Orders</h4>
                    <br />
                    {message}
                    {orderCards}
                </Container>
            </div>
        )
    }
}

OwnerHome.propTypes = {
    getOwnerCurrentOrders: PropTypes.func.isRequired,
    getOwner: PropTypes.func.isRequired,
    changeOrderStatus: PropTypes.func.isRequired,
    orders_list: PropTypes.object.isRequired,
    user: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
    orders_list: state.order.orders_list,
    user: state.profile.user
});

export default connect(mapStateToProps, { getOwnerCurrentOrders, getOwner, changeOrderStatus })(OwnerHome);