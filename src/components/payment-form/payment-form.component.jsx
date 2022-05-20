import { useState } from 'react'
import { useSelector } from 'react-redux'
import { CardElement, useStripe, useElements } from '@stripe/react-stripe-js'
import {
  PaymentFormContainer,
  FormContainer,
  PaymentButton,
} from './payment-form.styles'
import { selectTotalPrice } from '../../store/cart/cart.selector'
import { selectCurrentUser } from '../../store/user/user.selector'
const PaymentForm = () => {
  const stripe = useStripe()
  const elements = useElements()
  const amount = useSelector(selectTotalPrice)
  const currentUser = useSelector(selectCurrentUser)
  const [isProcessingPayment, setProcessingPayment] = useState(false)
  const paymentHandler = async (e) => {
    e.preventDefault()
    if (!stripe || !elements) return
    setProcessingPayment(true)
    const response = await fetch('/.netlify/functions/create-payment-intent', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ amount: amount * 100 }),
    }).then((res) => res.json())
    const {
      paymentIntent: { client_secret },
    } = response

    const paymentResult = await stripe.confirmCardPayment(client_secret, {
      payment_method: {
        card: elements.getElement(CardElement),
        billing_details: {
          name: currentUser ? currentUser.displayName : 'Guest',
        },
      },
    })
    setProcessingPayment(false)
    if (paymentResult.error) {
      alert(paymentResult.error)
    } else {
      if (paymentResult.paymentIntent.status === 'succeeded') {
        alert('Payment Successful')
      }
    }
  }
  return (
    <PaymentFormContainer>
      <FormContainer onSubmit={paymentHandler}>
        <h2>Credit Card Payment:</h2>
        <CardElement />
        <PaymentButton isLoading={isProcessingPayment}>Pay now</PaymentButton>
      </FormContainer>
    </PaymentFormContainer>
  )
}
export default PaymentForm
