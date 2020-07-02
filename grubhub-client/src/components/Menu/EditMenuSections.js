import React, { Component } from "react";
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Form, Col, Row, Container, Button, Alert } from "react-bootstrap";
import { Redirect } from "react-router";
import { editMenuSection } from '../../actions/menuSectionActions'

class EditMenuSections extends Component {
    constructor(props) {
        super(props);
        this.state = {
        };

        this.onChange = this.onChange.bind(this);
        this.onSubmit = this.onSubmit.bind(this);
    }

    componentWillReceiveProps(nextProps) {
        if (nextProps.section) {
            var { section } = nextProps;
            this.setState({
                message: section
            });
        }
    }

    componentWillMount() {
        if (this.props.location.state && this.props.location.state.menu_section_id) {
            let menu_section_name = this.props.location.state.menu_section_name;
            let menu_section_id = this.props.location.state.menu_section_id;
            this.setState({
                menu_section_name: menu_section_name,
                menu_section_id: menu_section_id
            });
        }
        else {
            this.setState({
                noRecordFlag: true
            });
        }
    }

    onChange = e => {
        this.setState({
            [e.target.name]: e.target.value
        });
    };

    onSubmit = e => {
        e.preventDefault();
        const data = {
            user_id: localStorage.getItem("user_id"),
            _id: this.state.menu_section_id,
            menu_section_name: this.state.menu_section_name
        };

        this.props.editMenuSection(data);
    };

    render() {
        let message = null,
            menuSectionName = null,
            redirectVar = null;

        if (this.state.message === "SECTION_EXISTS") {
            message = <Alert variant="warning">A section with name {this.state.menu_section_name} already exists</Alert>;
        } else if (this.state.message === "SECTION_UPDATED" || this.state.noRecordFlag) {
            redirectVar = <Redirect to="/menu/section" />;
        }

        if (this.state && this.state.menu_section_name) {
            menuSectionName = this.state.menu_section_name;
        }

        return (
            <div>
                {redirectVar}
                <Container className="justify-content">
                    <br />
                    <h3>Update Section</h3><br />
                    <Form onSubmit={this.onSubmit}>
                        <Form.Group as={Row} controlId="menu_section_name">
                            <Form.Label column sm="2">
                                Section Name:
                            </Form.Label>
                            <Col sm="4">
                                <Form.Control
                                    style={{ width: "15rem" }}
                                    type="text"
                                    name="menu_section_name"
                                    defaultValue={menuSectionName}
                                    onChange={this.onChange}
                                    pattern="^[A-Za-z ]+$"
                                    required
                                />
                            </Col>
                            <Col sm="6">
                                <Button variant="success" type="sumbit">Update</Button>&nbsp;
                                <Button variant="warning" href="/menu/section">Cancel</Button>
                            </Col>
                        </Form.Group>
                    </Form>
                    {message}
                </Container>
            </div>
        );
    }
}

EditMenuSections.propTypes = {
    editMenuSection: PropTypes.func.isRequired,
    section: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
    section: state.menuSection.section
});

export default connect(mapStateToProps, { editMenuSection })(EditMenuSections);