import { useState } from 'react'
import {
  ShoppingIcon,
  CartIconContainer,
  ItemCount,
} from './cart-icon.styles.jsx'
import CartDropdown from '../cart-dropdown/cart-dropdown.component'
import { useContext } from 'react'
import { CartContext } from '../../context/cart-item.context'
const CartIcon = () => {
  const { itemCount } = useContext(CartContext)
  const [cartIcon, setCartIcon] = useState(false)
  return (
    <>
      <CartIconContainer onClick={() => setCartIcon(!cartIcon)}>
        <ShoppingIcon />
        <ItemCount>{itemCount}</ItemCount>
      </CartIconContainer>

      {cartIcon && <CartDropdown />}
    </>
  )
}
export default CartIcon
