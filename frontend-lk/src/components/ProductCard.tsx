import {
  Card,
  CardActions,
  CardContent,
  CardMedia,
  Grid,
  Button,
  Typography,
  Rating,
} from '@mui/material'
import AddShoppingCartIcon from '@mui/icons-material/AddShoppingCart'

interface ProductCardProps {
  imageUrl: string
  title: string
  price: number
  description: string
  rating: number
  numberOfRatings: number
}

const ProductCard = (props: ProductCardProps) => {
  return (
    <Card sx={{ margin: 2 }} raised>
      <Grid container spacing={2}>
        <Grid item xs={2}>
          <CardMedia
            sx={{ padding: 2 }}
            image='https://fakestoreapi.com/img/81fPKd-2AYL._AC_SL1500_.jpg'
            title='backpack1'
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
          <Rating name='read-only' value={props.rating} readOnly />(
          {props.numberOfRatings})
          <CardActions>
            <Button
              variant='contained'
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
