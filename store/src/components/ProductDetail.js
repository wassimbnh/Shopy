import React from 'react';
import { Card, Button, Row, Col } from 'react-bootstrap';
import '../App.css';
import { CartContext } from '../CartContext';
import { useContext } from 'react';

const ProductDetail = (props) => {
  const product = props.product;
  const cart = useContext(CartContext);
  const productQuantity = cart.getProductQuantity(product.id);
  console.log(cart.items);

  return (
    <div className="product-detail">
      <Card className="mb-3">
        <Row>
          <Col md={6}>
            <Card.Img
              className="product-image"
              variant="top"
              src={require(`../assets/images/${product.img}`)}
              alt={product.title}
            />
          </Col>
          <Col md={6}>
            <Card.Body>
              <Card.Title>{product.title}</Card.Title>
              <Card.Text>${product.price}</Card.Text>
              <Card.Text>{product.description}</Card.Text>
              {productQuantity > 0 ? (
                <>
                  <Button
                    className="mx-2"
                    onClick={() => cart.addOneToCart(product.id)}
                  >
                    +
                  </Button>
                  <Button
                    className="mx-2"
                    onClick={() => cart.removeOneFromCart(product.id)}
                  >
                    -
                  </Button>
                  <Button
                    variant="danger"
                    className="mx-2"
                    onClick={() => cart.deleteFromCart(product.id)}
                  >
                    Remove from Cart
                  </Button>
                  <span>In Cart: {productQuantity}</span>
                </>
              ) : (
                <Button
                  variant="primary"
                  onClick={() => cart.addOneToCart(product.id)}
                >      
                  Add to Cart
                </Button>
              )}
            </Card.Body>
          </Col>
        </Row>
      </Card>
    </div>
  );
};

export default ProductDet