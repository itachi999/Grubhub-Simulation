import React, { Component } from 'react';
import '../App.css';
import { Redirect } from 'react-router';
import Navigationbar from './Navigationbar'
import CustomerCarousel from "../images/order.jpg"
import OwnerCarousel from "../images/owner.jpg"
import { Carousel } from 'react-bootstrap';

class LandingPage extends Component {
    render() {
        let redirectVar = null;
        if (localStorage.getItem("token")) {
            redirectVar = <Redirect to="/home" />
        }
        return (
            <div>
                {redirectVar}
                <Navigationbar />
                <div>
                    <center>
                        <Carousel>
                            <Carousel.Item>
                                <img
                                    className="d-block w-100"
                                    src={CustomerCarousel}
                                    alt="Customer"
                                />
                            </Carousel.Item>
                            <Carousel.Item>
                                <Carousel.Caption>
                                    <h3>Do you own a restaurant?</h3>
                                    <p>Enroll your restaurant with us to get your orders online</p>
                                </Carousel.Caption>
                                <img
                                    className="d-block w-100"
                                    src={OwnerCarousel}
                                    alt="Restaurant"
                                />
                            </Carousel.Item>
                        </Carousel>
                    </center>
                </div>
            </div>
        )
    }
}

export default LandingPage;