import React, { Component } from "react";
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Form, Col, Row, Button, Alert, Card } from "react-bootstrap";
import { Redirect } from "react-router";
import { addMenuItem } from '../../actions/menuItemActions';
import { getMenuSections } from '../../actions/menuSectionActions';
import { uploadItemImage } from '../../actions/imageUploadActions';
import backendServer from "../../webConfig"

class MenuItems extends Component {
    constructor(props) {
        super(props);
        this.state = {
            menu_sections: []
        };

        this.onChange = this.onChange.bind(this);
        this.onSubmit = this.onSubmit.bind(this);
        this.onImageChange = this.onImageChange.bind(this);
        this.onUpload = this.onUpload.bind(this);
        this.props.getMenuSections();
    }

    componentWillReceiveProps(nextProps) {
        if (nextProps.section) {
            var { section } = nextProps;

            if (section === "NO_RECORD") {
                this.setState({
                    message: section
                });
            }
            else if (section.length) {
                this.setState({
                    menu_sections: section
                });
            }
        }
        if (nextProps.item) {
            var { item } = nextProps;

            this.setState({
                message: item
            });
        }
        if (nextProps.item_image) {
            var { item_image } = nextProps;

            if (typeof item_image === "string") {
                this.setState({
                    fileText: "Choose file...",
                    item_image: item_image
                });
            }
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
            item_name: this.state.item_name,
            item_description: this.state.item_description,
            item_price: this.state.item_price,
            menu_section_name: this.state.menu_section_name || this.state.menu_sections[0].menu_section_name,
            item_image: this.state.item_image
        };

        this.props.addMenuItem(data);
        this.setState({
            itemAdded: true
        });
    };

    onImageChange = (e) => {
        this.setState({
            file: e.target.files[0],
            fileText: e.target.files[0].name
        });
    }

    onUpload = (e) => {
        e.preventDefault();
        const formData = new FormData();
        formData.append("itemimage", this.state.file);
        const uploadConfig = {
            headers: {
                "content-type": "multipart/form-data"
            }
        };

        this.props.uploadItemImage(formData, uploadConfig);
        this.setState({
            imgUploaded: true
        });
    }

    render() {
        let message = null, redirectVar = null;
        if (this.state.message === "ITEM_ADDED" && this.state.itemAdded) {
            redirectVar = <Redirect to="/menu/view" />;
        }
        else if (this.state.message === "ITEM_EXISTS") {
            message = <Alert variant="warning">A item with this name already exists</Alert>;
        }
        else if (this.state.message === "NO_RECORD") {
            message = <Alert variant="warning">There are no sections added</Alert>;
        }

        let section_options = null;
        if (this.state && this.state.menu_sections && this.state.menu_sections.length > 0) {
            section_options = this.state.menu_sections.map(menu_section => {
                return (
                    <option>{menu_section.menu_section_name}</option>
                );
            })
        }

        var imageSrc,
            fileText = this.state.fileText || "Choose image..";
        if (this.state && this.state.imgUploaded) {
            imageSrc = `${backendServer}/grubhub/images/item/${this.state.item_image}`;
        }
        else if(this.state) {
            imageSrc = `${backendServer}/grubhub/images/item/itemplaceholder.jpg`;
        }
        return (
            <div>
                {redirectVar}
                <Row>
                    <Col xs={6} md={4}>
                        <center>
                            <br /><br />
                            <Card style={{ width: '18rem' }}>
                                <Card.Img variant="top" src={imageSrc} />
                            </Card>
                            <form onSubmit={this.onUpload}><br /><br /><br />
                                <div class="custom-file" style={{ width: "80%" }}>
                                    <input type="file" class="custom-file-input" name="image" accept="image/*" onChange={this.onImageChange} required />
                                    <label class="custom-file-label" for="image" style={{ "text-align": "left" }}>{fileText}</label>
                                </div><br /><br />
                                <Button type="submit" variant="primary">Upload</Button>
                            </form>
                        </center>
                    </Col>
                    <Col>
                        <br /><br />
                        <h3>Add New Menu Item</h3><br />
                        <Form onSubmit={this.onSubmit}>
                            <Form.Group as={Row} controlId="item_name">
                                <Form.Label column sm="3">
                                    Item Name:
                                </Form.Label>
                                <Col sm="4">
                                    <Form.Control style={{ width: "15rem" }} type="text" name="item_name" placeholder="Enter Item Name.." onChange={this.onChange} pattern="^[A-Za-z0-9 ]+$" required />
                                </Col>
                            </Form.Group>
                            <Form.Group as={Row} controlId="item_description">
                                <Form.Label column sm="3">
                                    Item Description:
                                </Form.Label>
                                <Col sm="4">
                                    <Form.Control style={{ width: "15rem" }} type="text" name="item_description" placeholder="Enter Item Description.." onChange={this.onChange} pattern="^[A-Za-z0-9 ,.-]+$" required />
                                </Col>
                            </Form.Group>
                            <Form.Group as={Row} controlId="item_price">
                                <Form.Label column sm="3">Price: </Form.Label>
                                <Col sm="4">
                                    <Form.Control style={{ width: "15rem" }} type="text" name="item_price" placeholder="Enter Price.." onChange={this.onChange} pattern="^(\d*\.)?\d+$" required />
                                </Col>
                            </Form.Group>
                            <Form.Group as={Row} controlId="item_section">
                                <Form.Label column sm="3">Section:</Form.Label>
                                <Col sm="4">
                                    <Form.Control as="select" style={{ width: "15rem" }} onChange={this.onChange} name="menu_section_name" required>
                                        {section_options}
                                    </Form.Control>
                                </Col>
                            </Form.Group>
                            <Button type="sumbit">Add Item</Button>
                        </Form>
                        {message}
                    </Col>
                </Row>
            </div>
        );
    }
}

MenuItems.propTypes = {
    addMenuItem: PropTypes.func.isRequired,
    getMenuSections: PropTypes.func.isRequired,
    uploadItemImage: PropTypes.func.isRequired,
    item: PropTypes.object.isRequired,
    item_image: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
    item: state.menuItem.item,
    section: state.menuSection.section,
    item_image: state.image.item_image
});

export default connect(mapStateToProps, { addMenuItem, getMenuSections, uploadItemImage })(MenuItems);