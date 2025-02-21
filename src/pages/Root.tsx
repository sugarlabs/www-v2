import Header from '../sections/Header';
import Footer from '../sections/Footer';
import { Outlet } from 'react-router-dom';

function Root() {
  return (
    <div>
      <Header />
      <Outlet />
      <Footer />
    </div>
  );
}

export default Root;
