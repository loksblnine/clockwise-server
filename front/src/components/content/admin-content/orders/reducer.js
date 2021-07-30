export default function reducer(state, action) {
    switch (action.type) {
        case 'master_id':
            return {master_id: action.payload};
        case 'city_id':
            return {city_id: action.payload};
        case 'work_id':
            return {work_id: action.payload};
        case 'customer_id':
            return {customer_id: action.payload};
        case 'order_time':
            return {order_time: action.payload};
        default:
            return
    }
}