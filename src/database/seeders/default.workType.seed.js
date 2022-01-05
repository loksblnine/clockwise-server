'use strict';

module.exports = {
    up: async (queryInterface) => {
        await queryInterface.bulkInsert('role', [
            {
                work_id: 1,
                description: "small"
            },
            {
                role_id: 2,
                description: "average"
            },
            {
                role_id: 3,
                description: "big"
            }
        ], {});
    },

    down: async (queryInterface) => {
        await queryInterface.bulkDelete('role', null, {});
    }
};
