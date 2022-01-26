// Import dependencies
import {Request, Response} from "express";
import XLSX from "xlsx";
import {City, Customer, Master, Order} from "../database/models";
import {IWhere, whereConstructor} from "../utils/utils";
import * as fs from "fs";

const path = require('path');
const root = path.dirname(require?.main?.filename)

export const Excel = async (request: Request, response: Response): Promise<void> => {
    if (fs.existsSync(root + "\\Отчёт.xlsx")) {
        fs.unlink(root + "\\Отчёт.xlsx", function (err) {
            if (err) throw err;
            console.log('File deleted!');
        });
    }
    let worksheets: any = {"Лист1": []};
    const where: IWhere = whereConstructor(request)
    const orders: Order[] | null = await Order.findAll({
        order: [
            ['order_time', 'DESC'],
            ['order_id', 'ASC'],
        ],
        attributes: ['order_id', 'order_time', 'master_id', 'city_id', 'customer_id', 'isDone', 'work_id', 'isPaid', 'mark'],
        include: [{
            model: Master,
            as: "master",
            attributes: ['master_name']
        }, {
            model: City,
            as: 'city',
            attributes: ['city_name']
        }, {
            model: Customer,
            as: 'customer',
            attributes: ['customer_name']
        },
        ],
        where
    });

    orders.forEach((order) => {
            worksheets["Лист1"].push({
                "Номер заказа": order.order_id,
                "ID покупателя": order.customer.customer_name,
                "ID мастера": order.master.master_name,
                "Тип работы": order.work_id,
                "ID города": order.city.city_name,
                "Дата заказа": order.order_time,
                "Выполнен ли": order.isDone ? "ДА" : "Не выполнен",
                "Оплачен ли": order.isPaid || "Не оплачен",
                "Оценка": order.mark || "Нет оценки"
            });
        }
    )
    const newBook = XLSX.utils.book_new();
    const newSheet = XLSX.utils.json_to_sheet(worksheets["Лист1"]);
    XLSX.utils.book_append_sheet(newBook, newSheet, "Лист1");
    const content = XLSX.write(newBook, {type: "buffer", bookType: "xlsx", Props: {Author: "Clockwise Clockware"}})
    response
        .status(201)
        .send(content)
}