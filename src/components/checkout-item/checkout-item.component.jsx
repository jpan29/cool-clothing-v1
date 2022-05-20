import './checkout-item.styles.scss'

import { useDispatch } from 'react-redux'
import { useSelector } from 'react-redux'
import { selectCartItems } from '../../store/cart/cart.selector'
import {
  addItemToCart,
  removeItemFromCart,
  deleteItemFromCart,
} from '../../store/cart/cart.action'

const CheckoutItem = ({ cartItem }) => {
  const dispatch = useDispatch()
  const cartItems = useSelector(selectCartItems)

  const deleteItemHandler = () => {
    dispatch(deleteItemFromCart(cartItems, cartItem))
  }
  const addItemHandler = () => {
    dispatch(addItemToCart(cartItems, cartItem))
  }
  const removeItemHandler = () => {
    dispatch(removeItemFromCart(cartItems, cartItem))
  }
  return (
    <div className="checkout-item-container">
      <div className="image-container">
        <img src={cartItem.imageUrl} alt={cartItem.name} />
      </div>
      <span className="name">{cartItem.name}</span>

      <span className="quantity">
        <div
          className="arrow"
          onClick={() => {
            removeItemHandler(cartItem)
          }}>
          &#10094;
        </div>
        <span className="value">{cartItem.quantity}</span>
        <div
          className="arrow"
          onClick={() => {
            addItemHandler(cartItem)
          }}>
          &#10095;
        </div>
      </span>
      <span className="price">${cartItem.price}</span>
      <div
        className="remove-button"
        onClick={() => {
          deleteItemHandler(cartItem)
        }}>
        &#10005;
      </div>
    </div>
  )
}
export default CheckoutItem
