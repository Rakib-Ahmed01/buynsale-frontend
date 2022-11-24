import { useQuery } from '@tanstack/react-query';
import axios from 'axios';
import Category from './Category';
import Loader from './Loader';

export default function Cateogories() {
  const { data: categories, isLoading } = useQuery(
    ['products-categories'],
    async () => {
      const data = await axios(
        `${process.env.REACT_APP_url}/products-categories`
      );
      return data.data;
    }
  );
  if (isLoading) {
    return <Loader />;
  }
  return (
    <section className="bg-white dark:bg-gray-900">
      <div className="container px-6 py-10 mx-auto">
        <div>
          <h1 className="text-3xl font-semibold text-center text-gray-800 capitalize xl:text-4xl lg:text-4xl dark:text-white mb-3">
            Categories
          </h1>

          <p className="text-center max-w-5xl mx-auto">
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Explicabo,
            repellendus eaque perferendis ducimus ratione vitae consequatur
            consectetur.
          </p>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3 mt-6 mx-auto">
          {categories.map((category) => {
            return <Category key={category._id} category={category} />;
          })}
        </div>
      </div>
    </section>
  );
}