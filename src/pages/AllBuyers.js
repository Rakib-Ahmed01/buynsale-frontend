import { Paper, Text } from '@mantine/core';
import { useQuery } from '@tanstack/react-query';
import axios from 'axios';
import { useContext } from 'react';
import Loader from '../components/Loader';
import SellerBuyer from '../components/SellerBuyer';
import { AuthContext } from '../contexts/UserContext';

export default function AllBuyers() {
  const { user } = useContext(AuthContext);
  const { data: users, isLoading } = useQuery(['users'], async () => {
    const data = await axios(
      `${process.env.REACT_APP_url}/users?email=${user.email}`,
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
      {users.length ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5 mt-2">
          {users.map((buyer) => {
            return (
              <SellerBuyer
                key={buyer._id}
                sellerOrBuyer={buyer}
                componentType="buyer"
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
    </>
  );
}
