import { useEffect, useState } from 'react';

function useUserStatus(email) {
  const [userStatus, setUserStatus] = useState('buyer');
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch(`${process.env.REACT_APP_url}/user-status?email=${email}`)
      .then((res) => res.json())
      .then((data) => {
        setLoading(false);
        setUserStatus(data);
      });
  }, [email]);

  return { userStatus, loading };
}

export default useUserStatus;
