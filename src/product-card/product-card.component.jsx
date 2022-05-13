import './product-card.styles.scss'
import Button, {
  BUTTON_TYPE_CLASSES,
} from '../components/button/button.component'
import { useContext } from 'react'
import { CartContext } from '../context/cart-item.context'
const ProductCard = ({ product }) => {
  const { addItemToCart } = useContext(CartContext)
  const addProductToCart = () => addItemToCart(product)
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
