import { Paper, Text } from '@mantine/core';
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
    <div className="w-[98%] md:container mx-auto">
      {products.length ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5 mt-2">
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
      ) : (
        <div className="flex justify-center items-center min-h-[60vh] mx-1">
          <Paper shadow="sm" p="xl" className="mx-auto">
            <Text fz="xl" fw={600}>
              No buyer is found
            </Text>
          </Paper>
        </div>
      )}
    </div>
  );
}
