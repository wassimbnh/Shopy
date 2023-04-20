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
    </Routes>
    </Container>
    <Footer />
    </CartProvider>
  );
}

export default App;
