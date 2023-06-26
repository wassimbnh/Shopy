import React, { useEffect } from 'react';
import { Link, useParams } from 'react-router-dom';
import { Button } from 'react-bootstrap';
import { useSelector, useDispatch } from 'react-redux';
import { activateUser } from '../redux/activateSlice';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const ActivationUser = () => {
  const dispatch = useDispatch();
  const { activation_token } = useParams();

  useEffect(() => {
    dispatch(activateUser(activation_token))
      .unwrap()
      .catch((error) => {
        toast(error.message)
      });
  }, [dispatch, activation_token]);

  return (
    <div>
      <ToastContainer />
      <div className="d-flex justify-content-center align-items-center vh-100">
        <div className="text-center">
          <i className="fas fa-check-circle fa-7x text-success mb-4"></i>
          <h1 className="mb-3">Thank you for your trust</h1>
          <p>your account has been activated successfully! You can now login.</p>
          <Link to="/signin">
            <Button variant="success" className="mt-3">
              Login
            </Button>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default ActivationUser;
