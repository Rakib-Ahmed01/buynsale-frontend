import { useContext } from 'react';
import toast from 'react-hot-toast';
import { useNavigate } from 'react-router-dom';
import { AuthContext } from '../contexts/UserContext';

const RegisterNow = () => {
  const { user } = useContext(AuthContext);
  const navigate = useNavigate();
  const handleRegister = () => {
    if (user) {
      toast.success('You are already logged in');
      navigate('/all-products');
    } else {
      navigate('/register');
    }
  };
  return (
    <div>
      <section className="bg-white dark:bg-gray-900">
        <div className="container flex flex-col items-center px-4 py-12 mx-auto text-center">
          <h2 className="text-3xl font-semibold tracking-tight text-gray-700 sm:text-4xl dark:text-white">
            Join us and get the update <br /> from anywhere
          </h2>

          <div className="mt-6 sm:-mx-2">
            <div className="inline-flex w-full sm:w-auto sm:mx-2">
              <button onClick={handleRegister} className="btn">
                Register Now
              </button>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default RegisterNow;
