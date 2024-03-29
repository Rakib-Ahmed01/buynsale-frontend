import { Link } from 'react-router-dom';

const Banner = () => {
  return (
    <div className="rounded-sm bg-gray-900">
      <div className="mx-auto w-[98%] md:px-4 md:container py-8 md:py-12 px-1">
        <div className="items-center lg:flex">
          <div className="w-full lg:w-1/2" data-aos="fade-right">
            <div className="lg:max-w-lg">
              <h1 className="text-2xl font-semibold text-gray-100 uppercase dark:text-white lg:text-4xl">
                Best Quality Phone at
                <span className="block -ml-[2px] mt-1 font-bold text-cyan-500 text-4xl md:text-5xl">
                  Minimal Price
                </span>
              </h1>

              <p className="mt-2 text-gray-200 dark:text-gray-400">
                Lorem ipsum dolor sit amet consectetur adipisicing elit. Quas
                animi iure quisquam corporis dignissimos ut quo aut, facilis
                pariatur exercitationem tenetur ab, praesentium, laboriosam
                esse.
              </p>

              <Link to="/all-products" className="btn mt-6 inline-block">
                All Products
              </Link>
            </div>
          </div>

          <div
            data-aos="fade-left"
            className="flex items-center justify-center w-full mt-6 lg:mt-0 lg:w-1/2"
          >
            <img
              src="https://i.ibb.co/xMvWZLf/clay-banks-Xv-S-u-KUo-Uao-unsplash.jpg"
              alt="our shop"
              className="rounded"
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Banner;
