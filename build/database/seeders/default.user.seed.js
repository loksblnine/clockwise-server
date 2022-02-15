'use strict';
module.exports = {
    up: async (queryInterface) => {
        await queryInterface.bulkInsert('role', [
            {
                user_id: 1,
                email: "admin@example.com",
                password: "$2b$05$NWSowlSt.ZHfnk8kngyoZeokQHYTRjLRexcDdq/wm1IFP/yN9t4zS",
                role: 1,
                isActive: true
            },
            {
                user_id: 2,
                email: "illya200457@gmail.com",
                password: "$2b$05$NWSowlSt.ZHfnk8kngyoZeokQHYTRjLRexcDdq/wm1IFP/yN9t4zS",
                role: 2,
                isActive: true
            },
            {
                user_id: 3,
                email: "illya200457@gmail.com",
                password: "$2b$05$NWSowlSt.ZHfnk8kngyoZeokQHYTRjLRexcDdq/wm1IFP/yN9t4zS",
                role: 3,
                isActive: true
            },
        ], {});
    },
    down: async (queryInterface) => {
        await queryInterface.bulkDelete('role', null, {});
    }
};
//# sourceMappingURL=default.user.seed.js.map