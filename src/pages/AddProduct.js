import { Input, Textarea } from '@mantine/core';
import { useContext, useState } from 'react';
import { useForm } from 'react-hook-form';
import toast from 'react-hot-toast';
import { AiOutlineMail } from 'react-icons/ai';
import { BiTimeFive } from 'react-icons/bi';
import { FcMultipleSmartphones } from 'react-icons/fc';
import { FiPhoneCall } from 'react-icons/fi';
import { GiSmartphone } from 'react-icons/gi';
import {
  IoLocationOutline,
  IoPricetagOutline,
  IoPricetagsOutline,
} from 'react-icons/io5';
import { MdOutlineDescription } from 'react-icons/md';
import { useNavigate } from 'react-router-dom';
import SmallLoader from '../components/SmallLoader';
import { AuthContext } from '../contexts/UserContext';

export default function AddProduct() {
  const { user, userRole } = useContext(AuthContext);
  const [isLoading, setIsLoading] = useState(false);

  const navigate = useNavigate();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const handleAddProduct = (data) => {
    setIsLoading(true);
    const image = data.image[0];
    const sellerPhone = data.number;
    const yearsOfUse = data.yearsOfUse;
    const formData = new FormData();
    formData.append('image', image);
    delete data.image;
    delete data.number;
    delete data.yearsOfUse;

    console.log(userRole?.isVerified);

    fetch(
      `https://api.imgbb.com/1/upload?key=${process.env.REACT_APP_imgBbApiKey}`,
      {
        method: 'POST',
        body: formData,
      }
    )
      .then((res) => res.json())
      .then((imageData) => {
        setIsLoading(false);
        const imageUrl = imageData.data.url;
        const product = {
          ...data,
          image: imageUrl,
          time: new Date(),
          sellerName: user?.displayName,
          sellerEmail: user?.email,
          sellerVerified: userRole?.isVerified,
          sellerPhone,
          isSold: false,
          isPaid: false,
          isAdvertised: false,
          yearsOfUse: `${yearsOfUse} Years`,
        };
        fetch(`${process.env.REACT_APP_url}/products`, {
          method: 'POST',
          headers: { 'content-type': 'application/json' },
          body: JSON.stringify(product),
        })
          .then((res) => res.json())
          .then((data) => {
            console.log(data);
            if (data.acknowledged) {
              toast.success('Product has been added successfully');
              navigate('/all-products');
            }
          });
      })
      .catch((err) => {
        setIsLoading(false);
        console.log(err);
        toast.error('Something went wrong!');
      });
  };

  return (
    <div className="mx-auto w-[98%] md:max-w-xl mt-4">
      <form className="space-y-2" onSubmit={handleSubmit(handleAddProduct)}>
        <Input
          placeholder="Phone Name"
          icon={<GiSmartphone />}
          {...register('title', {
            required: 'Phone name is required*',
          })}
        />
        {errors.title && (
          <small className="text-red-500 mt-1">{errors.title?.message}</small>
        )}
        <Input
          placeholder="Phone Brand"
          icon={<FcMultipleSmartphones />}
          {...register('categoryName', {
            required: 'Phone brand is required*',
          })}
        />
        {errors.category && (
          <small className="text-red-500 mt-1">
            {errors.category?.message}
          </small>
        )}
        <div className="relative flex items-center mt-6 font-[300]">
          <input
            type="file"
            {...register('image', {
              required: 'Image is required*',
            })}
          />
        </div>
        {errors.image && (
          <small className="text-red-500 mt-1">{errors.image?.message}</small>
        )}
        <Input
          placeholder={`Original Price`}
          icon={<IoPricetagsOutline />}
          {...register('originalPrice', {
            required: 'Original price is required*',
          })}
        />
        {errors.originalPrice && (
          <small className="text-red-500 mt-1">
            {errors.originalPrice?.message}
          </small>
        )}
        <Input
          placeholder={`Resale Price`}
          icon={<IoPricetagOutline />}
          {...register('resalePrice', {
            required: 'Resale price is required*',
          })}
        />
        {errors.resalePrice && (
          <small className="text-red-500 mt-1">
            {errors.resalePrice?.message}
          </small>
        )}
        <Input
          placeholder={`Years of Use`}
          icon={<BiTimeFive />}
          {...register('yearsOfUse', {
            required: 'Years of use is required*',
          })}
          className="-mb-2"
        />
        {errors.yearsOfUse && (
          <small className="text-red-500 mt-1">
            {errors.yearsOfUse?.message}
          </small>
        )}
        <div className="-mt-4">
          <label htmlFor="condition" className="-mt-2">
            Phone Condtion
          </label>
          <select
            className="form-select block w-full border p-[6px] rounded focus:border focus:border-blue-500 focus:outline-none font-[300] text-[12px] bg-white"
            {...register('condition', {
              required: 'Phone condition is required*',
            })}
            id="condition"
          >
            <option value="Fair">Fair</option>
            <option value="Good">Good</option>
            <option value="Excellent">Excellent</option>
          </select>
        </div>
        {errors.condition && (
          <small className="text-red-500 -mt-1">
            {errors.condition.message}
          </small>
        )}
        <Textarea
          placeholder="Description"
          icon={<MdOutlineDescription className="-mt-[25px]" />}
          {...register('description', {
            required: 'Phone description is required*',
            minLength: {
              value: 100,
              message: 'Password must be at least 100 characters',
            },
          })}
        />
        {errors.description && (
          <small className="text-red-500 mt-1">
            {errors.description?.message}
          </small>
        )}
        <Input placeholder={user.email} icon={<AiOutlineMail />} disabled />
        <Input
          placeholder={`Your Number (BD)`}
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
          <small className="text-red-500 -mt-1">{errors.number.message}</small>
        )}
        <Input
          placeholder={`Location`}
          icon={<IoLocationOutline />}
          {...register('location', {
            required: 'Location is required*',
          })}
        />
        {errors.location && (
          <small className="text-red-500 -mt-1">
            {errors.location.message}
          </small>
        )}
        <button type="submit" className="btn w-full" disabled={isLoading}>
          {isLoading ? <SmallLoader /> : 'Add Product'}
        </button>
      </form>
    </div>
  );
}
