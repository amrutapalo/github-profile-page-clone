import ActionTypes from '../constants/ActionTypes';


export const displayProducts = (products) => {
    return {
        type : ActionTypes.DISPLAY_PRODUCTS,
        payload : products
    }
}