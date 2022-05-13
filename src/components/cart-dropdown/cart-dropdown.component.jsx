import {
  CarDropdownContainer,
  EmptyMessage,
  CartItems,
} from './cart-dropdown.styles.jsx'
import CartItem from '../cart-item/cart-item.component'
import { CartContext } from '../../context/cart-item.context'
import { useContext } from 'react'
import { useNavigate } from 'react-router-dom'
import Button from '../button/button.component'

const CartDropdown = () => {
  const { cartItems } = useContext(CartContext)
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
