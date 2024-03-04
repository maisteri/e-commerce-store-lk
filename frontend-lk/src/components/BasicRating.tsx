import * as React from 'react'
import Rating from '@mui/material/Rating'
import productService from '../services/product'
import { RatingComponentProps } from '../types'
import { useAppDispatch } from '../hooks'
import { notify } from '../reducers/siteGeneralReducer'
import { SUCCESSFUL_RATING, UNSUCCESSFUL_RATING } from '../constants'

const BasicRating = ({
  rating,
  numberOfRatings,
  productId,
}: RatingComponentProps) => {
  const dispatch = useAppDispatch()

  const handleChange = async (
    _event: React.SyntheticEvent<Element, Event>,
    value: number | null
  ) => {
    const newRating = value || rating
    console.log('this is the rating given: ', newRating)
    try {
      await productService.postRating({
        rating: newRating,
        productId,
      })
      dispatch(notify(SUCCESSFUL_RATING))
    } catch {
      console.log('catched!')
      dispatch(notify(UNSUCCESSFUL_RATING))
    }
  }

  return (
    <>
      <Rating
        name='product-rating'
        precision={1}
        value={Number(rating)}
        onChange={handleChange}
      />
      ({numberOfRatings})
    </>
  )
}

export default BasicRating
