import {
  CarDropdownContainer,
  EmptyMessage,
  CartItems,
} from './cart-dropdown.styles.jsx'
import CartItem from '../cart-item/cart-item.component'

import { useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import { selectCartItems } from '../../store/cart/cart.selector.js'
import Button from '../button/button.component'

const CartDropdown = () => {
  const cartItems = useSelector(selectCartItems)

  const navigate = useNavigate()
  const goToCheckOutHandler = () => {
    navigate('/check-out')
  }
  return (
    <CarDropdownContainer>
      <CartItems>
        {!cartItems.length && <EmptyMessage>Your cart is empty</EmptyMessage>}

        {cartItems.map((item) => (
          <CartItem key={item.id} cartItem={item} />
        ))}
      </CartItems>

      <Button onClick={goToCheckOutHandler}>CHECKOUT</Button>
    </CarDropdownContainer>
  )
}
export default CartDropdown
