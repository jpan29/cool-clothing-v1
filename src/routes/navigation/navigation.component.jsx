import { Fragment } from 'react'
import { Outlet } from 'react-router-dom'

import { ReactComponent as CoolLogo } from '../../assets/logo.svg'
import CartIcon from '../../components/cart-icon/cart-icon.component'

import { useSelector } from 'react-redux'
import {
  NavigationContainer,
  LogoContainer,
  NavLinks,
  NavLink,
} from './navigation.styles'

import { selectCurrentUser } from '../../store/user/user.selector'
import { useDispatch } from 'react-redux'
import { signOutStart } from '../../store/user/user.action'

const Navigation = () => {
  const currentUser = useSelector(selectCurrentUser)
  const dispatch = useDispatch()
  const signOutUser = () => dispatch(signOutStart())

  return (
    <Fragment>
      <NavigationContainer>
        <LogoContainer to="/">
          <CoolLogo className="logo" />
        </LogoContainer>

        <NavLinks>
          <NavLink to="/shop">SHOP</NavLink>

          {currentUser ? (
            <NavLink as="span" onClick={signOutUser}>
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
