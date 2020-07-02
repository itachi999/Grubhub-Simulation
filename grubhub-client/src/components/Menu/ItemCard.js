import React, { Component } from "react";
import { Card, Button, Col, Row } from "react-bootstrap";
import { Link } from "react-router-dom";
import backendServer from "../../webConfig";

class ItemCard extends Component {
  render() {
    let imageSrc = `${backendServer}/grubhub/images/item/${this.props.menu_item.item_image}`;
    return (
      <Card bg="white" style={{ width: "50rem", margin: "2%" }}>
        <Row>
          <Col>
            <Card.Img style={{ width: "12rem", height: "9rem" }} src={imageSrc} />
          </Col>
          <Col align="left">
            <Card.Body>
              <Card.Title>{this.props.menu_item.item_name}</Card.Title>
              <Card.Text><p>{this.props.menu_item.item_description}</p></Card.Text>
              <Card.Text>Price: $ {this.props.menu_item.item_price}</Card.Text>
            </Card.Body>
          </Col>
          <Col align="right">
            <Link to={{ pathname: "/menu/item/update", state: this.props.menu_item }}>
              <Button variant="link" name={this.props.menu_item._id}>Edit</Button>&nbsp;
              </Link>
            <Button variant="link" onClick={this.props.deleteItem} name={this.props.menu_item.menu_section + "-" + this.props.menu_item._id}>Delete</Button>
          </Col>
        </Row>
      </Card>
    );
  }
}

export default ItemCard;