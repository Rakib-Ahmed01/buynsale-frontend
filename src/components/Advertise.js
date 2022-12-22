import { useQuery } from '@tanstack/react-query';
import axios from 'axios';
import { Link } from 'react-router-dom';
import Product from '../components/Product';
import Loader from './Loader';

export default function Advertise() {
  const { data: products, isLoading } = useQuery(['products'], async () => {
    const data = await axios(`${process.env.REACT_APP_url}/products`);
    return data.data;
  });

  if (isLoading) {
    return <Loader />;
  }

  return (
    <section
      className={`bg-white dark:bg-gray-900 ${
        !products.length ? 'hidden' : ''
      }`}
    >
      <div className="w-[98%] md:container py-10 mx-auto">
        <div>
          <h1 className="text-3xl font-semibold text-center text-gray-800 capitalize xl:text-4xl lg:text-4xl dark:text-white mb-3">
            Advertised Products
          </h1>

          <p className="text-center max-w-5xl mx-auto">
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Explicabo,
            repellendus eaque perferendis ducimus ratione vitae consequatur
            consectetur.
          </p>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5 mt-2">
          {products.slice(0, 6).map((product, index) => {
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
        <Link to="/all-products">
          <button className="btn block mx-auto mt-4">All Products</button>
        </Link>
      </div>
    </section>
  );
}
