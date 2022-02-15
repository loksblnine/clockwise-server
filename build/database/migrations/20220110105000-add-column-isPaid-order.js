'use strict';
const { DataTypes } = require("sequelize");
module.exports = {
    up: async (queryInterface) => {
        await queryInterface.addColumn('order', 'isPaid', {
            type: DataTypes.STRING,
            allowNull: true
        });
    },
    down: async (queryInterface) => {
        await queryInterface.removeColumn('order', 'isPaid');
    }
};
//# sourceMappingURL=20220110105000-add-column-isPaid-order.js.map