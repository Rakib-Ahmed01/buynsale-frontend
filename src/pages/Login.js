import { GoogleAuthProvider } from 'firebase/auth';
import { useContext, useState } from 'react';
import { useForm } from 'react-hook-form';
import { toast } from 'react-hot-toast';
import { HiOutlineEye, HiOutlineEyeOff } from 'react-icons/hi';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import user from '../assets/images/user.png';
import SmallLoader from '../components/SmallLoader';
import { AuthContext } from '../contexts/UserContext';

export default function Login() {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();
  const { signInWithMailAndPass, loading, setLoading, signInWithProvider } =
    useContext(AuthContext);
  const navigate = useNavigate();
  const [loadingForGoogle, setLoadingForGoogle] = useState(false);
  const [seePassword, setSeePassword] = useState(false);
  const location = useLocation();

  const from = location?.state?.path || '/home';

  const handleLogin = (data) => {
    setLoading(true);
    const { email, password } = data;

    signInWithMailAndPass(email, password)
      .then((result) => {
        setLoading(false);
        toast.success('Login Successful');
        navigate(from);
      })
      .catch((err) => {
        console.log(err);
        toast.error(err.message.replace('Firebase: ', ''));
      });
  };

  const handleGoogelLogin = () => {
    setLoadingForGoogle(true);
    const provider = new GoogleAuthProvider();
    signInWithProvider(provider)
      .then((res) => {
        const { displayName, email } = res.user;
        saveUserToDb(displayName, email)
          .then((res) => res.json())
          .then((data) => {
            setLoadingForGoogle(false);
            toast.success('Login Successfull');
            navigate(from);
          })
          .catch((err) => {
            console.log(err);
            setLoadingForGoogle(false);
          });
      })
      .catch((err) => {
        setLoadingForGoogle(false);
        toast.error(err.message.replace('Firebase: ', ''));
      });
  };

  const saveUserToDb = (name, email) => {
    return fetch(`${process.env.REACT_APP_url}/users?email=${email}`, {
      method: 'PUT',
      headers: { 'content-type': 'application/json' },
      body: JSON.stringify({
        name,
        email,
        isSeller: false,
      }),
    });
  };

  return (
    <section className="bg-white dark:bg-gray-900 mt-12">
      <div className="container flex items-center justify-center px-6 mx-auto">
        <form className="w-full max-w-md" onSubmit={handleSubmit(handleLogin)}>
          <img
            className="object-cover w-24 h-24 mx-auto rounded-full"
            src={user}
            alt="user avatar"
          />

          <div className="flex items-center justify-center mt-6">
            <Link
              to="/login"
              className="w-1/3 pb-4 font-medium text-center text-gray-800 capitalize border-b-2 border-blue-500 dark:border-blue-400 dark:text-white"
            >
              Login
            </Link>

            <Link
              to="/register"
              className="w-1/3 pb-4 font-medium text-center text-gray-500 capitalize border-b dark:border-gray-400 dark:text-gray-300"
            >
              Register
            </Link>
          </div>

          <div className="relative flex items-center mt-6">
            <span className="absolute">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="w-6 h-6 mx-3 text-gray-300 dark:text-gray-500"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                strokeWidth="2"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"
                />
              </svg>
            </span>

            <input
              type="email"
              className="block w-full py-3 text-gray-700 bg-white border rounded-md px-11 dark:bg-gray-900 dark:text-gray-300 dark:border-gray-600 focus:border-blue-400 dark:focus:border-blue-300 focus:ring-blue-300 focus:outline-none focus:ring focus:ring-opacity-40"
              placeholder="Email address"
              {...register('email', {
                required: '*Email is required',
              })}
            />
          </div>
          {errors.email && (
            <p className="text-red-500 mt-1">{errors.email?.message}</p>
          )}

          <div className="relative flex items-center mt-4">
            <span className="absolute">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="w-6 h-6 mx-3 text-gray-300 dark:text-gray-500"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                strokeWidth="2"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z"
                />
              </svg>
            </span>

            {!seePassword ? (
              <HiOutlineEye
                className="absolute right-3 top-[30%] w-5 h-5 text-gray-400"
                onClick={() => setSeePassword(!seePassword)}
              />
            ) : (
              <HiOutlineEyeOff
                className="absolute right-3 top-[30%] w-5 h-5 text-gray-400"
                onClick={() => setSeePassword(!seePassword)}
              />
            )}

            <input
              type={`${seePassword ? 'text' : 'password'}`}
              className="block w-full px-10 py-3 text-gray-700 bg-white border rounded-md dark:bg-gray-900 dark:text-gray-300 dark:border-gray-600 focus:border-blue-400 dark:focus:border-blue-300 focus:ring-blue-300 focus:outline-none focus:ring focus:ring-opacity-40"
              placeholder="Password"
              {...register('password', {
                required: '*Password is required',
                minLength: {
                  value: 6,
                  message: 'Wrong Password!',
                },
              })}
            />
          </div>
          {errors.password && (
            <p className="text-red-500 mt-1">{errors.password?.message}</p>
          )}

          <div className="mt-6">
            <button className="w-full btn">
              {loading ? <SmallLoader /> : 'Login'}
            </button>
          </div>
          <div>
            <div className="flex items-center justify-between mt-4">
              <span className="w-[30%] border-b dark:border-gray-600 lg:w-[30%]"></span>

              <span
                href="/"
                className="text-xs text-center text-gray-500 uppercase dark:text-gray-400 hover:underline"
              >
                or login with
              </span>

              <span className="w-[30%] border-b dark:border-gray-400 lg:w-[30%]"></span>
            </div>

            <div className="flex items-center mt-6 -mx-2">
              <button
                type="button"
                className="flex items-center justify-center w-full secondary-btn mx-2"
                onClick={handleGoogelLogin}
                disabled={loadingForGoogle}
              >
                <svg
                  className={`w-4 h-4 mx-2 fill-current ${
                    loadingForGoogle ? 'hidden' : ''
                  }`}
                  viewBox="0 0 24 24"
                >
                  <path d="M12.24 10.285V14.4h6.806c-.275 1.765-2.056 5.174-6.806 5.174-4.095 0-7.439-3.389-7.439-7.574s3.345-7.574 7.439-7.574c2.33 0 3.891.989 4.785 1.849l3.254-3.138C18.189 1.186 15.479 0 12.24 0c-6.635 0-12 5.365-12 12s5.365 12 12 12c6.926 0 11.52-4.869 11.52-11.726 0-.788-.085-1.39-.189-1.989H12.24z"></path>
                </svg>

                <span className="hidden mx-2 sm:inline">
                  {loadingForGoogle ? <SmallLoader /> : 'Sign in with Google'}
                </span>
              </button>
            </div>
          </div>
        </form>
      </div>
    </section>
  );
}
