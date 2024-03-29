import React, { useState } from 'react';
import { MDBContainer, MDBRow, MDBCol, MDBCard, MDBCardBody, MDBCardImage, MDBInput, MDBIcon } from 'mdb-react-ui-kit';
import { CDBBtn } from 'cdbreact';
import { useForm } from 'react-hook-form';
import { forgetPassword } from '../redux/forgetPasswordSlice';
import { useDispatch } from 'react-redux';
import { ToastContainer, toast } from 'react-toastify';

function ForgotPassword() {
  const form = useForm();
  const { register, formState, handleSubmit } = form;
  const { errors } = formState;
  const [email, setEmail] = useState('');
  const dispatch = useDispatch();

  const onSubmit = async (e) => {
    try {
      const response = await dispatch(forgetPassword( email ));
      toast(response.payload.msg);
    } catch (error) {
      toast(error.message);
    }
  };
  
  

  return (
    <MDBContainer fluid>
      <MDBCard
        className='text-black m-5A mx-auto mt'
        style={{ borderRadius: '25px', padding: '30px', maxWidth: '800px', marginTop: '80px' }}
      >
        <MDBCardBody>
          <MDBRow>
            <MDBCol md='10' lg='6' className='order-2 order-lg-1 d-flex flex-column align-items-center'>
              <h2 className='text-center h1 fw-bold mb-5 mx-1 mx-md-4 mt-4 pb-3'>Forgot password</h2>
              <form onSubmit={handleSubmit(onSubmit)}>
                <div className='d-flex flex-row align-items-center mb-4'>
                  <MDBIcon fas icon='envelope me-3' size='lg' />
                  <MDBInput
                    label='Your Email'
                    id='email'
                    type='text'
                    className='w-100'
                    {...register('email', {
                      required: 'Email is required',
                      pattern: {
                        value: /^[a-zA-Z0-9.!#$%&'+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:.[a-zA-Z0-9-]+)$/,
                        message: 'Invalid email format',
                      },
                    })}
                    onChange={(e) => setEmail(e.target.value)}
                  />
                  <p className='text-danger'>{errors.email?.message}</p>
                </div>
                <div className='d-flex align-items-center'>
                  <CDBBtn color='primary' circle size='lg' className='px-4 py-2' type='submit'>
                    Reset
                  </CDBBtn>
                </div>
              </form>
            </MDBCol>
            <MDBCol md='10' lg='6' className='order-1 order-lg-2 d-flex align-items-center'>
              <MDBCardImage src='https://mdbcdn.b-cdn.net/img/Photos/new-templates/bootstrap-registration/draw1.webp' fluid />
            </MDBCol>
          </MDBRow>
        </MDBCardBody>
      </MDBCard>
      <ToastContainer />
    </MDBContainer>
  );
}

export default ForgotPassword;
