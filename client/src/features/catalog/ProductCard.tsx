import { Button, Card, CardActions, CardContent, CardHeader, CardMedia, Typography, Avatar } from "@mui/material"
import { Product } from "../../app/models/product"

interface Props {
    product: Product,
}

function ProductCard({ product }: Props) {
  return (
    <Card sx={{ maxWidth: 345 }}>
      <CardHeader 
        avatar={
          <Avatar sx={{bgcolor: 'secondary'}}>
            {product.name.charAt(0).toUpperCase()}
          </Avatar>
        }      
        title={product.name}  
        titleTypographyProps={{
          sx: { fontWeight: 'bold', color: 'primary' }
        }}
      />
      <CardMedia
        sx={{ height: 140, backgroundSize: 'contain', bgcolor: 'secondary' }}
        image={product.pictureUrl}
        title={product.name}
      />
      <CardContent>
        <Typography gutterBottom variant="h5" component="div">
          ${(product.price / 100).toFixed(2)}
        </Typography>
        <Typography variant="body2" color="text.secondary">
          {product.brand} / {product.type}
        </Typography>
      </CardContent>
      <CardActions>
        <Button size="small">Add to cart</Button>
        <Button size="small">View</Button>
      </CardActions>
    </Card>
  )
}

export default ProductCard