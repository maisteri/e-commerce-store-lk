import * as React from 'react'
import Rating from '@mui/material/Rating'

interface Props {
  rating: number
  numberOfRatings: number
}

const BasicRating = ({ rating, numberOfRatings }: Props) => {
  const [value, setValue] = React.useState<number | null>(2)
  console.log(value)

  return (
    <>
      <Rating
        name='product-rating'
        precision={1}
        value={Number(rating)}
        onChange={(_event, newValue) => {
          setValue(newValue)
          console.log(newValue)
        }}
      />
      ({numberOfRatings})
    </>
  )
}

export default BasicRating
