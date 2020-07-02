import React, { Component } from 'react';
import { Redirect } from 'react-router';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Link } from "react-router-dom";
import { Button, Container, Card, Col, Row, Form, Image, Alert } from "react-bootstrap";
import Navigationbar from '../Navigationbar.js';
import { getMessages, sendMessage } from '../../actions/messageActions'
import backendServer from "../../webConfig";

class OrderMessenger extends Component {
    constructor(props) {
        super(props);

        this.getMessages();
    }

    componentWillMount() {
        if (this.props.location.state) {
            this.setState({
                order_details: this.props.location.state.order_details,
                prevPath: this.props.location.state.prevPath
            });
        }
    }

    componentWillReceiveProps(nextProps) {
        var { messages } = nextProps;

        if (messages === "NO_MESSAGES") {
            this.setState({
                status: messages
            });
        } 
        else if (messages === "MESSAGE_SENT") {
            this.getMessages();
        }
        else if (messages.length > 0) {
            this.setState({
                messages: messages
            });
        }
    }

    onChange = (e) => {
        this.setState({
            [e.target.name]: e.target.value
        })
    }

    getMessages = () => {
        let order_id;
        if (this.props.location.state) {
            order_id = this.props.location.state.order_details._id;
            this.props.getMessages(order_id);
        }
    };

    sendMessage = (e) => {
        e.preventDefault();
        let data = {
            order_id: this.state.order_details._id,
            message: this.state.input_message,
            sender_id: localStorage.getItem("user_id"),
            receiver_id: localStorage.getItem("user_id") === this.state.order_details.customer.customer_id ? this.state.order_details.restaurant.owner_user_id : this.state.order_details.customer.customer_id,
            sender_name: localStorage.getItem("user_id") === this.state.order_details.customer.customer_id ? this.state.order_details.customer.customer_name : this.state.order_details.restaurant.res_name,
            receiver_name: localStorage.getItem("user_id") === this.state.order_details.customer.customer_id ? this.state.order_details.restaurant.res_name : this.state.order_details.customer.customer_name,
            sender_image: localStorage.getItem("user_id") === this.state.order_details.customer.customer_id ? this.state.order_details.customer.customer_image : this.state.order_details.restaurant.res_image
        };

        this.props.sendMessage(data);
    };

    render() {
        let redirectVar = null;
        let messageCards = null;
        let messageCard;
        let imageSrc = null;
        let resImageSrc = null;
        let prevPath;
        let restaurantCard = null;
        if (!localStorage.getItem("token") || !this.props.location.state) {
            redirectVar = <Redirect to="/" />;
        }

        if (this.state && this.state.status === "NO_MESSAGES") {
            messageCards = (
                <Alert variant="warning">You do not have any messages from this order.</Alert>
            );
        }

        if (this.state && this.state.prevPath) {
            prevPath = this.state.prevPath;
        }
        if (this.state && this.state.order_details) {
            resImageSrc = `${backendServer}/grubhub/images/restaurant/${this.state.order_details.restaurant.res_image}`;
            restaurantCard = (
                <div>
                    <Card bg="info" text="white" style={{ width: "70rem", height: "8rem" }}>
                        <Row>
                            <Col>
                                <Card.Img style={{ width: "8rem", height: "8rem" }} src={resImageSrc} />
                            </Col>
                            <Card.Body>
                                <Card.Title><h1>{this.state.order_details.restaurant.res_name}</h1></Card.Title>
                            </Card.Body>
                        </Row>
                    </Card>
                    <br />
                </div>
            );
        }
        if (this.state && this.state.messages) {
            let messages = this.state.messages;
            messageCards = [];
            for (let i = 0; i < messages.length; i++) {
                imageSrc = `${backendServer}/grubhub/images/user/${messages[i].sender_image}`;
                messageCard = (
                    <Card style={{ width: "40rem" }}>
                        <Row>
                            <Col>
                                <Image src={imageSrc} style={{ width: "7rem", height: "7rem" }} roundedCircle />
                            </Col>
                            <Col sm={9}>
                                <Card.Body>
                                    <b>{messages[i].sender_name}:</b><br />
                                    {messages[i].message_content}
                                </Card.Body>
                                <Card.Subtitle className="mb-2 text-muted" align="right">{messages[i].message_time}</Card.Subtitle>
                            </Col>
                        </Row>
                    </Card>
                );
                if (messages[i].sender_id === localStorage.getItem("user_id")) {
                    messageCards.push(
                        <div>
                            <Row>
                                <Col sm={4}></Col>
                                <Col>
                                    {messageCard}
                                </Col>
                            </Row>
                            <br />
                        </div>
                    );
                }
                else {
                    messageCards.push(
                        <div>
                            <Row>
                                <Col>
                                    {messageCard}
                                </Col>
                            </Row>
                            <br />
                        </div>
                    );
                }
            }
        }

        return (
            <div>
                <Navigationbar /><br />
                {redirectVar}
                <Container className="justify-content">
                    {restaurantCard}
                    {messageCards}
                    <Form onSubmit={this.sendMessage} >
                        <Form.Control as="textarea" rows="3" name="input_message" placeholder="Type your message..." onChange={this.onChange} pattern="^[A-Za-z0-9 ,.-]+$" required />
                        <br />
                        <center>
                            <Button type="submit" variant="success">Send</Button>{"  "}
                            <Link to={prevPath}><Button variant="primary">Back</Button></Link>
                        </center>
                    </Form>
                </Container>
            </div>
        );
    }
}

OrderMessenger.propTypes = {
    sendMessage: PropTypes.func.isRequired,
    getMessages: PropTypes.func.isRequired,
    messages: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
    messages: state.messenger.messages,
    status: state.messenger.status
});

export default connect(mapStateToProps, { sendMessage, getMessages })(OrderMessenger);