import {
  Card,
  CardActions,
  CardContent,
  CardMedia,
  Grid,
  Button,
  Typography,
} from '@mui/material'
import AddShoppingCartIcon from '@mui/icons-material/AddShoppingCart'
import { useAppDispatch, useAppSelector } from '../hooks'
import { Product } from '../types'
import { addItemToCart } from '../reducers/shoppingCartReducer'
import BasicRating from './BasicRating'

const ProductCard = (props: Product) => {
  const items = useAppSelector((state) => state.shoppingCart)
  const dispatch = useAppDispatch()

  const handleItemAddToCart = (event: React.SyntheticEvent) => {
    event.preventDefault()
    dispatch(addItemToCart(props.id))
    console.log(items)
  }

  return (
    <Card sx={{ margin: 2 }} raised>
      <Grid container spacing={2}>
        <Grid item xs={2}>
          <CardMedia
            sx={{ padding: 2 }}
            image={props.imageUrl}
            title={props.title}
            component='img'
          />
        </Grid>
        <Grid item xs={7}>
          <CardContent>
            <Typography gutterBottom variant='h5' component='div'>
              {props.title}
            </Typography>
            <Typography variant='body2' color='text.secondary'>
              {props.description}
            </Typography>
            <Typography variant='h5' color='text.secondary'>
              {props.price} €
            </Typography>
          </CardContent>
        </Grid>
        <Grid item xs={3}>
          <BasicRating
            rating={props.rating}
            numberOfRatings={props.numberOfRatings}
          />
          <CardActions>
            <Button
              variant='contained'
              onClick={handleItemAddToCart}
              color='success'
              startIcon={<AddShoppingCartIcon fontSize='large' />}
            ></Button>
          </CardActions>
        </Grid>
      </Grid>
    </Card>
  )
}

export default ProductCard
