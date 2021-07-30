export default function reducer(state, action) {
    switch (action.type) {
        case "name": {
            return {
                name: action.payload
            }
        }
        case "email": {
            return {
                ...state,
                email: action.payload
            }
        }
        case "city": {
            return {
                ...state,
                city: action.payload
            }
        }
        case "work": {
            return {
                work: action.payload
            }
        }
        case "date": {
            return {
                ...state,
                date: action.payload
            }
        }
        default:
            return state
    }
}