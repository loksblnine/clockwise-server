const validation = require("../validation/validation");
const pool = require("../db");
const createMaster = async (request, response) => {
    const {master_name, master_email, ranking} = request.body
    if (validation.isNameValid(master_name) /*&& validation.isRankingValid(ranking)*/)
        try {
            const newMaster = await pool.query("INSERT INTO masters (master_name, email, ranking) VALUES ($1, $2, $3) RETURNING *",
                [master_name, master_email, ranking]);
            response.json(newMaster.rows[0])
        } catch (e) {
            response.json(e.toString())
        }
    else {
        response.json("Возникли трудности")
    }
}
const getMasters = async (request, response) => {
    try {
        const itemsPerPage = 20
        const page = request.params.page
        const offset = itemsPerPage * page
        const masters = await pool.query("SELECT * FROM masters ORDER BY master_id DESC LIMIT ($1) OFFSET ($2)", [itemsPerPage, offset])
        response.json(masters.rows)
    } catch (e) {
        response.json(e.toString())
    }
}
const getMasterById = async (request, response) => {
    try {
        const {id} = request.params;
        const master = await pool.query("SELECT * FROM masters WHERE master_id = ($1)", [id])
        response.json(master.rows[0])
    } catch (e) {
        response.json(e.toString())
    }
}
const getFreeMasters = async (request, response) => {
    try {
        const order = request.body
        order.order_time = new Date(order.order_time)
        const startHour = order.order_time.getHours()
        const finishHour = Number(order.work_id) + startHour
        const mInCity = await pool.query("SELECT * FROM connect_city_master WHERE city_id = ($1)", [order.city_id])
        const orders = await pool.query("SELECT * FROM orders WHERE city_id = ($1)", [order.city_id])
        let mastersId = mInCity.rows.map(r => r.master_id)

        mastersId = mastersId.map(
            (id) => {
                const mastersOrders = orders.rows.filter(o => o.master_id === id)
                const todayMastersOrders = mastersOrders.map(mo => mo.order_time).filter(elem =>
                    elem.getDate() === order.order_time.getDate()
                    && elem.getMonth() === order.order_time.getMonth()
                    && elem.getFullYear() === order.order_time.getFullYear()
                ).filter(
                    m => {
                        const hour = m.getHours()
                        return (hour >= startHour && hour <= finishHour);
                    }
                )
                return todayMastersOrders.length > 0 ? id : null
            }
        )
        response.json(mastersId.map(elem => elem))
    } catch (e) {
        response.json(e.toString())
    }
}
const updateMaster = async (request, response) => {
    const {id} = request.params;
    const {master_name, master_email, ranking} = request.body
    if (validation.isNameValid(master_name) /*&& validation.isRankingValid(ranking)*/)
        try {
            await pool.query(
                "UPDATE masters SET master_name = $2, ranking = $3, email = $4 WHERE master_id = ($1)",
                [id, master_name, ranking, master_email])
            response.json("Обновления мастера сохранены")
        } catch (e) {
            response.json(e.toString())
        }
    else {
        response.json("Возникли трудности")
    }
}
const deleteMaster = async (request, response) => {
    try {
        const {id} = request.params;
        await pool.query("DELETE FROM masters WHERE master_id = ($1)", [id])
        response.json("Мастер удален")
    } catch (e) {
        response.json(e.toString())
    }
}

const getMasterByEmail = async (request, response) => {
    try {
        const {email} = request.params;
        const customer = await pool.query("SELECT * FROM masters WHERE email = ($1)", [email])
        response.json(customer.rows[0])
    } catch (e) {
        response.status(404).json(e.toString())
    }
}

module.exports = {
    createMaster,
    getMasters,
    getMasterById,
    getFreeMasters,
    updateMaster,
    deleteMaster,
    getMasterByEmail
}