const models = require("../database/models");
const sequelize = require("../database/config/config");

const orderPhotos = async (request, response) => {
    try {
        const photos = await models.initModels(sequelize).photo.findAll({
            where: {
                order_id: request.params.id
            }
        })
        response.status(201).json(photos.map(item => item.photo_url));
    } catch (err) {
        response.status(500).json("Something went wrong");
    }
}

module.exports = {
    orderPhotos
}
