import { useQuery } from '@tanstack/react-query';
import axios from 'axios';
import Loader from '../components/Loader';

export default function Products() {
  const { data: products, isLoading } = useQuery(['products'], async () => {
    const data = await axios(`${process.env.REACT_APP_url}/products`);
    return data.data;
  });

  if (isLoading) {
    return <Loader />;
  }

  console.log(products);
  return <div>Products</div>;
}
