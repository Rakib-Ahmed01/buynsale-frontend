import { Paper, Text } from '@mantine/core';
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
    <>
      {productsByCategory.length ? (
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
      ) : (
        <div className="flex justify-center items-center min-h-[60vh] mx-1">
          <Paper shadow="sm" p="xl" className="mx-auto">
            <Text fz="xl" fw={600}>
              No product is found in this category
            </Text>
          </Paper>
        </div>
      )}
    </>
  );
}
