import * as React from 'react'
import CssBaseline from '@mui/material/CssBaseline'
import Box from '@mui/material/Box'
import Container from '@mui/material/Container'
import Paper from '@mui/material/Paper'
import Stepper from '@mui/material/Stepper'
import Step from '@mui/material/Step'
import StepLabel from '@mui/material/StepLabel'
import Button from '@mui/material/Button'
import Typography from '@mui/material/Typography'
import AddressForm from './AddressForm'
import PaymentForm from './PaymentForm'
import Review from './Review'
import {
  useAddressForm,
  useAppDispatch,
  useAppSelector,
  usePaymentForm,
} from '../../hooks'
import {
  saveDeliveryAddress,
  setPaymentInfo,
  removeDeliveryAddress,
  setNotification,
} from '../../reducers/siteGeneralReducer'
import { CREDIT_CARD_INFO } from '../../constants'
import { Address, Order, OrderId, Payment } from '../../types'
import orderService from '../../services/order'
import { setCart } from '../../reducers/shoppingCartReducer'

const steps = ['Shipping address', 'Payment details', 'Review your order']

export default function Checkout() {
  const [activeStep, setActiveStep] = React.useState(0)
  const [orderId, setOrderId] = React.useState<OrderId>()
  const dispatch = useAppDispatch()
  const deliveryaddress = useAppSelector(
    (state) => state.general.deliveryAddress
  )

  const { handleAddressSubmit, addressControl, addressErrors } =
    useAddressForm()
  const { handlePaymentSubmit, paymentControl, paymentErrors } =
    usePaymentForm()

  function getStepContent(step: number) {
    switch (step) {
      case 0:
        return <AddressForm control={addressControl} errors={addressErrors} />
      case 1:
        return <PaymentForm control={paymentControl} errors={paymentErrors} />
      case 2:
        return <Review />
      default:
        throw new Error('Unknown step')
    }
  }

  const onAddressSubmit = async (data: Address) => {
    dispatch(saveDeliveryAddress(data))
    setActiveStep(activeStep + 1)
  }

  const onPaymentSubmit = async (data: Payment) => {
    dispatch(setNotification(CREDIT_CARD_INFO))
    dispatch(setPaymentInfo(data))
    setActiveStep(activeStep + 1)
  }

  const handleNext = async () => {
    if (activeStep === 0) {
      handleAddressSubmit(onAddressSubmit)()
    }
    if (activeStep === 1) {
      handlePaymentSubmit(onPaymentSubmit)()
    }

    if (activeStep == 2) {
      if (deliveryaddress) {
        const order: Order = {
          addressId: deliveryaddress.addressId,
          deliveryMethod: 'budbee',
          paymentMethod: 'creditcard',
        }
        const orderData: OrderId = await orderService.makeOrder(order)
        setOrderId(orderData)
        dispatch(setCart([]))
        dispatch(removeDeliveryAddress())
      }
      setActiveStep(activeStep + 1)
    }
  }

  const handleBack = () => {
    setActiveStep(activeStep - 1)
  }

  return (
    <React.Fragment>
      <CssBaseline />
      <Container component='main' maxWidth='sm' sx={{ mb: 4 }}>
        <Paper
          variant='outlined'
          sx={{ my: { xs: 3, md: 6 }, p: { xs: 2, md: 3 } }}
        >
          <Typography component='h1' variant='h4' align='center'>
            Checkout
          </Typography>
          <Stepper activeStep={activeStep} sx={{ pt: 3, pb: 5 }}>
            {steps.map((label) => (
              <Step key={label}>
                <StepLabel>{label}</StepLabel>
              </Step>
            ))}
          </Stepper>
          {activeStep === steps.length ? (
            <React.Fragment>
              <Typography variant='h5' gutterBottom>
                Thank you for your order.
              </Typography>
              <Typography variant='subtitle1'>
                Your order number is #{orderId}. We have emailed your order
                confirmation (NOT really though since this is a fake store), and
                will send you an update when your order has shipped.
              </Typography>
            </React.Fragment>
          ) : (
            <React.Fragment>
              {getStepContent(activeStep)}
              <Box sx={{ display: 'flex', justifyContent: 'flex-end' }}>
                {activeStep !== 0 && (
                  <Button onClick={handleBack} sx={{ mt: 3, ml: 1 }}>
                    Back
                  </Button>
                )}
                <Button
                  variant='contained'
                  onClick={handleNext}
                  sx={{ mt: 3, ml: 1 }}
                >
                  {activeStep === steps.length - 1 ? 'Place order' : 'Next'}
                </Button>
              </Box>
            </React.Fragment>
          )}
        </Paper>
      </Container>
    </React.Fragment>
  )
}

