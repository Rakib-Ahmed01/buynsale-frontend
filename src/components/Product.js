import { Input, Modal } from '@mantine/core';
import { formatDistanceToNowStrict } from 'date-fns';
import { useContext, useState } from 'react';
import { useForm } from 'react-hook-form';
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
  } = product;

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm();

  const hanldeBooking = (data) => {
    console.log(data);
    reset();
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
        <button className="secondary-btn w-full">Wishlist</button>
      </div>
      <Modal
        opened={opened}
        onClose={() => setOpened(false)}
        title={`Book Now - ${product.title}`}
      >
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
          {errors.phoneNumber && (
            <small className="text-red-500 -mt-1">
              {errors.phoneNumber.message}
            </small>
          )}
          <Input
            placeholder={`Meeting Location`}
            icon={<IoLocationOutline />}
            {...register('location', {
              required: 'Meeting location is required*',
            })}
          />
          {errors.meetingLocation && (
            <small className="text-red-500 -mt-1">
              {errors.meetingLocation.message}
            </small>
          )}
          <button
            type="submit"
            className="btn w-full"
            onClick={() => setOpened(false)}
          >
            Submit
          </button>
        </form>
      </Modal>
    </div>
  );
}
