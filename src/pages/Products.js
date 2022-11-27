import { useQuery } from '@tanstack/react-query';
import axios from 'axios';
import Loader from '../components/Loader';
import Product from '../components/Product';

export default function Products() {
  const { data: products, isLoading } = useQuery(['products'], async () => {
    const data = await axios(`${process.env.REACT_APP_url}/products`);
    return data.data;
  });

  if (isLoading) {
    return <Loader />;
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mt-2">
      {products.map((product, index) => {
        return (
          <Product
            key={product._id}
            product={product}
            index={index}
            componentType="main"
          />
        );
      })}
    </div>
  );
}
