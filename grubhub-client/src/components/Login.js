import React, { Component } from 'react';
import { Redirect } from 'react-router';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { userLogin } from '../actions/loginAction'
import grubhubLoginImage from '../images/GrubhubLoginImage.png';
import { Row, Col } from 'react-bootstrap';
const jwt_decode = require('jwt-decode');

class Login extends Component {
    //call the constructor method
    constructor(props) {
        //Call the constrictor of Super class i.e The Component
        super(props);
        //maintain the state required for this component
        this.state = {};
    }

    onChange = (e) => {
        this.setState({
            [e.target.name]: e.target.value
        })
    }

    //submit Login handler to send a request to the node backend
    onSubmit = (e) => {
        e.preventDefault();
        const data = {
            email_id: this.state.email_id,
            password: this.state.password
        }

        this.props.userLogin(data);

        this.setState({
            loginFlag: 1
        });
    }

    render() {
        let redirectVar = null;
        let message = ""

        if (this.props.user && this.props.user.token) {
            localStorage.setItem("token", this.props.user.token);

            var decoded = jwt_decode(this.props.user.token.split(' ')[1]);
            localStorage.setItem("user_id", decoded._id);
            localStorage.setItem("name", decoded.name);
            localStorage.setItem("email_id", decoded.email_id);
            localStorage.setItem("is_owner", decoded.is_owner);
            redirectVar = <Redirect to="/home" />
        }
        else if(this.props.user === "NO_USER" && this.state.loginFlag){
            message = "No user with this email id";
        }
        else if(this.props.user === "INCORRECT_PASSWORD" && this.state.loginFlag){
            message = "Incorrect Password";
        }
  
        return (
            <div>
                {redirectVar}
                <div>
                    <Row>
                        <Col>
                            <img src={grubhubLoginImage} style={{ height: 'fit-content' }} alt='GrubHub' />
                        </Col>
                        <Col>
                            <div>
                                <div class="login-form">
                                    <div class="main-div">
                                        <div class="panel">
                                            <h2>Signin with your Grubhub account</h2>
                                        </div><br/>
                                        <form onSubmit={this.onSubmit}>
                                            <div style={{ color: "#ff0000" }}>{message}</div><br />
                                            <div class="form-group">
                                                <input type="email" class="form-control" onChange={this.onChange} name="email_id" placeholder="Email Id" pattern="^[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$'%&*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])$" title="Please enter valid email address" required />
                                            </div>
                                            <div class="form-group">
                                                <input type="password" class="form-control" onChange={this.onChange} name="password" placeholder="Password" required />
                                            </div>
                                            <button type="submit" class="btn btn-primary">Signin</button><br /><br />
                                            <div><center><Link to="/signup">Create new account</Link></center></div>
                                        </form>
                                    </div>
                                </div>
                            </div>
                        </Col>
                    </Row>
                </div>
            </div>
        )
    }
}

Login.propTypes = {
    userLogin: PropTypes.func.isRequired,
    user: PropTypes.object.isRequired
}

const mapStateToProps = state => { 
    return ({
    user: state.login.user
})};

export default connect(mapStateToProps, { userLogin })(Login);