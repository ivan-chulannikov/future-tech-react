import { Outlet } from "react-router-dom"
import { Header, Footer } from '@/widgets/layout';
const RootLayout = () => {
     return (
    <>
      <Header />

      <main className="main">
        <Outlet />
      </main>

      <Footer />
    </>
  );
};

export default RootLayout
