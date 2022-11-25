import { Link } from 'react-router-dom';

export default function Category({ category }) {
  const { _id, image, categoryName } = category;
  return (
    <>
      <div
        className="category overflow-hidden max-w-[400px] max-h-[250px] relative mx-auto"
        data-aos="fade-left"
      >
        <div className="">
          <Link to={`../products/${_id}`}>
            <img src={image} alt={categoryName} className="w-full h-full" />
            <h3 className="bg-black text-white rounded-br-lg absolute p-2 text-2xl z-10 top-0">
              {categoryName}
            </h3>
          </Link>
        </div>
      </div>
    </>
  );
}
