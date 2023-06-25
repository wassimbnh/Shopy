import React from 'react';
import { useDispatch } from 'react-redux';
import { registerUser } from '../redux/signupSlice';
import { useForm } from 'react-hook-form';
import {
  MDBContainer,
  MDBRow,
  MDBCol,
  MDBCard,
  MDBCardBody,
  MDBCardImage,
  MDBInput,
  MDBIcon,
  MDBCheckbox,
} from 'mdb-react-ui-kit';
import { CDBBtn } from 'cdbreact';

function SignUp() {
  const form = useForm();
  const { register, formState, watch, handleSubmit, reset } = form;
  const { errors } = formState;
  const password = watch('password');
  const dispatch = useDispatch();

  const onSubmit = (data) => {
    try{
      dispatch(registerUser(data));
      handleReset();
    }catch(error){
      console.log(error.message)
    }
    
  };

  const handleReset = () =>{
    reset();
  }

  return (
    <MDBContainer fluid>
      <MDBCard
        className='text-black m-5A mx-auto'
        style={{
          borderRadius: '25px',
          padding: '30px',
          maxWidth: '800px',
          marginTop: '80px',
        }}
      >
        <MDBCardBody>
          <MDBRow>
            <MDBCol md='10' lg='6' className='order-2 order-lg-1 d-flex flex-column align-items-center'>
              <h2 className='text-center h1 fw-bold mb-5 mx-1 mx-md-4 mt-4 pb-3'>Sign up</h2>
              <form onSubmit={handleSubmit(onSubmit)}>
                <div className='d-flex flex-row align-items-center mb-4 '>
                  <MDBIcon fas icon='user me-3' size='lg' />
                  <MDBInput
                    label='Your Name'
                    id='name'
                    type='text'
                    className='w-100'
                    {...register('name', {
                      required: 'Name is required',
                    })}
                  />
                  <p className='text-danger'>{errors.name?.message}</p>
                </div>

                <div className='d-flex flex-row align-items-center mb-4'>
                  <MDBIcon fas icon='envelope me-3' size='lg' />
                  <MDBInput
                    label='Your Email'
                    id='email'
                    type='email'
                    className='w-100'
                    {...register('email', {
                      required: 'Email is required',
                      pattern: {
                        value: /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/,
                        message: 'Invalid email format',
                      },
                    })}
                  />
                  <p className='text-danger'>{errors.email?.message}</p>
                </div>

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
                  />
                  {errors.confirmPassword && <p className='text-danger'>{errors.confirmPassword.message}</p>}
                </div>

                <div className='mb-4'>
                  <MDBCheckbox name='flexCheck' value='' id='flexCheckDefault' label='Subscribe to our newsletter' />
                </div>

                <CDBBtn type='submit' color='primary' circle size='lg' className='px-4 py-2'>
                  Register
                </CDBBtn>
              </form>
            </MDBCol>

            <MDBCol md='10' lg='6' className='order-1 order-lg-2 d-flex align-items-center'>
              <MDBCardImage src='https://mdbcdn.b-cdn.net/img/Photos/new-templates/bootstrap-registration/draw1.webp' fluid />
            </MDBCol>
          </MDBRow>
        </MDBCardBody>
      </MDBCard>
    </MDBContainer>
  );
}

export default SignUp;
