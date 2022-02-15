"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.createReceipt = exports.Excel = void 0;
const xlsx_1 = __importDefault(require("xlsx"));
const models_1 = require("../database/models");
const utils_1 = require("../utils/utils");
const pdf_service_1 = require("../service/pdf-service");
const Excel = async (request, response) => {
    let worksheets = { "Лист1": [] };
    const where = utils_1.whereConstructor(request);
    const orders = await models_1.Order.findAll({
        order: [
            ['order_time', 'DESC'],
            ['order_id', 'ASC'],
        ],
        attributes: ['order_id', 'order_time', 'master_id', 'city_id', 'customer_id', 'isDone', 'work_id', 'isPaid', 'mark'],
        include: [{
                model: models_1.Master,
                as: "master",
                attributes: ['master_name']
            }, {
                model: models_1.City,
                as: 'city',
                attributes: ['city_name']
            }, {
                model: models_1.Customer,
                as: 'customer',
                attributes: ['customer_name']
            },
        ],
        where
    });
    orders.forEach((order) => {
        worksheets["Лист1"].push({
            "Номер заказа": order.order_id,
            "Покупатель": order.customer.customer_name,
            "Мастер": order.master.master_name,
            "Тип работы": order.work_id,
            "Город": order.city.city_name,
            "Дата заказа": order.order_time,
            "Выполнен ли": order.isDone ? "ДА" : "-",
            "Оплачен ли": order.isPaid || "",
            "Оценка": order.mark || ""
        });
    });
    const newBook = xlsx_1.default.utils.book_new();
    const newSheet = xlsx_1.default.utils.json_to_sheet(worksheets["Лист1"]);
    xlsx_1.default.utils.book_append_sheet(newBook, newSheet, "Лист1");
    const content = xlsx_1.default.write(newBook, { type: "buffer", bookType: "xlsx", Props: { Author: "Clockwise Clockware" } });
    response
        .status(201)
        .send(content);
};
exports.Excel = Excel;
const createReceipt = async (request, response) => {
    const id = Number(request.params.id);
    const stream = response.writeHead(200, {
        'Content-Type': 'application/pdf',
        'Content-Disposition': `attachment;filename=Receipt${id}.pdf`,
    });
    await pdf_service_1.buildPDF(id, (chunk) => stream.write(chunk), () => stream.end());
};
exports.createReceipt = createReceipt;
//# sourceMappingURL=downloadController.js.map