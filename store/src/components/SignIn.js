import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { MDBContainer, MDBRow, MDBCol, MDBCard, MDBCardBody, MDBCardImage, MDBInput, MDBIcon } from 'mdb-react-ui-kit';
import { CDBBtn } from 'cdbreact';
import { login } from '../redux/loginSlice';
import { ToastContainer, toast } from 'react-toastify';
import { useForm } from 'react-hook-form';
import { useNavigate } from 'react-router';
import "../App.css";
import { googleLogin } from '../redux/googleLoginSlice';
import GoogleLogin from "react-google-login";
import { loadGapiInsideDOM } from "gapi-script";


function SignIn() {
  const form = useForm();
  const { register, formState, handleSubmit } = form;
  const { errors } = formState;

  const dispatch = useDispatch();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const isLoading = useSelector((state) => state.auth.login);
  const navigate = useNavigate();
  const rfToken = useSelector((state) => state.login.token);

  useEffect(() => {
    if (rfToken) {
      navigate('/');
    }
  }, [rfToken, navigate]);

  const onSubmit = async (e) => {
    try {
      const response = await dispatch(login({ email, password }));

      toast(response.payload.msg);
      console.log(response.payload)
    } catch (error) {
      toast(error.msg);
    }
  };

  const googleSuccess = async (res) => {
    try {
      const response = await dispatch(googleLogin(res));
      toast(response.payload.msg);
      navigate('/');
    } catch (error) {
      toast(error.msg);
    }
  };

  const googleFailure = (error) => {
    console.log(error);
    toast('Google Sign In failed. Please try again.');
  };

  useEffect(() => {
    (async () => {
      await loadGapiInsideDOM();
    })();
  }, []);

  

  return (
    <>
      <ToastContainer />
      <MDBContainer fluid>
        <MDBCard className='text-black m-5A mx-auto mt' style={{ borderRadius: '25px', padding: '30px', maxWidth: '800px', marginTop: '80px' }}>
          <MDBCardBody>
            <MDBRow>
              <MDBCol md='10' lg='6' className='order-2 order-lg-1 d-flex flex-column align-items-center'>
                <h2 className='text-center h1 fw-bold mb-5 mx-1 mx-md-4 mt-4 pb-3'>Sign in</h2>
                <form onSubmit={handleSubmit(onSubmit)}>
                  <div className='d-flex flex-row align-items-center mb-4'>
                    <MDBIcon fas icon='envelope me-3' size='lg' />
                    <MDBInput
                      label='Your Email'
                      id='email'
                      type='email'
                      className='w-100'
                      value={email}
                      {...register('email', {
                        required: 'Email is required',
                      })}
                      onChange={(e) => setEmail(e.target.value)}
                    />
                    <p className='text-danger'>{errors.email?.message}</p>
                  </div>
                  <div className='d-flex flex-row align-items-center mb-4'>
                    <MDBIcon fas icon='lock me-3' size='lg' />
                    <MDBInput
                      label='Password'
                      id='password'
                      type='password'
                      value={password}
                      {...register('password', {
                        required: 'Password is required',
                      })}
                      onChange={(e) => setPassword(e.target.value)}
                    />
                    <p className='text-danger'>{errors.password?.message}</p>
                  </div>
                  <CDBBtn color='primary' circle size='lg' className='px-4 py-2 mr-3' type='submit' disabled={isLoading}>
                    Sign in
                  </CDBBtn>
                </form>
                <div className="google-btn m-3">
                  <div class="google-icon-wrapper">
                    <img class="google-icon" src="https://upload.wikimedia.org/wikipedia/commons/5/53/Google_%22G%22_Logo.svg" alt="Google logo" />
                  </div>
                  <GoogleLogin
                    clientId={process.env.REACT_APP_G_CLIENT_ID}
                    clientSecret={process.env.REACT_APP_G_CLIENT_SECRET}
                    onSuccess={googleSuccess}
                    onFailure={googleFailure}
                    cookiePolicy={"single_host_origin"}
                    render={(renderProps) => (
                      <p class="btn-text" onClick={renderProps.onClick} type="submit" disabled={renderProps.disabled}>Sign in with Google</p>
                    )}
                  />
                </div>
                <div className='d-flex align-items'>
                  <a href='/forgot-password' className='px-4'>
                    Forgot Password?
                  </a>
                  <a href='signup' className='px-2'>
                    Don't have an account?
                  </a>
                </div>
              </MDBCol>
              <MDBCol md='10' lg='6' className='order-1 order-lg-2 d-flex align-items-center'>
                <MDBCardImage src='https://mdbcdn.b-cdn.net/img/Photos/new-templates/bootstrap-registration/draw1.webp' fluid />
              </MDBCol>
            </MDBRow>
          </MDBCardBody>
        </MDBCard>
      </MDBContainer>
    </>
  );
}

export default SignIn;
