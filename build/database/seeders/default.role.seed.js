'use strict';
module.exports = {
    up: async (queryInterface) => {
        await queryInterface.bulkInsert('role', [
            {
                role_id: 1,
                description: "ADMIN"
            },
            {
                role_id: 2,
                description: "MASTER"
            },
            {
                role_id: 3,
                description: "CUSTOMER"
            }
        ], {});
    },
    down: async (queryInterface) => {
        await queryInterface.bulkDelete('role', null, {});
    }
};
//# sourceMappingURL=default.role.seed.js.map