'use strict';
const {DataTypes} = require("sequelize");
module.exports = {
    up: async (queryInterface) => {
        await queryInterface.addColumn('blog', 'photo', {
            type: DataTypes.TEXT,
            allowNull: true
        })
    },
    down: async (queryInterface) => {
        await queryInterface.removeColumn('blog', 'photo');
    }
};
