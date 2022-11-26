import { formatDistanceToNowStrict } from 'date-fns';
import { GoVerified } from 'react-icons/go';
import { PhotoView } from 'react-photo-view';

export default function Product({ product, index }) {
  const {
    image,
    title,
    description,
    sellerName,
    condition,
    resalePrice,
    originalPrice,
    yearsOfUse,
    time,
    location,
    sellerVerified,
    categoryName,
  } = product;

  return (
    <div
      className="product border rounded-md"
      // data-aos={`${index % 2 !== 0 ? 'fade-left' : 'fade-right'}`}
      // data-aos-easing="ease-in-out"
    >
      <div>
        <PhotoView src={image}>
          <img src={image} alt="" />
        </PhotoView>
      </div>
      <div className="p-2">
        <div className="flex justify-between items-center gap-8">
          <h2 className="text-xl font-semibold tracking-wide">{title}</h2>
        </div>
        <h2 className="text-md tracking-wide flex gap-1 -mt-[2px]">
          <span className="font-semibold text-gray-800">For sale by</span>
          <span className="underline font-semibold text-blue-500 flex items-center gap-1">
            {sellerName}
            {sellerVerified && <GoVerified title="Verified Seller" />}
          </span>
        </h2>
        <p className="mb-2">
          <span className="text-base font-semibold">
            Posted{' '}
            {formatDistanceToNowStrict(new Date(time), { addSuffix: true })}
          </span>
        </p>
        <div className="space-y-1 text-[16.5px]">
          <p>{description.substr(0, 100)}...</p>
          <p>
            Brand: <span className=" font-semibold">{categoryName}</span>
          </p>
          <p>
            Original Price:{' '}
            <span className=" font-semibold">{originalPrice}Tk</span>
          </p>
          <p>
            Resale Price:{' '}
            <span className=" font-semibold">{resalePrice}Tk</span>
          </p>
          <p>
            Condition: <span className=" font-semibold">{condition}</span>
          </p>
          <p>
            Years Of Use: <span className=" font-semibold">{yearsOfUse}</span>
          </p>
          <p>
            Location: <span className="font-semibold">{location}</span>
          </p>
        </div>
      </div>
      <div className="flex gap-2 px-2 pb-2">
        <button className="btn w-full">Book Now</button>
        <button className="secondary-btn w-full">Wishlist</button>
      </div>
    </div>
  );
}
