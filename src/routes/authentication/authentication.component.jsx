import SignUp from '../../components/signup/signup.component'
import SignIn from '../../components/signin/signin.component'
import './authentication.styles.scss'
import {
  signInWithGooglePopup,
  createUserDocumentFromAuth,
} from '../../utils/firebase/firebase.utils'

const Authentication = () => {
  // useEffect(async () => {
  //   const result = await getRedirectResult(auth)
  //   if (result) {
  //     const userDocRef = await createUserDocumentFromAuth(result.user)
  //   }
  // }, [])
  const logGoogleUser = async () => {
    const { user } = await signInWithGooglePopup()

    await createUserDocumentFromAuth(user)
  }
  return (
    <div className="authentication-container">
      <SignUp />
      <SignIn onClick={logGoogleUser} />
    </div>
  )
}
export default Authentication
