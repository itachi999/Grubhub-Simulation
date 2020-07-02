var assert = require('chai').assert;
var app = require('../index');

var chai = require('chai');
chai.use(require('chai-http'));
var expect = require('chai').expect;

var agent = require('chai').request.agent(app);


describe("Grubhub", function () {
    describe('Login Test', function () {

        it('Incorrect Password', () => {
            agent.post("/grubhub/login")
                .send({ email_id: "customer@sjsu.edu", password: "password" })
                .then(function (res) {
                    expect(res.text).to.equal("INCORRECT_PASSWORD");
                })
                .catch(error => {
                    console.log(error);
                });
        });

        it('Invalid User', () => {
            agent.post("/grubhub/login")
                .send({ email_id: "user@sjsu.edu", password: "password" })
                .then(function (res) {
                    expect(res.text).to.equal("NO_USER");
                })
                .catch(error => {
                    console.log(error);
                });
        });

        it('Successful Login', () => {
            agent.post("/grubhub/login")
                .send({ email_id: "customer@sjsu.edu", password: "P@ssword" })
                .then(function (res) {
                    expect(res.status).to.equal(200);
                })
                .catch(error => {
                    console.log(error);
                });
        });
    });

    describe('Restaurant Owner Signup Test', () => {

        it('Owner Already Exists', () => {
            agent.post("/grubhub/signup/restaurant")
                .send({ name: "Owner", res_name: "Restaurant", res_cuisine: "Cuisine", email_id: "owner@sjsu.edu", password: "password", res_zip_code: "23342", address: "San Jose", phone_number: "980765551" })
                .then(function (res) {
                    expect(res.text).to.equal("USER_EXISTS");
                })
                .catch(error => {
                    console.log(error);
                });
        });

        it('Successful Owner Signup', () => {
            agent.post("/grubhub/signup/restaurant")
                .send({ name: "Owner", res_name: "Restaurant", res_cuisine: "Cuisine", email_id: "owner@sjsu.edu", password: "password", res_zip_code: "23342", address: "San Jose", phone_number: "980765551" })
                .then(function (res) {
                    expect(res.status).to.equal(200);
                })

                .catch(error => {
                    console.log(error);
                });
        });
    });

    describe('Customer Signup Test', () => {

        it('Customer Already Exists', () => {
            agent.post("/grubhub/signup/customer")
                .send({ name: "Customer", email_id: "customer@sjsu.edu", password: "password", address: "San Jose", phone_number: "980765551" })
                .then(function (res) {
                    expect(res.text).to.equal("USER_EXISTS");
                })
                .catch(error => {
                    console.log(error);
                });
        });

        it('Successful Customer Signup', () => {
            agent.post("/grubhub/signup/restaurant")
                .send({ name: "Customer", email_id: "customer@sjsu.edu", password: "password", address: "San Jose", phone_number: "980765551" })
                .then(function (res) {
                    expect(res.status).to.equal(200);
                })
                .catch(error => {
                    console.log(error);
                });
        });
    });

    describe('Restaurant Owner Profile Test', () => {

        it('Unauthorized access to Restaurant Owner Profile', () => {
            agent.get("/grubhub/profile/restaurant/5dabc23f126cee4f0d148d2c")
                .then(function (res) {
                    expect(res.text).to.equal("Unauthorized");
                })
                .catch(error => {
                    console.log(error);
                });
        });
    });

    describe('Customer Profile Test', () => {

        it('Unauthorized access to Customer Profile', () => {
            agent.get("/grubhub/profile/customer/5dabc23f126cee4f0d148d2c")
                .then(function (res) {
                    expect(res.text).to.equal("Unauthorized");
                })
                .catch(error => {
                    console.log(error);
                });
        });
    });
});