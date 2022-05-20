import './checkout.styles.scss'

import { useSelector } from 'react-redux'

import CheckoutItem from '../../components/checkout-item/checkout-item.component'
import {
  selectCartItems,
  selectTotalPrice,
} from '../../store/cart/cart.selector'
import PaymentForm from '../../components/payment-form/payment-form.component'

const CheckOut = () => {
  const cartItems = useSelector(selectCartItems)
  const totalPrice = useSelector(selectTotalPrice)

  return (
    <div className="checkout-container">
      <div className="checkout-header">
        <div className="header-block">
          <span>Product</span>
        </div>
        <div className="header-block">
          <span>Description</span>
        </div>
        <div className="header-block">
          <span>Quantity</span>
        </div>
        <div className="header-block">
          <span>Price</span>
        </div>
        <div className="header-block">
          <span>Remove</span>
        </div>
      </div>
      {cartItems.map((item) => {
        return <CheckoutItem key={item.id} cartItem={item} />
      })}

      <span className="total">Total:${totalPrice}</span>
      <PaymentForm />
    </div>
  )
}
export default CheckOut
