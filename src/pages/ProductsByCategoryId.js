import { useQuery } from '@tanstack/react-query';
import axios from 'axios';
import { useParams } from 'react-router-dom';
import Loader from '../components/Loader';
import Product from '../components/Product';

export default function ProductsByCategoryId() {
  const { id } = useParams();

  const { data: productsByCategory, isLoading } = useQuery(
    ['productsByCategory', id],
    async () => {
      const data = await axios(`${process.env.REACT_APP_url}/products/${id}`);
      return data.data;
    }
  );

  if (isLoading) {
    return <Loader />;
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-2">
      {productsByCategory.map((product, index) => {
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
