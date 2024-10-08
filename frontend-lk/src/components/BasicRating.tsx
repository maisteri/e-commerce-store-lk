import * as React from 'react'
import Rating from '@mui/material/Rating'
import productService from '../services/product'
import { RatingComponentProps } from '../types'
import { useAppDispatch, useAppSelector } from '../hooks'
import { notify } from '../reducers/siteGeneralReducer'
import { SUCCESSFUL_RATING } from '../constants'
import axios from 'axios'

const BasicRating = ({
  rating,
  numberOfRatings,
  productId,
}: RatingComponentProps) => {
  const dispatch = useAppDispatch()
  const userToken = useAppSelector((state) => state.user?.token)

  const handleChange = async (
    _event: React.SyntheticEvent<Element, Event>,
    value: number | null
  ) => {
    const newRating: number = value || Math.floor(rating)
    try {
      await productService.postRating({
        rating: newRating,
        productId,
        token: userToken,
      })
      dispatch(notify(SUCCESSFUL_RATING))
    } catch (error) {
      if (axios.isAxiosError(error)) {
        dispatch(
          notify({
            message: `NOTE! You must be logged in for rating.`,
            severity: 'error',
          })
        )
      }
    }
  }

  return (
    <>
      <Rating
        name={`product-rating-${productId}`}
        precision={1}
        value={Number(rating)}
        onChange={handleChange}
      />
      ({numberOfRatings})
    </>
  )
}

export default BasicRating
