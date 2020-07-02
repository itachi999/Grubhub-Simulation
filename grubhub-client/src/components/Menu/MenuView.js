import React, { Component } from "react";
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Container, Alert, Pagination, Col, Row } from "react-bootstrap";
import { deleteMenuItem } from '../../actions/menuItemActions'
import { getMenuSections } from '../../actions/menuSectionActions'
import ItemCard from "./ItemCard";

class MenuView extends Component {
    constructor(props) {
        super(props);
        this.state = {
            menu_sections: [],
            menu_items: [],
            activePage: 1
        };

        this.sectionItems = this.sectionItems.bind(this);
        this.deleteItem = this.deleteItem.bind(this);
        this.changePage = this.changePage.bind(this);
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
            else if(section.length){
                this.setState({
                    menu_sections: section
                });
            }
        }
        if (nextProps.item) {
            var { item } = nextProps;

            if (item.status && item.status === "ITEM_DELETED") {
                this.setState({
                    message: item.status,
                    menu_sections: item.menu_sections
                });
            }
        }
    };

    sectionItems = (menu_section) => {
        var itemsRender = [], items, item, section;
        items = menu_section.menu_items.map(menu_item => {
            menu_item.menu_section_name = menu_section.menu_section_name;
            return menu_item;
        });
        if (items.length > 0) {
            section = <h4>{menu_section.menu_section_name}</h4>;
            itemsRender.push(section);
            for (var i = 0; i < items.length; i++) {
                item = <ItemCard menu_item={items[i]} deleteItem={this.deleteItem} />;
                itemsRender.push(item);
            }
            return itemsRender;
        }
    };

    deleteItem = (e) => {
        let item = e.target.name;
        const data = {
            user_id: localStorage.getItem("user_id"),
            menu_section_id: item.split("-")[0],
            item_id: item.split("-")[1]
        };
        this.props.deleteMenuItem(data);
    };

    changePage = (e) => {
        let page = this.state.activePage;
        if (e.target.text === ">" && page !== parseInt(e.target.name)) {
            page += 1;
        } else if (e.target.text === "<" && page !== parseInt(e.target.name)) {
            page -= 1;
        } else {
            page = parseInt(e.target.name);
        }
        this.setState({
            activePage: page,
            message: null
        });
    };

    render() {
        let message = null,
            section,
            active = 1,
            itemsToShow = 1,
            pagesBar = null,
            empty_items_flag = 1,
            renderOutput = [];

        if (this.state && this.state.activePage) {
            active = this.state.activePage;
        }

        if (this.state && this.state.menu_sections && this.state.menu_sections.length > 0) {
            let menu_sections = this.state.menu_sections.filter(menu_section => menu_section.menu_items.length);
            let sectionCount = 0;
            for (var i = (active - 1) * itemsToShow; i < menu_sections.length; i++) {
                if (menu_sections[i].menu_items.length > 0)
                    empty_items_flag = 0;
                section = this.sectionItems(menu_sections[i]);
                renderOutput.push(section);
                if (++sectionCount === itemsToShow)
                    break;
            }

            let pages = [];
            let pageCount = Math.ceil(menu_sections.length / itemsToShow);

            for (let i = 1; i <= pageCount; i++) {
                pages.push(
                    <Pagination.Item active={i === active} name={i} key={i} onClick={this.changePage}>
                        {i}
                    </Pagination.Item>
                );
            }
            pagesBar = (
                <div>
                    <br />
                    <Pagination>
                        <Pagination.Prev name="1" onClick={this.changePage} />
                        {pages}
                        <Pagination.Next name={pageCount} onClick={this.changePage} />
                    </Pagination>
                </div>
            );
        }

        if (this.state.message === "ITEM_DELETED") {
            message = <Alert variant="warning">Item deleted successfully!</Alert>;
        }
        else if (this.state.message === "NO_RECORD" || empty_items_flag) {
            message = <Alert variant="warning">You have not added any items in your Menu.</Alert>;
        }


        return (
            <Container className="justify-content">
                <br />
                <h3>Menu</h3>
                {message}
                {renderOutput}
                <Row>
                <Col sm={4}></Col>
                <Col>{pagesBar}</Col>
                </Row>
            </Container>
        );
    }
}

MenuView.propTypes = {
    deleteMenuItem: PropTypes.func.isRequired,
    getMenuSections: PropTypes.func.isRequired,
    item: PropTypes.object.isRequired,
    section: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
    item: state.menuItem.item,
    section: state.menuSection.section
});

export default connect(mapStateToProps, { getMenuSections, deleteMenuItem })(MenuView);