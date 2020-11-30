export const pageReducer = (state = 0, action) => {
    switch (action.type) {
        case 'SET_CURRENTPAGE':
            return action.payload
        default:
            return state
    }
}