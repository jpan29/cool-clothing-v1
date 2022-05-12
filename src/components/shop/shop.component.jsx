import { useContext } from 'react'
import { ProductsProvider } from '../../context/product.context'

const Shop = () => {
  const { products } = useContext(ProductsProvider)
  return (
    <div>
      123
      {products.map(({ id, name }) => (
        <div key={id}>
          <h1>{name}</h1>
        </div>
      ))}
    </div>
  )
}
export default Shop
