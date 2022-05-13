import './checkout-item.styles.scss'
import { useContext } from 'react'
import { CartContext } from '../../context/cart-item.context'

const CheckoutItem = ({ cartItem }) => {
  const { addItemToCart, removeItemFromCart, deleteItemFromCart } =
    useContext(CartContext)

  const deleteItemHandler = (item) => {
    deleteItemFromCart(item)
  }
  const addItemHandler = (item) => {
    addItemToCart(item)
  }
  const removeItemHandler = (item) => {
    removeItemFromCart(item)
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
