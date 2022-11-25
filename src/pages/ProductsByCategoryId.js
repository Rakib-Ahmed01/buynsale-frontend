import { useQuery } from '@tanstack/react-query';
import axios from 'axios';
import { useParams } from 'react-router-dom';

export default function ProductsByCategoryId() {
  const { id } = useParams();

  const { data: productsByCategory, isLoading } = useQuery(
    ['productsByCategory', id],
    async () => {
      const data = await axios(`${process.env.REACT_APP_url}/products/${id}`);
      return data.data;
    }
  );

  return <div>ProductsByCategoryId</div>;
}
