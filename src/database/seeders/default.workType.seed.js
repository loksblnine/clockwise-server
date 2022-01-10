'use strict';

module.exports = {
    up: async (queryInterface) => {
        await queryInterface.bulkInsert('workType', [
            {
                work_id: 1,
                description: "small",
                time: "1:00:00",
                price: 150
            },
            {
                work_id: 2,
                description: "average",
                time: "2:00:00",
                price: 300
            },
            {
                work_id: 3,
                description: "big",
                time: "3:00:00",
                price: 450
            }
        ], {});
    },

    down: async (queryInterface) => {
        await queryInterface.bulkDelete('role', null, {});
    }
};
