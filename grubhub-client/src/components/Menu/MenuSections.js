import React, { Component } from "react";
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Form, Col, Row, Container, Button, Alert } from "react-bootstrap";
import { Link } from "react-router-dom";
import { getMenuSections, addMenuSection, deleteMenuSection } from '../../actions/menuSectionActions'

class MenuSections extends Component {
    constructor(props) {
        super(props);
        this.state = {
            menu_section_name: "",
            menu_sections: []
        };

        this.onChange = this.onChange.bind(this);
        this.deleteSection = this.deleteSection.bind(this);
        this.props.getMenuSections();
    }

    onChange = e => {
        this.setState({
            [e.target.name]: e.target.value
        });
    };

    componentWillReceiveProps(nextProps) {
        if (nextProps.section) {
            var { section } = nextProps;

            if (section === "NO_RECORD" || section === "SECTION_EXISTS") {
                this.setState({
                    message: section
                });
            }
            else if (section === "SECTION_ADDED" || section === "SECTION_DELETED") {
                this.setState({
                    message: section
                });
                this.props.getMenuSections();
            }
            else if (section.length) {
                this.setState({
                    menu_sections: section
                });
            }
        }
    }

    deleteSection = (e) => {
        const data = {
            user_id: localStorage.getItem("user_id"),
            _id: e.target.name,
        };
        this.props.deleteMenuSection(data);
    };

    onSubmit = e => {
        e.preventDefault();
        const data = {
            user_id: localStorage.getItem("user_id"),
            menu_section_name: this.state.menu_section_name
        };

        this.props.addMenuSection(data);
    };

    render() {
        let message = null,
            menuSectionsList = null;

        if (this.state.message === "SECTION_ADDED") {
            message = <Alert variant="success">Section Added Succesfully</Alert>;
        }
        else if (this.state.message === "SECTION_EXISTS") {
            message = <Alert variant="warning">A section with this name already exists</Alert>;
        }
        else if (this.state.message === "NO_RECORD") {
            message = <Alert variant="warning">You have not added any sections in your Menu.</Alert>;
        }
        else if (this.state.message === "SECTION_DELETED") {
            message = <Alert variant="warning">Section deleted successfully!</Alert>;
        }
        if (this.state && this.state.menu_sections && this.state.menu_sections.length > 0) {
            menuSectionsList = this.state.menu_sections.map(menu_section => {
                return (
                    <tr>
                        <td>
                            {menu_section.menu_section_name}
                        </td>
                        <td align="right">
                            <Link to={{pathname: "/menu/section/update", state: {menu_section_id: menu_section._id, menu_section_name: menu_section.menu_section_name}}}>
                                <Button variant="link" name={menu_section.menu_section_name}>Edit</Button>&nbsp;
                            </Link>
                            <Button variant="link" onClick={this.deleteSection} name={menu_section._id}>Delete</Button>
                        </td>
                    </tr>
                )
            })
        }

        return (
            <Container className="justify-content">
                <br />
                <h3>Add New Section</h3><br />
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
                                placeholder="Enter Menu Section.."
                                onChange={this.onChange}
                                pattern="^[A-Za-z ]+$"
                                required
                            />
                        </Col>
                        <Col sm="6">
                            <Button type="sumbit">Add Section</Button>
                        </Col>
                    </Form.Group>
                </Form>
                {message}
                <br /><br />
                <table class="table" style={{ width: "50%" }}>
                    <thead>
                        <th>Sections</th>
                    </thead>
                    <tbody>
                        {menuSectionsList}
                    </tbody>
                </table>
            </Container>
        );
    }
}

MenuSections.propTypes = {
    getMenuSections: PropTypes.func.isRequired,
    addMenuSection: PropTypes.func.isRequired,
    deleteMenuSection: PropTypes.func.isRequired,
    section: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
    section: state.menuSection.section
});

export default connect(mapStateToProps, { getMenuSections, addMenuSection, deleteMenuSection })(MenuSections);