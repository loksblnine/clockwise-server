'use strict';
const {DataTypes} = require("sequelize");
module.exports = {
    up: async (queryInterface) => {
        await queryInterface.addColumn('order', 'isPaid', {
            type: DataTypes.BOOLEAN,
            allowNull: true,
            defaultValue: false
        })
    },
    down: async (queryInterface) => {
        await queryInterface.removeColumn('order', 'isPaid');
    }
};
