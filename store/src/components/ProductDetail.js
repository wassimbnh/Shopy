import { Card, Row, Col } from 'react-bootstrap';
import '../App.css';
import { CartContext } from '../CartContext';
import { useContext} from 'react';
import { productsArray } from "../productStore"
import { useParams } from 'react-router';
import { CDBBtn } from "cdbreact";
import NotExistsProduct from './NotExistsProduct';
import ReletedProducts from './ReletedProducts';

const ProductDetail = () => {
  const cart = useContext(CartContext);
  const { ident } = useParams();

  const prod = productsArray.find(product => product.ident === Number(ident));

  

  return (
    <div className="product-detail-container">
      { prod ? <Card className="mb-3">
        <Row>                                       
          <Col md={4}>
            <Card.Img
              className="product-img-detail"
              variant="top"
              src={require(`../assets/images/${prod.img}`)}
              alt={prod.title}
              rounded
            />
          </Col>
          <Col md={6}>
            <Card.Body>
              <Card.Text className="product-det">{prod.title}</Card.Text>
              <Card.Text className="product-det">
                Price : ${prod.price}
              </Card.Text>
              {cart.getProductQuantity(prod.id) > 0 ? (
                <>
                  <div className="d-flex">
                    <CDBBtn color='primary' circle
                      className="mx-2"
                      onClick={() => cart.addOneToCart(prod.id)}
                    >
                      +
                    </CDBBtn>
                    <span>{cart.getProductQuantity(prod.id)}</span>
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
              <Card.Text className='py-3'>{prod.description}</Card.Text>

            </Card.Body>
          </Col>
        </Row>
      </Card>: <NotExistsProduct />}
      <ReletedProducts />
    </div> 

  );
};

export default ProductDetail;
