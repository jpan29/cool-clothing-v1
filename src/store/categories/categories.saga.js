import { takeLatest, all, call, put } from 'redux-saga/effects'
import { fetchCategoriesSuccess, fetchCategoriesFailed } from './categories.action'
import { getCategoriesAndDocuments } from '../../utils/firebase/firebase.utils'
import { CATEGORIES_ACTION_TYPES } from './categories.type'


export function* fetchCategoriesAsync () {
  try {
    const categoriesArray = yield call(getCategoriesAndDocuments)
    yield put(fetchCategoriesSuccess(categoriesArray))
  } catch (error) {
    yield put(fetchCategoriesFailed(error))

  }

}

export function* onFetchCategories () {
  //receive latest action
  yield takeLatest(CATEGORIES_ACTION_TYPES.FETCH_CATEGORIES_START, fetchCategoriesAsync)
}
export function* categoriesSaga () {
  yield all([call(onFetchCategories)])
}