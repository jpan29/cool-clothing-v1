import { CART_ACTION_TYPES } from './cart.type'
const INITIAL_STATE = {
  cartItems: [],
  itemCount: 0,
  totalPrice: 0,
}
export const cartReducer = (state = INITIAL_STATE, action) => {
  const { type, payload } = action

  switch (type) {
    case CART_ACTION_TYPES.SET_CART_ITEMS:
      return {
        ...state,
        cartItems: payload
      }
    default:
      return state
  }
}