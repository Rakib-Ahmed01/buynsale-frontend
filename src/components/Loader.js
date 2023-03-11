import { HashLoader } from 'react-spinners';

export default function Loader() {
  return (
    <div className="w-full h-screen z-50 absolute flex justify-center items-center">
      <HashLoader color="#06b6d4" />
    </div>
  );
}
