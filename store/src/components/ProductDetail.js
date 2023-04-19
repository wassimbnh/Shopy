import { Card, Button, Row, Col } from 'react-bootstrap';
import '../App.css';
import { CartContext } from '../CartContext';
import { useContext} from 'react';
import { productsArray } from "../productStore"
import { useParams } from 'react-router';
import { CDBBtn } from "cdbreact";

const ProductDetail = () => {
  const cart = useContext(CartContext);
  const { ident } = useParams();

  const prod = productsArray.find(product => product.ident === Number(ident));

  const productQuantity = cart.getProductQuantity(prod.id);

  return (
    <div className="product-detail">
      <Card className="mb-3">
        <Row>                                       
          <Col md={6}>
            <Card.Img
              className="product-image"
              variant="top"
              src={require(`../assets/images/${prod.img}`)}
              alt={prod.title}
              rounded
            />
          </Col>
          <Col md={6}>
            <Card.Body>
              <Card.Title>{prod.title}</Card.Title>
              <Card.Text className="product-price">
                ${prod.price}
              </Card.Text>
              <Card.Text>{prod.description}</Card.Text>
              {productQuantity > 0 ? (
                <>
                  <div className="d-flex">
                    <CDBBtn color='primary' circle
                      className="mx-2"
                      onClick={() => cart.addOneToCart(prod.id)}
                    >
                      +
                    </CDBBtn>
                    <span>{productQuantity}</span>
                    <CDBBtn color='primary' circle
                      className="mx-2"
                      onClick={() => cart.removeOneFromCart(prod.id)}
                    >
                      -
                    </CDBBtn>
                    
                  </div>
                  <CDBBtn 
                    color="danger" circle
                    variant="danger"
                    className="mx-2 mt-2"
                    onClick={() => cart.deleteFromCart(prod.id)}
                  >
                    Remove from Cart
                  </CDBBtn>
                </>
              ) : (
                <CDBBtn
                  color="light" circle
                  onClick={() => cart.addOneToCart(prod.id)}
                >      
                  Add to Cart
                </CDBBtn>
              )}
            </Card.Body>
          </Col>
        </Row>
      </Card>
    </div>
  );
};

export default ProductDetail;
