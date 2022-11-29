import { Tooltip } from '@mantine/core';
import { useContext } from 'react';
import { GoVerified } from 'react-icons/go';
import { AuthContext } from '../contexts/UserContext';

export default function SellerBuyer({ sellerOrBuyer, componentType }) {
  const { image, name, email, isVerified, isSeller } = sellerOrBuyer;
  const { user } = useContext(AuthContext);

  const handleDelete = () => {
    // fetch(`${process.env.REACT_APP_url}/users?email=${email}`, {
    //   method: 'PUT',
    // });
  };
  const handleVerify = () => {};
  const handleUnVerify = () => {
    fetch(`${process.env.REACT_APP_url}/unverify?email=${user.email}`, {
      method: 'PUT',
    })
      .then((res) => res.json())
      .then((data) => {
        console.log(data);
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
      </div>
      <div className="flex gap-2 mt-1">
        <button className="btn w-full" onClick={handleDelete}>
          Delete
        </button>
        {componentType === 'seller' && (
          <div className="w-full">
            {isVerified ? (
              <button className="secondary-btn w-full" onClick={handleUnVerify}>
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
