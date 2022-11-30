import { Input, Modal, Tooltip } from '@mantine/core';
import { useQueryClient } from '@tanstack/react-query';
import { formatDistanceToNowStrict } from 'date-fns';
import { useContext, useState } from 'react';
import { useForm } from 'react-hook-form';
import toast from 'react-hot-toast';
import { AiOutlineMail, AiOutlineUser } from 'react-icons/ai';
import { FiPhoneCall } from 'react-icons/fi';
import { GiSmartphone } from 'react-icons/gi';
import { GoVerified } from 'react-icons/go';
import { IoLocationOutline, IoPricetagOutline } from 'react-icons/io5';
import { MdReport } from 'react-icons/md';
import { PhotoView } from 'react-photo-view';
import { useNavigate } from 'react-router-dom';
import { AuthContext } from '../contexts/UserContext';

export default function Product({ product, componentType }) {
  const queryClient = useQueryClient();
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
    productId,
    isAdvertised,
    sellerEmail,
  } = product;

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm();

  const { user } = useContext(AuthContext);
  const navigate = useNavigate();

  let id;

  if (
    componentType === 'orders' ||
    componentType === 'wishlists' ||
    componentType === 'report'
  ) {
    id = productId;
  } else {
    id = _id;
  }

  const hanldeBooking = (data) => {
    if (!user) {
      toast.error('Login First');
      return navigate('/login');
    }
    const { number, location } = data;
    const order = { ...product };
    delete order._id;

    if (user?.email === sellerEmail) {
      toast.error('You can not buy your product');
    } else {
      fetch(`${process.env.REACT_APP_url}/orders`, {
        method: 'PUT',
        headers: { 'content-type': 'application/json' },
        body: JSON.stringify({
          ...order,
          buyerEmail: user?.email,
          buyerName: user?.displayName,
          buyerPhone: number,
          meetingLocation: location,
          productId: id,
        }),
      })
        .then((res) => res.json())
        .then((data) => {
          console.log(data);
          const { upsertedId, matchedCount } = data;
          if (!upsertedId && matchedCount) {
            toast.error(`You've already booked ${title}`);
            queryClient.invalidateQueries({
              queryKey: ['myOrders'],
            });
            queryClient.invalidateQueries({
              queryKey: ['myWishlists'],
            });
          } else {
            toast.success(`${title} has been added to your account`);
            queryClient.invalidateQueries({
              queryKey: ['myWishlists'],
            });
          }
        })
        .catch((err) => {
          console.log(err);
          toast.error('Something went worng!');
        });
    }

    reset();
    setOpened(false);
  };

  const handleWishlist = () => {
    if (!user) {
      if (!user) {
        toast.error('Login First');
        navigate('/login');
      }
    }
    const wishlistProduct = { ...product };
    delete wishlistProduct._id;

    fetch(`${process.env.REACT_APP_url}/wishlists`, {
      method: 'PUT',
      headers: { 'content-type': 'application/json' },
      body: JSON.stringify({
        ...wishlistProduct,
        buyerEmail: user.email,
        buyerName: user.displayName,
        productId: id,
      }),
    })
      .then((res) => res.json())
      .then((data) => {
        const { upsertedId, matchedCount } = data;
        if (!upsertedId && matchedCount) {
          toast.error(`You've already wishlisted ${title}`);
          queryClient.invalidateQueries({ queryKey: ['myWishlists'] });
        } else {
          toast.success(`${title} has been added to your wishlist`);
        }
      })
      .catch((err) => {
        console.log(err);
        toast.error('Something went worng!');
      });
  };

  const handleAdvertise = () => {
    if (isAdvertised) {
      toast.error('This Product is already in advertised section');
    } else
      fetch(`${process.env.REACT_APP_url}/products`, {
        method: 'PATCH',
        headers: { 'content-type': 'application/json' },
        body: JSON.stringify({
          productId: _id,
        }),
      })
        .then((res) => res.json())
        .then((data) => {
          if (data.acknowledged) {
            toast.success('Product is added to advertised section');
            queryClient.invalidateQueries({
              queryKey: ['myproducts'],
            });
          }
        })
        .catch((err) => {
          console.log(err);
          toast.error('Something went worng!');
        });
  };

  const handleDelete = () => {
    console.log(id);
    fetch(`${process.env.REACT_APP_url}/products/${id}`, {
      method: 'PUT',
    })
      .then((res) => res.json())
      .then((data) => {
        console.log(data);
        if (data.acknowledged) {
          toast.success('Product deleted successfully');
        }
      })
      .catch((err) => {
        console.log(err);
        toast.error('Something went wrong!');
      });
  };

  const handleReport = () => {
    const reportProduct = { ...product };
    delete reportProduct._id;

    fetch(`${process.env.REACT_APP_url}/reported-products`, {
      method: 'PUT',
      headers: { 'content-type': 'application/json' },
      body: JSON.stringify({
        ...reportProduct,
        productId: id,
      }),
    })
      .then((res) => res.json())
      .then((data) => {
        console.log(data);
        const { acknowledged } = data;
        if (acknowledged) {
          toast.success(`Reported successfully`);
          queryClient.invalidateQueries({ queryKey: ['reportedProducts'] });
        }
      })
      .catch((err) => {
        console.log(err);
        toast.error('Something went worng!');
      });
  };

  return (
    <div className="product border rounded-md mx-auto">
      <div>
        <PhotoView src={image}>
          <img src={image} alt="" />
        </PhotoView>
      </div>
      <div className="p-2">
        <div className="flex justify-between items-center gap-8">
          <h2 className="text-xl font-semibold tracking-wide">{title}</h2>
          <div className="w-7 h-7 rounded-full bg-gray-800 flex justify-center items-center">
            <Tooltip label="Report to Admin">
              <button onClick={handleReport}>
                <MdReport color="white" className="w-4 h-4" />
              </button>
            </Tooltip>
          </div>
        </div>
        <h2 className="text-md tracking-wide flex gap-1 -mt-[2px]">
          <span className="font-semibold text-gray-800">For sale by</span>
          <span className="underline font-semibold text-blue-500 flex items-center gap-1">
            {!sellerVerified && sellerName}
            {sellerVerified && (
              <Tooltip label="Veified Seller">
                <div className="flex justify-center items-center gap-[2px]">
                  <span>{sellerName}</span>
                  <button>
                    <GoVerified className="w-4 h-4" />
                  </button>
                </div>
              </Tooltip>
            )}
          </span>
        </h2>
        <p className="mb-2">
          <span className="text-base font-semibold">
            Posted{' '}
            {formatDistanceToNowStrict(new Date(time), { addSuffix: true })}
          </span>
        </p>
        <div className="space-y-1 text-[16.5px]">
          <p>{description.substr(0, 110)}...</p>
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
      {(componentType === 'main' || componentType === 'wishlists') && (
        <div>
          <div className="flex gap-2 px-2 pb-2">
            <button className="btn w-full" onClick={() => setOpened(true)}>
              Book Now
            </button>
            {componentType === 'main' && (
              <button className="secondary-btn w-full" onClick={handleWishlist}>
                Wishlist
              </button>
            )}
          </div>
          <Modal
            opened={opened}
            onClose={() => setOpened(false)}
            transitionDuration={500}
            centered
          >
            <h1 className="text-xl font-semibold mb-1 -mt-11">
              {product.title}
            </h1>
            <img
              src={product.image}
              alt=""
              className="mb-2 w-full h-[300px] object-cover rounded"
            />
            <form className="space-y-2" onSubmit={handleSubmit(hanldeBooking)}>
              <Input
                placeholder={user?.displayName}
                icon={<AiOutlineUser />}
                disabled
              />
              <Input
                placeholder={user?.email}
                icon={<AiOutlineMail />}
                disabled
              />
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
              <button
                type="submit"
                className="btn w-full"
                onClick={handleSubmit}
              >
                Submit
              </button>
            </form>
          </Modal>
        </div>
      )}
      {componentType === 'orders' && (
        <div>
          <div className="flex gap-2 px-2 pb-2">
            <button className="btn w-full" onClick={() => setOpened(true)}>
              Pay
            </button>
          </div>
        </div>
      )}
      {(componentType === 'my-products' || componentType === 'report') && (
        <div className="flex gap-2 px-2 pb-2">
          {componentType === 'my-products' && (
            <button className="btn w-full" onClick={handleAdvertise}>
              Advertise
            </button>
          )}
          <button className="secondary-btn w-full" onClick={handleDelete}>
            Delete
          </button>
        </div>
      )}
    </div>
  );
}
