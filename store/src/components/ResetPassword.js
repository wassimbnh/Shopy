import React, { useState } from 'react';
import {
  MDBContainer,
  MDBRow,
  MDBCol,
  MDBCard,
  MDBCardBody,
  MDBCardImage,
  MDBInput,
  MDBIcon
}
from 'mdb-react-ui-kit';
import { CDBBtn } from "cdbreact";
import { useForm } from 'react-hook-form';
import { useParams } from 'react-router';
import { useDispatch } from 'react-redux';
import { resetPassword } from '../redux/resetPasswordSlice';
import { ToastContainer, toast } from 'react-toastify';

function ResetPassword() {

  const form = useForm();
const { register, formState, handleSubmit, watch } = form;
const { errors } = formState;
const password = watch('password');
const [passwords, setPassword] = useState('')
const [confirmPassword, setConfirmPassword] = useState('')

const {ac_token}  = useParams();
const dispatch = useDispatch();


const onSubmit = async (data) => {
  try {
    const response = await dispatch(resetPassword({ passwords, ac_token }));
    
    toast(response.payload.msg);
    console.log(response);
  } catch (error) {
    toast(error.msg);
  }
};


  return (
    <MDBContainer fluid>
      <ToastContainer />
      <MDBCard className='text-black m-5A mx-auto mt' style={{borderRadius: '25px', padding: '30px', maxWidth: '800px', marginTop: '80px'}}>
        <MDBCardBody>
          <MDBRow>
            <MDBCol md='10' lg='6' className='order-2 order-lg-1 d-flex flex-column align-items-center'>

              <h2 classNAme="text-center h1 fw-bold mb-5 mx-1 mx-md-4 mt-4 pb-3">Reset  password</h2>

              
              <form onSubmit={handleSubmit(onSubmit)}>

              <div className='d-flex flex-row align-items-center mb-4'>
                    <MDBIcon fas icon='lock me-3' size='lg' />
                    <MDBInput
                      label='Password'
                      id='password'
                      type='password'
                      {...register('password', {
                        required: 'Password is required',
                        minLength: {
                          value: 8,
                          message: 'Password should have at least 8 characters',
                        },
                      })}
                      onChange={(e) => setPassword(e.target.value)}
                    />
                    <p className='text-danger'>{errors.password?.message}</p>
                  </div>

                  <div className='d-flex flex-row align-items-center mb-4'>
                    <MDBIcon fas icon='key me-3' size='lg' />
                    <MDBInput
                      label='Confirm your password'
                      id='confirmPassword'
                      type='password'
                      {...register('confirmPassword', {
                        required: 'Confirm password is required',
                        validate: (value) => value === password || 'Passwords do not match',
                      })}
                      onChange={(e) => setConfirmPassword(e.target.value)}
                    />
                    {errors.confirmPassword && <p className='text-danger'>{errors.confirmPassword.message}</p>}
                  </div>
              
              <div className='d-flex align-items-center '>
              <CDBBtn color='primary' circle size='lg' className='px-4 py-2' type='submit'>Reset</CDBBtn>
            
              </div>
              </form>
            </MDBCol>

            <MDBCol md='10' lg='6' className='order-1 order-lg-2 d-flex align-items-center'>
              <MDBCardImage src='https://mdbcdn.b-cdn.net/img/Photos/new-templates/bootstrap-registration/draw1.webp' fluid/>
            </MDBCol>

          </MDBRow>
        </MDBCardBody>
      </MDBCard>

    </MDBContainer>
  );
}

export default ResetPassword;
