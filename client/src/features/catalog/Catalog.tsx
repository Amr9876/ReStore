import { Button } from "@mui/material"
import { useEffect, useState } from "react";
import agent from "../../app/api/agent";
import LoadingComponent from "../../app/layout/LoadingComponent";
import { Product } from "../../app/models/product"
import ProductList from "./ProductList"

function Catalog() {

  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    agent.Catalog.list()
      .then(data => setProducts(data))
      .catch(error => console.log(error))    
      .finally(() => setLoading(false));
  }, []);

  if (loading) return <LoadingComponent />;

  function addProduct(){
    setProducts(prevState => [...prevState, {
      id: prevState.length + 101,
      name: 'product' + (prevState.length + 1),
      price: (prevState.length * 100) + 100,
      description: 'some description',
      brand: 'some brand',
      pictureUrl: 'http://picsum.photos/200',
    }]);
  }

  return (
    <>
      <ProductList products={products} />
      <Button variant='contained' onClick={addProduct}>Add product</Button>
    </>
  )
}

export default Catalog