import React, { Component } from 'react';
import { Redirect } from 'react-router';
import { Button, Container, Table, Card } from "react-bootstrap";
import Navigationbar from '../Navigationbar.js';

class OrderItemsView extends Component {
    componentWillMount() {
        if (this.props.location.state) {
            this.setState({
                order_details: this.props.location.state.order_details,
                prevPath: this.props.location.state.prevPath
            });
        }
    }

    render() {
        let order_details;
        let items;
        let itemsRender = [];
        let itemsCard;
        let redirectVar = null;

        if (!localStorage.getItem("token") || !this.props.location.state) {
            redirectVar = <Redirect to="/" />;
        }

        if (this.state && this.state.order_details) {
            order_details = this.state.order_details;
            items = order_details.order_items;
            if (items.length > 0) {
                items.forEach(item => {
                    let itemRow = (
                        <tr>
                            <td colSpan="4" align="center">{item.item_name}</td>
                            <td colSpan="4" align="center">{item.item_quantity}</td>
                        </tr>
                    );
                    itemsRender.push(itemRow);
                });
            }
            itemsCard =
                (
                    <center>
                        <Card style={{ width: "40rem" }}>
                            <Card.Title>
                                <br />
                                <h3>{order_details.restaurant.res_name}</h3>
                            </Card.Title>
                            <Card.Body>
                                <b>Order Details</b>
                                <Table>
                                    <thead align="center">
                                        <th colSpan="4">Item Name</th>
                                        <th colSpan="4">Quantity</th>
                                    </thead>
                                    <tbody>
                                        {itemsRender}
                                        <br />
                                        <br />
                                        <tr>
                                            <td colSpan="4">Customer Name:</td>
                                            <td>{order_details.customer.customer_name}</td>
                                        </tr>
                                        <tr>
                                            <td colSpan="4">Delivery Address:</td>
                                            <td>{order_details.customer.customer_address}</td>
                                        </tr>
                                        <tr>
                                            <td colSpan="4">Contact Number:</td>
                                            <td>{order_details.customer.customer_phone_number}</td>
                                        </tr>
                                        <tr>
                                            <td colSpan="4">Order Date:</td>
                                            <td>{order_details.order_date}</td>
                                        </tr>
                                    </tbody>
                                </Table>
                                <Button variant="secondary" href={this.state.prevPath}>Back</Button>
                            </Card.Body>
                        </Card>
                    </center>
                );
        }
        return (
            <div>
                <Navigationbar /><br />
                {redirectVar}
                <Container className="justify-content">
                    {itemsCard}
                </Container>
            </div>
        );
    }
}

export default OrderItemsView;