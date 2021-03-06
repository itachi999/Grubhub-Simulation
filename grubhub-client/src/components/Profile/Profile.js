import React, { Component } from 'react';
import { Redirect } from 'react-router';
import Navigationbar from '../Navigationbar';
import CustomerProfile from './CustomerProfile';
import OwnerProfile from './OwnerProfile';

class Profile extends Component {
    componentWillMount(){
        document.title = "Your Profile";
    }
    render() {
        let profileComponent = null;
        let redirectVar = null;
        if (localStorage.getItem("token")) {
            if (localStorage.getItem("is_owner") === "true")
                profileComponent = <OwnerProfile />
            else
                profileComponent = <CustomerProfile />
        }
        else {
            redirectVar = <Redirect to="/" />
        }
        return (
            <div>
                {redirectVar}
                <Navigationbar /><br />
                {profileComponent}
            </div>
        )
    }
}
export default Profile;