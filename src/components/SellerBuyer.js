import { Tooltip } from '@mantine/core';
import { useQueryClient } from '@tanstack/react-query';
import toast from 'react-hot-toast';
import { GoVerified } from 'react-icons/go';

export default function SellerBuyer({ sellerOrBuyer, componentType }) {
  const { image, name, email, isVerified, isSeller, isAdmin } = sellerOrBuyer;

  const queryClient = useQueryClient();

  const handleDelete = () => {
    fetch(`${process.env.REACT_APP_url}/delete?email=${email}`, {
      method: 'PUT',
    })
      .then((res) => res.json())
      .then((data) => {
        if (data.acknowledged) {
          toast.success('Deleted the user successfully');
          queryClient.invalidateQueries({
            queryKey: ['sellers'],
          });
          queryClient.invalidateQueries({
            queryKey: ['users'],
          });
        }
      })
      .catch((err) => {
        console.log(err);
      });
  };
  const handleVerify = () => {
    fetch(`${process.env.REACT_APP_url}/verify?email=${email}`, {
      method: 'PUT',
    })
      .then((res) => res.json())
      .then((data) => {
        if (data.acknowledged) {
          toast.success('Verified the user successfully');
          queryClient.invalidateQueries({
            queryKey: ['sellers'],
          });
        }
      })
      .catch((err) => {
        console.log(err);
      });
  };
  const handleUnVerify = () => {
    fetch(`${process.env.REACT_APP_url}/unverify?email=${email}`, {
      method: 'PUT',
    })
      .then((res) => res.json())
      .then((data) => {
        if (data.acknowledged) {
          toast.success('Unverified the user successfully');
          queryClient.invalidateQueries({
            queryKey: ['sellers'],
          });
        }
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const handleAdmin = () => {
    fetch(`${process.env.REACT_APP_url}/admin?email=${email}`, {
      method: 'PUT',
    })
      .then((res) => res.json())
      .then((data) => {
        console.log(data);
        if (data.acknowledged && data.modifiedCount) {
          toast.success('This user is now an admin');
          queryClient.invalidateQueries({
            queryKey: ['sellers'],
          });
          queryClient.invalidateQueries({
            queryKey: ['users'],
          });
        } else {
          toast.error('This user is already an admin');
        }
      })
      .catch((err) => {
        console.log(err);
      });
  };

  return (
    <div className="border rounded-md p-2">
      <div>
        <img
          src={image}
          alt={name}
          className="w-24 object-cover h-24 rounded-full block mx-auto"
        />
      </div>
      <div className="text-[16.5px] mt-2">
        {isVerified && isSeller ? (
          <Tooltip label="Veified Seller">
            <div className="flex items-center gap-[2px]">
              <p>
                Name: <span className="font-semibold">{name}</span>
              </p>
              <button>
                <GoVerified color="#3b82f6" className="w-4 h-4" />
              </button>
            </div>
          </Tooltip>
        ) : (
          <p>
            Name: <span className="font-semibold">{name}</span>
          </p>
        )}
        <p>
          Email: <span className=" font-semibold">{email}</span>
        </p>
        <p>
          Admin:{' '}
          <span className=" font-semibold">
            {isAdmin.toString().charAt(0)?.toUpperCase() +
              isAdmin.toString().slice(1)}
          </span>
        </p>
        <p>
          Seller:{' '}
          <span className=" font-semibold">
            {isSeller.toString().charAt(0)?.toUpperCase() +
              isSeller.toString().slice(1)}
          </span>
        </p>
      </div>
      <div className="flex gap-2 mt-1">
        <button className="btn w-full" onClick={handleDelete}>
          Delete
        </button>
        <button className="secondary-btn w-full" onClick={handleAdmin}>
          Admin
        </button>
        {componentType === 'seller' && (
          <div className="w-full">
            {isVerified ? (
              <button
                className="secondary-btn w-full px-4"
                onClick={handleUnVerify}
              >
                Unverify
              </button>
            ) : (
              <button className="secondary-btn w-full" onClick={handleVerify}>
                Verify
              </button>
            )}
          </div>
        )}
      </div>
    </div>
  );
}
