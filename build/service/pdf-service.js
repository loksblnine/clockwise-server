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
        const basedLogo = "data:image/png;base64,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";
        const response = await QRCode.toDataURL(`
            Заказ #${id}
            ${order.order_time.toLocaleDateString("ru")}
            Тип работы: ${order['work.description']}
            Стоимость: ${order['work.price']} USD
            ${order.isPaid}
        `);
        doc.image(Buffer.from(basedLogo.replace('data:image/png;base64,', ''), 'base64'), 230, 10, {
            width: 120,
            height: 120
        });
        doc
            .font("build/fonts/tnr-b.ttf")
            .fontSize(20)
            .text(`Детали заказа #${id}`, 200, 150);
        doc
            .font("build/fonts/tnr-b.ttf")
            .fontSize(12)
            .text(`Мастер: `, 50, 200);
        doc
            .font("build/fonts/tnr.ttf")
            .fontSize(12)
            .text(`${order['master.master_name']}`, 100, 200);
        doc
            .font("build/fonts/tnr-b.ttf")
            .fontSize(12)
            .text(`Email: `, 275, 200);
        doc
            .font("build/fonts/tnr.ttf")
            .fontSize(12)
            .text(`${order['master.email']}`, 310, 200);
        doc
            .font("build/fonts/tnr-b.ttf")
            .fontSize(12)
            .text(`Покупатель: `, 50, 230);
        doc
            .font("build/fonts/tnr.ttf")
            .fontSize(12)
            .text(`${order['customer.customer_name']}`, 125, 230);
        doc
            .font("build/fonts/tnr-b.ttf")
            .fontSize(12)
            .text(`Email: `, 275, 230);
        doc
            .font("build/fonts/tnr.ttf")
            .fontSize(12)
            .text(`${order['customer.customer_email']}`, 310, 230);
        doc
            .font("build/fonts/tnr-b.ttf")
            .fontSize(12)
            .text(`Тип сервиса: `, 50, 260);
        doc
            .font("build/fonts/tnr.ttf")
            .fontSize(12)
            .text(`${order['work.description']}`, 125, 260);
        doc
            .font("build/fonts/tnr-b.ttf")
            .fontSize(12)
            .text(`Дата выполнения заказа: `, 50, 290);
        doc
            .font("build/fonts/tnr.ttf")
            .fontSize(12)
            .text(`${order.order_time.toLocaleDateString("ru")}`, 200, 290);
        doc
            .font("build/fonts/tnr-b.ttf")
            .fontSize(12)
            .text(`Стоимость: `, 50, 320);
        doc
            .font("build/fonts/tnr-b.ttf")
            .fontSize(12)
            .text(`${order['work.price']} USD`, 150, 320);
        doc.image(Buffer.from(response.replace('data:image/png;base64,', ''), 'base64'), 220, 400, {
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