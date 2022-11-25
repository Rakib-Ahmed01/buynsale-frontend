import { PuffLoader } from 'react-spinners';

export default function Loader() {
  return (
    <div className="w-full h-screen z-50 absolute flex justify-center items-center">
      <PuffLoader color="#5795fa" />
    </div>
  );
}
