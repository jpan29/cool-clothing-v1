import { useState } from 'react'
import FormInput from '../form-input/form-input.component'
import './sign-in-form.styles.scss'
import Button from '../button/button.component'

import {
  signInWithGooglePopup,
  createUserDocumentFromAuth,
  signInAuthUserWithEmailAndPassword,
} from '../../utils/firebase/firebase.utils'
const defaultFormFields = {
  email: '',
  password: '',
}

const SignIn = () => {
  const [formFields, setFormFields] = useState(defaultFormFields)
  const { email, password } = formFields
  const reset = () => {
    setFormFields(defaultFormFields)
  }

  const signInWithGoogle = async () => {
    await signInWithGooglePopup()
  }
  const submitHandler = async (e) => {
    e.preventDefault()

    try {
      await signInAuthUserWithEmailAndPassword(email, password)
      reset()
    } catch (err) {
      switch (err.code) {
        case 'auth/wrong-password':
          alert('Incorrect email or password')
          break
        case 'auth/user-not-found':
          alert('No user with this email')
          break
        default:
          alert('Something wrong 🥲💥')
      }
    }
  }
  const changeHandler = (e) => {
    const { name, value } = e.target
    setFormFields({ ...formFields, [name]: value })
  }

  return (
    <div className="sign-in-container">
      <h2>Already have an account</h2>
      <h1>Sign in</h1>
      <form onSubmit={submitHandler}>
        <FormInput
          label="Email"
          onChange={changeHandler}
          type="email"
          name="email"
          value={email}
          required
        />
        <FormInput
          label="Password"
          onChange={changeHandler}
          type="password"
          name="password"
          value={password}
          required
        />
        <div className="buttons-container">
          <Button type="submit">SIGN IN</Button>
          <Button type="button" buttonType="google" onClick={signInWithGoogle}>
            GOOGLE SIGN IN
          </Button>
        </div>
      </form>
    </div>
  )
}
export default SignIn
