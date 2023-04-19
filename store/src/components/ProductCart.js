import React from 'react';
import { Card, Button, Form, Row, Col } from 'react-bootstrap';
import '../App.css';
import { CartContext } from '../CartContext';
import { useContext } from 'react';
import { CDBBtn } from "cdbreact";
import { useNavigate } from 'react-router';

const ProductCart = (props) => {
  const product = props.product;
  const cart = useContext(CartContext);
  const productQuantity = cart.getProductQuantity(product.id);
  const navigate = useNavigate();
  console.log(cart.items);

  function handleItem(){
    navigate(`item/${product.ident}`);
  }

  React.useEffect(() => {
    function handlePopState() {
      window.scrollTo(0, 0);
    }
    window.addEventListener('popstate', handlePopState);
    return () => {
      window.removeEventListener('popstate', handlePopState);
    };
  }, []);

  return (
    <div className="product-card">
      <Card.Img
        className="product-image cursor-pointer"
        variant="top"
        src={require(`../assets/images/${product.img}`)}
        alt={product.title}
        onClick={handleItem}
      />
      <Card.Body>
        <Card.Title>{product.title}</Card.Title>
        <Card.Text>${product.price}</Card.Text>
        {productQuantity > 0 ? (
          <Form className="d-flex align-items-center">
            <Form.Label className="mr-2">In Cart: {productQuantity}</Form.Label>
            <CDBBtn color='primary' circle className="mx-2 mr-2" onClick={() => cart.addOneToCart(product.id)}>+</CDBBtn>
            <CDBBtn color='primary' circle className="mx-2 ml-2" onClick={() => cart.removeOneFromCart(product.id)}>-</CDBBtn>
            <CDBBtn color="danger" circle variant="danger" className="m-2" onClick={() => cart.deleteFromCart(product.id)}>Remove from Cart</CDBBtn>
          </Form>
        ) : (
          <CDBBtn color="light" circle variant="primary" onClick={() => cart.addOneToCart(product.id)}>Add to Cart</CDBBtn>
        )}
      </Card.Body>
    </div>
  );
};

export default ProductCart;
