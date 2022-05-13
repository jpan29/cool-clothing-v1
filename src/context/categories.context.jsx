import { useState, createContext, useEffect } from 'react'
// import shop_data from '../shop-data.js'
import {
  getCategoriesAndDocuments,
  // addCollectionAndDocuments,
} from '../utils/firebase/firebase.utils.js'
export const CategoriesContext = createContext({
  categoriesMap: {},
})

export const CategoriesProvider = ({ children }) => {
  const [categoriesMap, setCategoriesMap] = useState({})
  // useEffect(() => {
  //   addCollectionAndDocuments('categories', shop_data)
  // }, [])
  useEffect(() => {
    const getCategories = async () => {
      const categoriesMap = await getCategoriesAndDocuments()
      setCategoriesMap(categoriesMap)
    }
    getCategories()
  }, [])
  const value = { categoriesMap }
  return (
    <CategoriesContext.Provider value={value}>
      {children}
    </CategoriesContext.Provider>
  )
}
