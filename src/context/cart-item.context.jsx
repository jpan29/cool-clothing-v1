import { createContext, useReducer } from 'react'
export const CartContext = createContext({
  cartItems: [],
  addItemToCart: () => {},
  removeItemFromCart: () => {},
  deleteItemFromCart: () => {},
  itemCount: 0,
  totalPrice: 0,
})
const INITIAL_STATE = {
  cartItems: [],
  itemCount: 0,
  totalPrice: 0,
}

const cartReducer = (state, action) => {
  const { type, payload } = action

  switch (type) {
    case 'SET_CART_ITEMS':
      return {
        ...state,
        ...payload,
      }
    default:
      throw new Error(`Unhandled type ${type} in cartReducer`)
  }
}
const addCartItem = (cartItems, productToAdd) => {
  const existingItem = cartItems.find((item) => item.id === productToAdd.id)

  if (existingItem) {
    return cartItems.map((item) =>
      item.id === productToAdd.id
        ? { ...item, quantity: item.quantity + 1 }
        : item
    )
  }

  return [...cartItems, { ...productToAdd, quantity: 1 }]
}

const removeCartItem = (cartItems, productToRemove) => {
  const existingItem = cartItems.find((item) => item.id === productToRemove.id)
  if (existingItem.quantity === 1)
    return cartItems.filter((item) => item.id !== productToRemove.id)
  return cartItems.map((item) =>
    item.id === productToRemove.id
      ? { ...item, quantity: item.quantity - 1 }
      : item
  )
}
const deleteCartItem = (cartItems, productToDelete) => {
  return cartItems.filter((item) => item.id !== productToDelete.id)
}

export const CartProvider = ({ children }) => {
  const [{ cartItems, itemCount, totalPrice }, dispatch] = useReducer(
    cartReducer,
    INITIAL_STATE
  )
  // const [itemCount, setItemCount] = useState(0)
  // const [totalPrice, setTotalPrice] = useState(0)
  // useEffect(() => {
  //   const newItemCount = cartItems.reduce(
  //     (total, item) => total + item.quantity,
  //     0
  //   )
  //   setItemCount(newItemCount)
  // }, [cartItems])
  // useEffect(() => {
  //   const newTotalPrice = cartItems.reduce(
  //     (total, item) => total + item.quantity * item.price,
  //     0
  //   )
  //   setTotalPrice(newTotalPrice)
  // }, [cartItems])

  const updateCartItemReducer = (newCartItems) => {
    const newItemCount = newCartItems.reduce(
      (total, item) => total + item.quantity,
      0
    )
    const newTotalPrice = newCartItems.reduce(
      (total, item) => total + item.quantity * item.price,
      0
    )
    dispatch({
      type: 'SET_CART_ITEMS',
      payload: {
        cartItems: newCartItems,
        itemCount: newItemCount,
        totalPrice: newTotalPrice,
      },
    })
  }

  const addItemToCart = (productToAdd) => {
    updateCartItemReducer(addCartItem(cartItems, productToAdd))
  }
  const removeItemFromCart = (productToRemove) => {
    updateCartItemReducer(removeCartItem(cartItems, productToRemove))
  }
  const deleteItemFromCart = (productToDelete) => {
    updateCartItemReducer(deleteCartItem(cartItems, productToDelete))
  }

  const value = {
    cartItems,
    addItemToCart,
    removeItemFromCart,
    deleteItemFromCart,
    itemCount,
    totalPrice,
  }
  return <CartContext.Provider value={value}>{children}</CartContext.Provider>
}
