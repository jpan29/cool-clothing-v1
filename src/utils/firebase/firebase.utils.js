
import { initializeApp } from 'firebase/app'
import {
  getAuth,
  signInWithRedirect,
  signInWithPopup,
  GoogleAuthProvider,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signOut,
  onAuthStateChanged

} from 'firebase/auth'
import {
  getFirestore,
  doc,
  getDoc,
  setDoc
} from 'firebase/firestore'
const firebaseConfig = {
  apiKey: "AIzaSyCu0ufOrqdDOejJ60nerqEkBiCfKtwsn0A",
  authDomain: "cool-clothing-db-f5ba6.firebaseapp.com",
  projectId: "cool-clothing-db-f5ba6",
  storageBucket: "cool-clothing-db-f5ba6.appspot.com",
  messagingSenderId: "860746125276",
  appId: "1:860746125276:web:4d8ad97e824cb123280919"
}

// Initialize Firebase
const firebaseApp = initializeApp(firebaseConfig)

const provider = new GoogleAuthProvider()
provider.setCustomParameters({
  prompt: 'select_account'
})

export const auth = getAuth()
export const signInWithGooglePopup = () => signInWithPopup(auth, provider)
export const signInWithGoogleRedirect = () => signInWithRedirect(auth, provider)


export const db = getFirestore()
export const createUserDocumentFromAuth = async (userAuth, additionalInfo = {}) => {
  if (!userAuth) return
  const userDocRef = doc(db, 'users', userAuth.uid)
  const userSnapshot = await getDoc(userDocRef)

  if (!userSnapshot.exists()) {
    const { displayName, email } = userAuth
    const createdAt = new Date()

    try {
      await setDoc(userDocRef, {
        displayName,
        email,
        createdAt,
        ...additionalInfo

      })
    } catch (err) {
      console.log(err.message)
    }

  }
  return userDocRef
}
export const createAuthUserWithEmailAndPassword = async (email, password) => {
  if (!email || !password) return
  return await createUserWithEmailAndPassword(auth, email, password)
}
export const signInAuthUserWithEmailAndPassword = async (email, password) => {
  if (!email || !password) return
  return await signInWithEmailAndPassword(auth, email, password)
}
export const signOutUser = async () => await signOut(auth)
export const onAuthStateChangedListener = (callback) => onAuthStateChanged(auth, callback)