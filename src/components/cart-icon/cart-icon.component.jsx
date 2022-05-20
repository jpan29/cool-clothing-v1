import { useState } from 'react'
import {
  ShoppingIcon,
  CartIconContainer,
  ItemCount,
} from './cart-icon.styles.jsx'
import CartDropdown from '../cart-dropdown/cart-dropdown.component'

import { useSelector } from 'react-redux'
import { selectItemCount } from '../../store/cart/cart.selector.js'
const CartIcon = () => {
  const itemCount = useSelector(selectItemCount)
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
