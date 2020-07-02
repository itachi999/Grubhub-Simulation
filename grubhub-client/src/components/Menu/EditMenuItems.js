import React, { Component } from "react";
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Form, Col, Row, Button, Alert, Card } from "react-bootstrap";
import { Redirect } from "react-router";
import { editMenuItem } from '../../actions/menuItemActions'
import { uploadItemImage } from '../../actions/imageUploadActions';
import backendServer from "../../webConfig";

class EditMenuItems extends Component {
    constructor(props) {
        super(props);
        this.state = {
            menu_sections: []
        };

        this.onChange = this.onChange.bind(this);
        this.onSubmit = this.onSubmit.bind(this);
        this.onImageChange = this.onImageChange.bind(this);
        this.onUpload = this.onUpload.bind(this);
    }

    componentWillReceiveProps(nextProps) {
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

    componentWillMount() {
        if (this.props.location.state) {
            this.setState({
                item_id: this.props.location.state._id,
                item_name: this.props.location.state.item_name,
                item_description: this.props.location.state.item_description,
                item_price: this.props.location.state.item_price,
                item_image: this.props.location.state.item_image,
                menu_section_id: this.props.location.state.menu_section,
                menu_section_name: this.props.location.state.menu_section_name
            });
        }
        else {
            this.setState({
                noRecordFlag: true
            });
        }
    };

    onChange = e => {
        this.setState({
            [e.target.name]: e.target.value
        });
    };

    onSubmit = e => {
        e.preventDefault();
        const data = {
            user_id: localStorage.getItem("user_id"),
            item_id: this.state.item_id,
            item_name: this.state.item_name,
            item_description: this.state.item_description,
            item_price: this.state.item_price,
            menu_section_name: this.state.menu_section_name,
            menu_section_id: this.state.menu_section_id,
            item_image: this.state.item_image
        };

        this.props.editMenuItem(data);
        this.setState({
            updateAction: true
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
    }

    render() {
        let message = null,
            redirectVar = null;

        if (this.state.message === "ITEM_UPDATED" && this.state.updateAction) {
            redirectVar = <Redirect to="/menu/view" />;
        }
        else if (this.state.message === "ITEM_EXISTS") {
            message = <Alert variant="warning">A item with name {this.state.item_name} already exists</Alert>;
        }

        if (this.state && this.state.noRecordFlag) {
            redirectVar = <Redirect to="/menu/view" />;
        }

        var imageSrc,
            fileText = this.state.fileText || "Choose image..";
        if (this.state) {
            imageSrc = `${backendServer}/grubhub/images/item/${this.state.item_image}`;
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
                        <h3>Edit Menu Item</h3><br />
                        <Form onSubmit={this.onSubmit}>
                            <Form.Group as={Row} controlId="item_name">
                                <Form.Label column sm="3">
                                    Item Name:
                                </Form.Label>
                                <Col sm="4">
                                    <Form.Control style={{ width: "15rem" }} type="text" name="item_name" placeholder="Enter Item Name.." defaultValue={this.state.item_name} onChange={this.onChange} pattern="^[A-Za-z0-9 ]+$" required />
                                </Col>
                            </Form.Group>
                            <Form.Group as={Row} controlId="item_description">
                                <Form.Label column sm="3">
                                    Item Description:
                                </Form.Label>
                                <Col sm="4">
                                    <Form.Control style={{ width: "15rem" }} type="text" name="item_description" placeholder="Enter Item Description.." defaultValue={this.state.item_description} onChange={this.onChange} pattern="^[A-Za-z0-9 ,.-]+$" required />
                                </Col>
                            </Form.Group>
                            <Form.Group as={Row} controlId="item_price">
                                <Form.Label column sm="3">Price: </Form.Label>
                                <Col sm="4">
                                    <Form.Control style={{ width: "15rem" }} type="text" name="item_price" placeholder="Enter Price.." defaultValue={this.state.item_price} onChange={this.onChange} pattern="^(\d*\.)?\d+$" required />
                                </Col>
                            </Form.Group>
                            <Form.Group as={Row} controlId="item_section">
                                <Form.Label column sm="3">Section:</Form.Label>
                                <Col sm="4">
                                    <Form.Control style={{ width: "15rem" }} type="text" name="menu_section_name" defaultValue={this.state.menu_section_name} disabled />
                                </Col>
                            </Form.Group>
                            <Button type="sumbit">Update Item</Button>&nbsp;
                            <Button variant="warning" href="/menu/view">Cancel</Button>
                        </Form>
                        {message}
                    </Col>
                </Row>
            </div>
        );
    }
}

EditMenuItems.propTypes = {
    editMenuItem: PropTypes.func.isRequired,
    uploadItemImage: PropTypes.func.isRequired,
    section: PropTypes.object.isRequired,
    item_image: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
    item: state.menuItem.item,
    item_image: state.image.item_image
});

export default connect(mapStateToProps, { editMenuItem, uploadItemImage })(EditMenuItems);