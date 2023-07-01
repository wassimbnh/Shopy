import React, { useContext, useState } from 'react'
import { Button, Navbar, Modal, Dropdown, } from 'react-bootstrap'
import { CartContext } from '../CartContext'
import CartProduct from './CartProduct'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faShoppingCart } from '@fortawesome/free-solid-svg-icons'
import { BiLogOut} from 'react-icons/bi'
import {CgProfile}from 'react-icons/cg'
import { CDBBtn } from "cdbreact";
import { useNavigate } from 'react-router'
import { useDispatch, useSelector } from 'react-redux'
import { logout } from '../redux/loginSlice'

const NavbarComp = () => {
  const cart = useContext(CartContext)
  const [show, setShow] = useState(false)
  //const isLoggedIn = useSelector((state) => state.login.token);
  const isLoggedIn = localStorage.getItem("rf_token")
  const navigate= useNavigate();
  const dispatch = useDispatch();


console.log(isLoggedIn)
  

  const handleClose = () => {
    setShow(false)
  }

  const handleShow = () => {
    setShow(true)
  }

  const handleLogout = () => {
    dispatch(logout());
    navigate('/');
  };

  const productCount = cart.items.reduce((sum, product) => sum + product.quantity, 0)

  const checkout = async () => {
    await fetch('http://localhost:4000/checkout', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ items: cart.items }),
    })
      .then((response) => {
        return response.json()
      })
      .then((response) => {
        if (response.url) {
          window.location.assign(response.url) // Forwarding user to Stripe
        }
      })
  }

  return (
    <>
      <Navbar expand="sm" fixed="top" className='bg-white'>
        <Navbar.Brand href="/" className='px-3'>
          EcoFit
          <img
            src={require("../assets/images/eco.png")}
            height="30"
            className="d-inline-block align-top ml-2"
            alt="Logo"
          />
        </Navbar.Brand>
        <Navbar.Toggle />
        <Navbar.Collapse className="justify-content-end">
        <div className="d-flex align-items-center px-3 ">
            {isLoggedIn ? (
              <Dropdown className='px-3'>
                <Dropdown.Toggle variant="link" id="dropdown-basic" className="p-0">
                  <img
                    class="rounded-circle"
                    height="30"
                    className="d-inline-block align-top mx-2 rounded-circle "
                    alt="avatar1"
                    src="https://mdbcdn.b-cdn.net/img/new/avatars/1.webp"
                  />
                </Dropdown.Toggle>

                <Dropdown.Menu >
                  <Dropdown.Item href="/profile"><CgProfile />Profile</Dropdown.Item>
                  <Dropdown.Item href="" >
                  <button onClick={handleLogout}
                  style={{
                    border: 'none',
                    background: 'none',
                    cursor: 'pointer',
                    padding: 0,
                    display: 'flex',
                    alignItems: 'center',
                  }}><BiLogOut className='mr-1'/>
                  Logout
                  </button>
                  </Dropdown.Item>
                </Dropdown.Menu>
              </Dropdown>
            ) : (
              <Button variant="outline-secondary"
                     className="rounded-pill mr-2 mx-2"
                     onClick={()=>navigate('/signin')}
               >
                Sign in
              </Button>
            )}

            <Button variant="outline-secondary" className="rounded-pill " onClick={handleShow}>
              <FontAwesomeIcon icon={faShoppingCart} className="mr-2" />
              {productCount} Items
            </Button>
          </div>
          
        </Navbar.Collapse>
      </Navbar>
      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title className="px-3">Shopping Cart</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          {productCount > 0 ? (
            <>
              <p>Items in your cart:</p>
              {cart.items.map((currentProduct) => (
                <CartProduct key={currentProduct.id} img={currentProduct.img} id={currentProduct.id} quantity={currentProduct.quantity} />
              ))}  
              <h1>Total: {cart.getTotalCost().toFixed(2)}$</h1>

              <CDBBtn color="success" circle onClick={checkout}>
                Purchase items
              </CDBBtn >
            </>
          ) : (
            <h1>Your Cart is empty</h1>
          )}
        </Modal.Body>
      </Modal>
    </>
  )
}

export default NavbarComp
