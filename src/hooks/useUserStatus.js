import { useContext, useEffect, useState } from 'react';
import { AuthContext } from '../contexts/UserContext';

function useUserStatus(email) {
  const [userStatus, setUserStatus] = useState('buyer');
  const [loading, setLoading] = useState(true);
  const { setUserRole } = useContext(AuthContext);

  useEffect(() => {
    fetch(`${process.env.REACT_APP_url}/user-status?email=${email}`)
      .then((res) => res.json())
      .then((data) => {
        setLoading(false);
        setUserStatus(data);
        setUserRole(data);
      });
  }, [email]);

  return { userStatus, loading };
}

export default useUserStatus;
