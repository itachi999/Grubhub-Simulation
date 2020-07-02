import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { customerSignup } from '../../actions/signupActions'
import { Redirect } from 'react-router';
import { Link } from 'react-router-dom';
import { Row, Col } from 'react-bootstrap';
import grubhubLoginImage from '../../images/GrubhubLoginImage.png'

class CustomerSignup extends Component {
    constructor(props) {
        super(props);
        this.state = {};
    }

    componentWillReceiveProps(nextProps) {
        if (nextProps.user) {
            var { user } = nextProps;

            if (user === "USER_ADDED" || user === "USER_EXISTS") {
                this.setState({
                    signupFlag: 1
                });
            } 
        }
    }

    onChange = (e) => {
        this.setState({
            [e.target.name]: e.target.value
        })
    }


    onSubmit = (e) => {
        //prevent page from refresh
        e.preventDefault();
        const data = {
            name: this.state.name,
            email_id: this.state.email_id,
            password: this.state.password,
            address: this.state.address,
            phone_number: this.state.phone_number
        }

        this.props.customerSignup(data);
    }

    render() {
        //redirect based on successful signup
        let redirectVar = null;
        let message = "";
        if (localStorage.getItem("token")) {
            redirectVar = <Redirect to="/Home" />
        }
        else if (this.props.user === "USER_ADDED" && this.state.signupFlag) {
            alert("You have registered successfully");
            redirectVar = <Redirect to="/Login" />
        }
        else if(this.props.user === "USER_EXISTS" && this.state.signupFlag){
            message = "Email id is already registered"
        }
        return (
            <div>
                {redirectVar}
                <Row>
                    <Col>
                        <div>
                            <img src={grubhubLoginImage} style={{ height: 'fit-content' }} alt='GrubHub' />
                        </div>
                    </Col>
                    <Col>
                        <div class="container">
                            <div class="login-form">
                                <div class="main-div">
                                    <div class="panel">
                                        <h2>Signup for Grubhub account</h2>
                                    </div>
                                    <form onSubmit={this.onSubmit}>
                                        <div class="form-group">
                                            <input type="text" class="form-control" name="name" onChange={this.onChange} placeholder="Name" pattern="^[A-Za-z0-9 ]+$" required />
                                        </div>
                                        <div class="form-group">
                                            <input type="email" class="form-control" name="email_id" onChange={this.onChange} placeholder="Email Id" pattern="^[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$'%&*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])$" title="Please enter valid email address" required />
                                        </div>
                                        <div class="form-group">
                                            <input type="password" class="form-control" name="password" onChange={this.onChange} placeholder="Password" required />
                                        </div>
                                        <div class="form-group">
                                            <input type="text" class="form-control" name="address" onChange={this.onChange} placeholder="Address" pattern="^[A-Za-z0-9 ,-]+$" required />
                                        </div>
                                        <div class="form-group">
                                            <input type="text" class="form-control" name="phone_number" onChange={this.onChange} placeholder="Phone Number" pattern="^[0-9]+$" required />
                                        </div>
                                        <div style={{ color: "#ff0000" }}>{message}</div><br />
                                        <button type="submit" class="btn btn-primary">Signup</button><br /><br />
                                        <div><Link to='/ownersignup'>Signup as Restaurant Owner</Link></div><br />
                                        <div>Already have an account? <Link to='/login'>Login</Link></div>
                                    </form>
                                </div>
                            </div>
                        </div>
                    </Col>
                </Row>
            </div>
        )
    }
}

CustomerSignup.propTypes = {
    customerSignup: PropTypes.func.isRequired,
    user: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
    user: state.signup.user
});

export default connect(mapStateToProps, { customerSignup })(CustomerSignup);