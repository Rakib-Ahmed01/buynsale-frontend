import { Paper, Text } from '@mantine/core';
import { useQuery } from '@tanstack/react-query';
import axios from 'axios';
import { useContext } from 'react';
import Loader from '../components/Loader';
import Product from '../components/Product';
import { AuthContext } from '../contexts/UserContext';

export default function MyProducts() {
  const { user } = useContext(AuthContext);
  const { data: products, isLoading } = useQuery(['myproducts'], async () => {
    const data = await axios(
      `${process.env.REACT_APP_url}/my-products?email=${user.email}`,
      {
        headers: {
          authorization: `Bearer ${localStorage.getItem('token-bns')}`,
        },
      }
    );
    return data.data;
  });

  if (isLoading) {
    return <Loader />;
  }

  return (
    <>
      {products.length ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5 mt-2">
          {products.map((product) => {
            return (
              <Product
                key={product._id}
                product={product}
                componentType="my-products"
              />
            );
          })}
        </div>
      ) : (
        <div className="flex justify-center items-center min-h-[60vh] mx-1">
          <Paper shadow="sm" p="xl" className="mx-auto">
            <Text fz="xl" fw={600}>
              No product is added
            </Text>
          </Paper>
        </div>
      )}
    </>
  );
}
