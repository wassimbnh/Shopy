import { Container } from 'react-bootstrap';
import './App.css';
import NavbarComp from './components/NavbarComp';
import { Routes, Route } from 'react-router';
import Cancel from './pages/Cancel';
import Success from './pages/Success';
import Store from './pages/Store';
import CartProvider from './CartContext';
import CarouselComponent from './components/Carousel';
import Footer from './components/Footer';
import ProductDetail from './components/ProductDetail';
import ScrollToTop from './components/ScrollToTop';
import Auth from './pages/Auth';
import SignUp from './components/SignUp';
import ForgotPassword from './components/ForgotPassword';
import ActivationUser from './components/ActivationUser';
import ProfileComponent from './components/Profile';
import 'bootstrap/dist/css/bootstrap.min.css';


function App() {
  return (
    <CartProvider>
    <Container >
      <NavbarComp />
      <ScrollToTop />
    <Routes>
      
      <Route path='/' element={ <>   <CarouselComponent /> <Store /> </>} />
      <Route path="success" element={<Success />}/>
      <Route path="cancel" element={<Cancel />}/>
      <Route path='item/:ident' element={<ProductDetail />} />
      <Route path="signin" element={<Auth />}/>
      <Route path="signup" element={<SignUp />}/>
      <Route path="forgot-password" element={<ForgotPassword />}/>
      <Route path= {`activate/:activation_token`} element={<ActivationUser />}/>
      <Route path= "/profile" element={<ProfileComponent />}/>
    </Routes>
    </Container>
    <Footer />
    </CartProvider>
  );
}

export default App;
