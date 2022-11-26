import { Link } from 'react-router-dom';
import errorImg from '../assets/images/404.svg';

const Error = () => {
  return (
    <div className="flex flex-col items-center">
      <img src={errorImg} alt="Error! Page Not Found!" />
      <Link to="/home" className="inline-block btn mt-6 mx-auto">
        Back To Homepage
      </Link>
    </div>
  );
};

export default Error;
