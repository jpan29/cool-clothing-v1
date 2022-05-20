import './product-card.styles.scss'
import Button, {
  BUTTON_TYPE_CLASSES,
} from '../components/button/button.component'

import { useDispatch } from 'react-redux'
import { useSelector } from 'react-redux'
import { addItemToCart } from '../store/cart/cart.action'
import { selectCartItems } from '../store/cart/cart.selector'
const ProductCard = ({ product }) => {
  const dispatch = useDispatch()
  const cartItems = useSelector(selectCartItems)
  const addProductToCart = () => dispatch(addItemToCart(cartItems, product))
  return (
    <div className="product-card-container">
      <img src={product.imageUrl} alt={product.name} />
      <div className="footer">
        <span className="name">{product.name}</span>
        <span className="price">{product.price}</span>
      </div>

      <Button
        buttonType={BUTTON_TYPE_CLASSES.inverted}
        onClick={addProductToCart}>
        Add to cart
      </Button>
    </div>
  )
}

export default ProductCard
