"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.buildPDF = void 0;
const models_1 = require("../database/models");
const PDFDocument = require('pdfkit');
const QRCode = require('qrcode');
const buildPDF = async (id, dataCallback, endCallback) => {
    const doc = new PDFDocument({ bufferPages: true, font: 'Times-Roman' });
    doc.on('data', dataCallback);
    doc.on('end', endCallback);
    const order = await models_1.Order.findOne({
        raw: true,
        where: {
            order_id: id
        },
        attributes: ['order_id', 'order_time', 'master_id', 'city_id', 'customer_id', 'isDone', 'work_id', 'isPaid', 'mark'],
        include: [{
                model: models_1.Master,
                as: "master",
                attributes: ['master_name', 'email']
            }, {
                model: models_1.Type,
                as: 'work',
                attributes: ['description', 'price']
            }, {
                model: models_1.Customer,
                as: 'customer',
                attributes: ['customer_name', 'customer_email']
            },
        ],
    });
    if (order) {
        const response = await QRCode.toDataURL(`
            Заказ #${id}
            ${order.order_time.toLocaleString()}
            Тип работы: ${order['work.description']}
            Стоимость: ${order['work.price']}  
        `);
        doc
            .font("build/fonts/tnr-b.ttf")
            .fontSize(20)
            .text(`Детали заказа #${id}`, 200, 50);
        doc
            .font("build/fonts/tnr-b.ttf")
            .fontSize(12)
            .text(`Мастер: `, 50, 100);
        doc
            .font("build/fonts/tnr.ttf")
            .fontSize(12)
            .text(`${order['master.master_name']}`, 100, 100);
        doc
            .font("build/fonts/tnr-b.ttf")
            .fontSize(12)
            .text(`Email: `, 275, 100);
        doc
            .font("build/fonts/tnr.ttf")
            .fontSize(12)
            .text(`${order['master.email']}`, 310, 100);
        doc
            .font("build/fonts/tnr-b.ttf")
            .fontSize(12)
            .text(`Покупатель: `, 50, 130);
        doc
            .font("build/fonts/tnr.ttf")
            .fontSize(12)
            .text(`${order['customer.customer_name']}`, 125, 130);
        doc
            .font("build/fonts/tnr-b.ttf")
            .fontSize(12)
            .text(`Email: `, 275, 130);
        doc
            .font("build/fonts/tnr.ttf")
            .fontSize(12)
            .text(`${order['customer.customer_email']}`, 310, 130);
        doc
            .font("build/fonts/tnr-b.ttf")
            .fontSize(12)
            .text(`Тип сервиса: `, 50, 160);
        doc
            .font("build/fonts/tnr.ttf")
            .fontSize(12)
            .text(`${order['work.description']}`, 125, 160);
        doc
            .font("build/fonts/tnr-b.ttf")
            .fontSize(12)
            .text(`Дата выполнения заказа: `, 50, 190);
        doc
            .font("build/fonts/tnr.ttf")
            .fontSize(12)
            .text(`${order.order_time.toLocaleString()}`, 200, 190);
        doc
            .font("build/fonts/tnr-b.ttf")
            .fontSize(12)
            .text(`Стоимость: `, 50, 220);
        doc
            .font("build/fonts/tnr-b.ttf")
            .fontSize(12)
            .text(`${order['work.price']} USD`, 150, 220);
        doc.image(Buffer.from(response.replace('data:image/png;base64,', ''), 'base64'), 230, 300, {
            width: 150,
            height: 150
        });
        doc.end();
    }
    else {
        doc.end();
    }
};
exports.buildPDF = buildPDF;
//# sourceMappingURL=pdf-service.js.map