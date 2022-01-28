"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getCustomerByEmail = exports.updateCustomerById = exports.deleteCustomerById = exports.getCustomerById = exports.getCustomers = exports.createCustomer = void 0;
const models_1 = require("../database/models");
const createCustomer = async (request, response) => {
    try {
        const customer = await models_1.Customer.create(request.body);
        response.status(201).json(customer);
    }
    catch (e) {
        response.status(500).json("Something went wrong");
    }
};
exports.createCustomer = createCustomer;
const getCustomers = async (request, response) => {
    try {
        const page = request.params.page;
        const offset = 10 * Number(page);
        const customers = await models_1.Customer.findAll({
            order: [
                ["customer_id", "ASC"]
            ],
            offset,
            limit: 10
        });
        response.status(201).json(customers);
    }
    catch (e) {
        response.status(500).json("Something went wrong");
    }
};
exports.getCustomers = getCustomers;
const getCustomerById = async (request, response) => {
    try {
        const id = request.params.id;
        const customer = await models_1.Customer.findOne({
            where: {
                customer_id: id
            }
        });
        response.status(201).json(customer);
    }
    catch (e) {
        response.status(500).json("Something went wrong");
    }
};
exports.getCustomerById = getCustomerById;
const deleteCustomerById = async (request, response) => {
    try {
        const id = request.params.id;
        await models_1.Customer.destroy({
            where: {
                customer_id: id
            }
        });
        response.status(201).json(`Customer ${id} was removed successfully`);
    }
    catch (e) {
        response.status(500).json("Something went wrong");
    }
};
exports.deleteCustomerById = deleteCustomerById;
const updateCustomerById = async (request, response) => {
    try {
        const id = request.params.id;
        const customer_name = request.body.customer_name, customer_email = request.body.customer_email;
        await models_1.Customer.update({
            customer_name, customer_email
        }, {
            where: {
                customer_id: id
            }
        });
        const customer = await models_1.Customer.findOne({
            where: {
                customer_id: id
            }
        });
        response.status(201).json(customer);
    }
    catch (e) {
        response.status(500).json("Something went wrong");
    }
};
exports.updateCustomerById = updateCustomerById;
const getCustomerByEmail = async (request, response) => {
    try {
        const { email } = request.params;
        const customer = await models_1.Customer.findOne({
            where: {
                customer_email: email
            }
        });
        response.status(201).json(customer);
    }
    catch (e) {
        response.status(500).json("Something went wrong");
    }
};
exports.getCustomerByEmail = getCustomerByEmail;
//# sourceMappingURL=customerController.js.map