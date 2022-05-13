import { Fragment } from 'react'
import { Outlet } from 'react-router-dom'
import { useContext } from 'react'
import { ReactComponent as CoolLogo } from '../../assets/logo.svg'
import CartIcon from '../../components/cart-icon/cart-icon.component'
import { UserContext } from '../../context/user.context'
import {
  NavigationContainer,
  LogoContainer,
  NavLinks,
  NavLink,
} from './navigation.styles'
import { signOutUser } from '../../utils/firebase/firebase.utils'

const Navigation = () => {
  const { currentUser } = useContext(UserContext)

  return (
    <Fragment>
      <NavigationContainer>
        <LogoContainer to="/">
          <div className="logo">
            <CoolLogo />
          </div>
        </LogoContainer>

        <NavLinks>
          <NavLink to="/shop">SHOP</NavLink>
          <NavLink to="/contact">CONTACT</NavLink>
          {currentUser ? (
            <NavLink as span onClick={signOutUser}>
              SIGN OUT
            </NavLink>
          ) : (
            <NavLink to="/auth">SIGN IN</NavLink>
          )}

          <CartIcon />
        </NavLinks>
      </NavigationContainer>
      <Outlet />
    </Fragment>
  )
}
export default Navigation
