import { Paper, Text } from '@mantine/core';
import { useQuery } from '@tanstack/react-query';
import axios from 'axios';
import { useContext } from 'react';
import Loader from '../components/Loader';
import SellerBuyer from '../components/SellerBuyer';
import { AuthContext } from '../contexts/UserContext';

export default function AllSellers() {
  const { user } = useContext(AuthContext);
  const { data: sellers, isLoading } = useQuery(['sellers'], async () => {
    const data = await axios(
      `${process.env.REACT_APP_url}/sellers?email=${user.email}`
    );
    return data.data;
  });

  if (isLoading) {
    return <Loader />;
  }

  return (
    <>
      {sellers.length ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5 mt-2">
          {sellers.map((seller) => {
            return (
              <SellerBuyer
                key={seller._id}
                sellerOrBuyer={seller}
                componentType="seller"
              />
            );
          })}
        </div>
      ) : (
        <div className="flex justify-center items-center min-h-[60vh] mx-1">
          <Paper shadow="sm" p="xl" className="mx-auto">
            <Text fz="xl" fw={600}>
              No seller is found
            </Text>
          </Paper>
        </div>
      )}
    </>
  );
}
