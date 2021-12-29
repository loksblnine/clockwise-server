'use strict';

module.exports = {
    up: async (queryInterface) => {
        await queryInterface.bulkInsert('blog', [{
            header: 'How to Lorem Ipsum migrate',
            body: "<div><p>Haha ez</p></div>"
        }], {});
    },

    down: async (queryInterface) => {
        await queryInterface.bulkDelete('blog', null, {});
    }
};
