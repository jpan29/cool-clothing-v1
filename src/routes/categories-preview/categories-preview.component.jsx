import { useSelector } from 'react-redux'
import { selectCategoriesMap } from '../../store/categories/categories.selector'

import CategoryPreview from '../../components/category-preview/category-preview.component'
import Spinner from '../../components/spinner/spinner.component'
import { selectCategoriesIsLoading } from '../../store/categories/categories.selector'
import { Fragment } from 'react'
const CategoriesPreview = () => {
  const categoriesMap = useSelector(selectCategoriesMap)
  const isLoading = useSelector(selectCategoriesIsLoading)
  return (
    <Fragment>
      {isLoading ? (
        <Spinner />
      ) : (
        <div className="categories-preview-container">
          {Object.keys(categoriesMap).map((title) => {
            const products = categoriesMap[title]
            return (
              <CategoryPreview key={title} title={title} products={products} />
            )
          })}
        </div>
      )}
    </Fragment>
  )
}

export default CategoriesPreview
