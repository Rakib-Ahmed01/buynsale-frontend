import Advertise from '../components/Advertise';
import Banner from '../components/Banner';
import Cateogories from '../components/Cateogories';
import RegisterNow from '../components/RegisterNow';

export default function Home() {
  return (
    <>
      <Banner />
      <Cateogories />
      <Advertise />
      <RegisterNow />
    </>
  );
}
