'use strict';
const {DataTypes} = require("sequelize");
module.exports = {
    up: async (queryInterface) => {
        await queryInterface.addColumn('workType', 'price', {
            type: DataTypes.INTEGER,
            allowNull: true
        })
    },
    down: async (queryInterface) => {
        await queryInterface.removeColumn('workType', 'price');
    }
};
