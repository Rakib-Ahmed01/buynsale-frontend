import { Input, Modal } from '@mantine/core';
import { formatDistanceToNowStrict } from 'date-fns';
import { useContext, useState } from 'react';
import { useForm } from 'react-hook-form';
import toast from 'react-hot-toast';
import { AiOutlineMail, AiOutlineUser } from 'react-icons/ai';
import { FiPhoneCall } from 'react-icons/fi';
import { GiSmartphone } from 'react-icons/gi';
import { GoVerified } from 'react-icons/go';
import { IoLocationOutline, IoPricetagOutline } from 'react-icons/io5';
import { PhotoView } from 'react-photo-view';
import { AuthContext } from '../contexts/UserContext';

export default function Product({ product }) {
  const [opened, setOpened] = useState(false);
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
    _id,
  } = product;

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm();

  const hanldeBooking = (data) => {
    const { number, location } = data;

    const order = { ...product };
    delete order._id;

    fetch(`${process.env.REACT_APP_url}/orders`, {
      method: 'PUT',
      headers: { 'content-type': 'application/json' },
      body: JSON.stringify({
        ...order,
        buyerEmail: user.email,
        buyerName: user.displayName,
        buyerPhone: number,
        meetingLocation: location,
        productId: _id,
      }),
    })
      .then((res) => res.json())
      .then((data) => {
        const { upsertedId, matchedCount } = data;
        if (!upsertedId && matchedCount) {
          toast.error(`You've already booked ${title}`);
        } else {
          toast.success(`${title} has been added to your account`);
        }
      })
      .catch((err) => {
        console.log(err);
        toast.error('Something went worng!');
      });

    reset();
    setOpened(false);
  };

  const handleWishlist = () => {
    const wishlistProduct = { ...product };
    delete wishlistProduct._id;

    fetch(`${process.env.REACT_APP_url}/wishlists`, {
      method: 'PUT',
      headers: { 'content-type': 'application/json' },
      body: JSON.stringify({
        ...wishlistProduct,
        buyerEmail: user.email,
        buyerName: user.displayName,
        productId: _id,
      }),
    })
      .then((res) => res.json())
      .then((data) => {
        const { upsertedId, matchedCount } = data;
        if (!upsertedId && matchedCount) {
          toast.error(`You've already wishlisted ${title}`);
        } else {
          toast.success(`${title} has been added to your wishlist`);
        }
      })
      .catch((err) => {
        console.log(err);
        toast.error('Something went worng!');
      });
  };

  const { user } = useContext(AuthContext);

  return (
    <div className="product border rounded-md">
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
        <button className="btn w-full" onClick={() => setOpened(true)}>
          Book Now
        </button>
        <button className="secondary-btn w-full" onClick={handleWishlist}>
          Wishlist
        </button>
      </div>
      <Modal
        opened={opened}
        onClose={() => setOpened(false)}
        transitionDuration={500}
        centered
      >
        <h1 className="text-xl font-semibold mb-1 -mt-11">{product.title}</h1>
        <img
          src={product.image}
          alt=""
          className="mb-2 w-full h-[300px] object-cover rounded"
        />
        <form className="space-y-2" onSubmit={handleSubmit(hanldeBooking)}>
          <Input
            placeholder={user.displayName}
            icon={<AiOutlineUser />}
            disabled
          />
          <Input placeholder={user.email} icon={<AiOutlineMail />} disabled />
          <Input
            placeholder={`${product.title}`}
            icon={<GiSmartphone />}
            disabled
          />
          <Input
            placeholder={`${product.resalePrice}Tk`}
            icon={<IoPricetagOutline />}
            disabled
          />{' '}
          <Input
            placeholder={`Phone Number (BD)`}
            icon={<FiPhoneCall />}
            {...register('number', {
              required: 'Phone Number is required*',
              pattern: {
                value: /(^([+]{1}[8]{2}|0088)?(01){1}[1-9]{1}\d{8})$/,
                message: 'Invalid Number!',
              },
            })}
          />
          {errors.number && (
            <small className="text-red-500 -mt-1">
              {errors.number.message}
            </small>
          )}
          <Input
            placeholder={`Meeting Location`}
            icon={<IoLocationOutline />}
            {...register('location', {
              required: 'Meeting location is required*',
            })}
          />
          {errors.location && (
            <small className="text-red-500 -mt-1">
              {errors.location.message}
            </small>
          )}
          <button type="submit" className="btn w-full">
            Submit
          </button>
        </form>
      </Modal>
    </div>
  );
}
