import Advertise from '../components/Advertise';
import Banner from '../components/Banner';
import Cateogories from '../components/Cateogories';
import FromTheBlog from '../components/FromTheBlog';
import RegisterNow from '../components/RegisterNow';

export default function Home() {
  return (
    <>
      <Banner />
      <Cateogories />
      <Advertise />
      <FromTheBlog />
      <RegisterNow />
    </>
  );
}
