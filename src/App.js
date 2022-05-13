import { Routes, Route } from 'react-router-dom'
import Navigation from './routes/navigation/navigation.component'
import Home from './routes/home/home.component'
import Shop from './routes/shop/shop.component'
import CheckOut from './routes/check-out/checkout.component'
import Authentication from './routes/authentication/authentication.component'

const App = () => {

  return (
    <Routes>
      <Route path='/' element={<Navigation />}>
        <Route index element={<Home />} />
        <Route path='shop/*' element={<Shop />} />
        <Route path='check-out' element={<CheckOut />} />
        <Route path='auth' element={<Authentication />} />

      </Route>





    </Routes>

  )
}

export default App
