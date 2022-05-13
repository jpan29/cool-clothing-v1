import { createContext, useState, useEffect } from 'react'
export const CartContext = createContext({
  cartItems: [],
  addItemToCart: () => {},
  removeItemFromCart: () => {},
  deleteItemFromCart: () => {},
  itemCount: 0,
  totalPrice: 0,
})
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
  const [cartItems, setCartItem] = useState([])
  const [itemCount, setItemCount] = useState(0)
  const [totalPrice, setTotalPrice] = useState(0)
  useEffect(() => {
    const newItemCount = cartItems.reduce(
      (total, item) => total + item.quantity,
      0
    )
    setItemCount(newItemCount)
  }, [cartItems])
  useEffect(() => {
    const newTotalPrice = cartItems.reduce(
      (total, item) => total + item.quantity * item.price,
      0
    )
    setTotalPrice(newTotalPrice)
  }, [cartItems])

  const addItemToCart = (productToAdd) => {
    setCartItem(addCartItem(cartItems, productToAdd))
  }
  const removeItemFromCart = (productToRemove) => {
    setCartItem(removeCartItem(cartItems, productToRemove))
  }
  const deleteItemFromCart = (productToDelete) => {
    setCartItem(deleteCartItem(cartItems, productToDelete))
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
