import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { searchRestaurant } from '../../actions/restaurantActions'
import RestaurantCard from "./RestaurantCard";
import { InputGroup, FormControl, Button, DropdownButton, Dropdown, Alert, Col, Row, Pagination } from 'react-bootstrap';

class CustomerHome extends Component {
    constructor(props) {
        super(props);
        this.setState({
            search_input: "",
            noRecord: false
        });

        this.onChange = this.onChange.bind(this);
        this.onSearch = this.onSearch.bind(this);
        this.changePage = this.changePage.bind(this);
        this.onCuisineSelect = this.onCuisineSelect.bind(this);
    }

    componentDidMount() {
        this.props.searchRestaurant("_");
    }

    componentWillReceiveProps(nextProps) {
        if (nextProps.searchResult) {
            var { searchResult } = nextProps;

            if(searchResult.noRecord){
                this.setState({
                    noRecord: searchResult.noRecord
                });
            } else {
                this.setState({
                        restaurantList: searchResult.restaurantList,
                        displayRestaurants: searchResult.restaurantList,
                        cuisineList: searchResult.cuisineList
                });
            }
        }
    }

    onChange = (e) => {
        this.setState({
            [e.target.name]: e.target.value,
            noRecord: false
        });
    }

    onSearch = (e) => {
        e.preventDefault();
        if (this.state) {
            var searchInput = typeof this.state.search_input === "undefined" || this.state.search_input === "" ? "_" : this.state.search_input;
            this.props.searchRestaurant(searchInput);
            this.setState({
                activePage: 1
            });
        }
    }

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
            activePage: page
        });
    };

    onCuisineSelect = (e) => {
        var filteredList = this.state.restaurantList.filter(restaurant => restaurant.res_cuisine === e.target.text);
        this.setState({
            displayRestaurants: filteredList,
            activePage: 1
        });
    }

    render() {
        var cuisineDropdown = null,
            restaurantCards = [],
            resCard = null,
            pagesBar = null,
            active = 1,
            itemsToShow = 4,
            noRecordMessage = null;
        if (this.state && this.state.cuisineList) {
            cuisineDropdown = this.state.cuisineList.map(cuisine => {
                return (
                    <Dropdown.Item href="#" onClick={this.onCuisineSelect}>{cuisine}</Dropdown.Item>
                )
            })
        }

        if (this.state && this.state.activePage) {
            active = this.state.activePage;
        }

        if (this.state && this.state.displayRestaurants) {
            let restaurants = this.state.displayRestaurants;
            let cardCount = 0;
            for (let i = (active - 1) * itemsToShow; i < restaurants.length; i++) {
                resCard = (
                    <Col sm={3}>
                        <RestaurantCard restaurant={restaurants[i]} />
                    </Col>
                );
                restaurantCards.push(resCard);
                cardCount++;
                if (cardCount === itemsToShow)
                    break;
            }

            let pages = [];
            let pageCount = Math.ceil(restaurants.length / itemsToShow);

            for (let i = 1; i <= pageCount; i++) {
                pages.push(
                    <Pagination.Item key={i} active={i === active} name={i} onClick={this.changePage}>
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

        if (this.state && this.state.noRecord && this.state.search_input === "") {
            noRecordMessage = (
                <Alert variant="warning">
                    No Restaurants are available now. Please try again later.
                </Alert>
            );
        }
        else if (this.state && this.state.noRecord) {
            noRecordMessage = (
                <Alert variant="warning">
                    No Results. Please try again.
                </Alert>
            );
        }
        else {
            noRecordMessage = null;
        }

        return (
            <div>
                <center><br /><br />
                    <h3>Search for restaurants with your favorite food!</h3>
                    <br />
                    <h4>Make a purchase of worth $100 or more and receive a discount of 20% and free delivery!</h4>
                    <br />
                    <form onSubmit={this.onSearch}>
                        <InputGroup style={{ width: '50%' }} size="lg">
                            <FormControl
                                placeholder="Pizza, Pasta, Noodles.."
                                aria-label="Search Restaurants"
                                aria-describedby="basic-addon2"
                                name="search_input"
                                onChange={this.onChange}
                            />
                            <InputGroup.Append>
                                <Button variant="primary" type="submit">Search</Button>
                            </InputGroup.Append>
                            <DropdownButton
                                as={InputGroup.Append}
                                variant="outline-secondary"
                                title="Cuisine"
                                id="input-group-dropdown-2"
                            >
                                {cuisineDropdown}
                            </DropdownButton>
                        </InputGroup>
                    </form>
                    <br /><br />
                    {noRecordMessage}
                    <Row>{restaurantCards}</Row>
                </center>
                <Row>
                    <Col sm={5}></Col>
                    <Col>{pagesBar}</Col>
                </Row>
            </div>
        )
    }
}

CustomerHome.propTypes = {
    searchRestaurant: PropTypes.func.isRequired,
    searchResult: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
    searchResult: state.restaurant.restaurant_data
});

export default connect(mapStateToProps, { searchRestaurant })(CustomerHome);