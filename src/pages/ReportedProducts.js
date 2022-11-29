import { Paper, Text } from '@mantine/core';
import { useQuery } from '@tanstack/react-query';
import axios from 'axios';
import Loader from '../components/Loader';
import Product from '../components/Product';

export default function ReportedProducts() {
  const { data: reportedProducts, isLoading } = useQuery(
    ['reportedProducts'],
    async () => {
      const data = await axios(
        `${process.env.REACT_APP_url}/reported-products`
      );
      return data.data;
    }
  );

  if (isLoading) {
    return <Loader />;
  }

  return (
    <>
      {reportedProducts.length ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mt-2">
          {reportedProducts.map((product) => {
            return (
              <Product
                key={product._id}
                product={product}
                componentType="report"
              />
            );
          })}
        </div>
      ) : (
        <div className="flex justify-center items-center min-h-[60vh] mx-1">
          <Paper shadow="sm" p="xl" className="mx-auto">
            <Text fz="xl" fw={600}>
              No product is reported
            </Text>
          </Paper>
        </div>
      )}
    </>
  );
}
