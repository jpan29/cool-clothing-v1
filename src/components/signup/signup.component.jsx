import { useState } from 'react'
import FormInput from '../form-input/form-input.component'
import './sign-up-form.styles.scss'
import Button from '../button/button.component'

import {
  createAuthUserWithEmailAndPassword,
  createUserDocumentFromAuth,
} from '../../utils/firebase/firebase.utils'
const defaultFormFields = {
  displayName: '',
  email: '',
  password: '',
  confirmPassword: '',
}

const SignUp = () => {
  const [formFields, setFormFields] = useState(defaultFormFields)
  const { displayName, email, password, confirmPassword } = formFields
  const reset = () => {
    setFormFields(defaultFormFields)
  }

  const submitHandler = async (e) => {
    e.preventDefault()

    if (password !== confirmPassword) return alert('Passwords are not same')
    try {
      const { user } = await createAuthUserWithEmailAndPassword(email, password)

      await createUserDocumentFromAuth(user, { displayName })
      reset()
    } catch (err) {
      if (err.code === 'auth/email-already-in-use')
        alert('Email has already in use')
      else console.log(err.message)
    }
  }
  const changeHandler = (e) => {
    const { name, value } = e.target
    setFormFields({ ...formFields, [name]: value })
  }

  return (
    <div className="sign-up-container">
      <h2>Don't have an account?</h2>
      <h1>Sign up</h1>
      <form onSubmit={submitHandler}>
        <FormInput
          label="Display Name"
          onChange={changeHandler}
          type="text"
          name="displayName"
          value={displayName}
          required
        />
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
        <FormInput
          label="Confirm Password"
          onChange={changeHandler}
          type="password"
          name="confirmPassword"
          value={confirmPassword}
          required
        />

        <Button type="submit">SIGN UP</Button>
      </form>
    </div>
  )
}
export default SignUp
