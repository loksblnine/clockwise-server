"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.orderPhotos = void 0;
const models_1 = require("../database/models");
const orderPhotos = async (request, response) => {
    try {
        const photos = await models_1.Photo.findAll({
            where: {
                order_id: request.params.id
            }
        });
        response.status(201).json(photos.map((item) => item.photo_url));
    }
    catch (e) {
        response.status(500).json("Something went wrong");
    }
};
exports.orderPhotos = orderPhotos;
//# sourceMappingURL=photoController.js.map