import React from 'react';
import {

  MDBContainer,
  MDBRow,
  MDBCol,
  MDBCard,
  MDBCardBody,
  MDBCardImage,
  MDBInput,
  MDBIcon,
  MDBCheckbox
}
from 'mdb-react-ui-kit';
import { CDBBtn } from "cdbreact";
import { useForm } from 'react-hook-form'


function SignUp() {

  const form =useForm();
  const { register, formState, watch } = form;
  const { errors } = formState;

  const password = watch('password');

  return (
    <MDBContainer fluid>

      <MDBCard className='text-black m-5A mx-auto' style={{borderRadius: '25px', padding: '30px', maxWidth: '800px', marginTop: '80px'}}>
        <MDBCardBody>
          <MDBRow>
            <MDBCol md='10' lg='6' className='order-2 order-lg-1 d-flex flex-column align-items-center'>

              <h2 classNAme="text-center h1 fw-bold mb-5 mx-1 mx-md-4 mt-4 pb-3">Sign up</h2>
              <form action="">
              <div className="d-flex flex-row align-items-center mb-4 ">
                <MDBIcon fas icon="user me-3" size='lg'/>
                <MDBInput 
                    label='Your Name'
                    id='name'
                    type='text'
                    className='w-100'
                    {...register("name",{
                    require: "Name is required"
                    })}/>
                    <p className='error-message'>{errors.name?.message}</p>
              </div>

              <div className="d-flex flex-row align-items-center mb-4">
                <MDBIcon fas icon="envelope me-3" size='lg'/>
                <MDBInput label='Your Email'
                          id='email'
                          type='email'
                           className='w-100'
                          {...register("email",{
                          require: "Email is required",
                          pattern: {
                            value:  /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/,
                            message: 'Invalid email format',
                          },
                        })}/>
                        <p className='error-message'>{errors.email?.message}</p>
              </div>

              <div className="d-flex flex-row align-items-center mb-4">
                <MDBIcon fas icon="lock me-3" size='lg'/>
                <MDBInput label='Password'
                          id='password'
                           type='password'
                           {...register("password",{
                            require: "Password is required",
                            minLength:{
                              value:8,
                              message: "Password should have at least 8 characters"
                            }
                          })}/>
                          <p className='error-message'>{errors.password?.message}</p>
              </div>

              <div className="d-flex flex-row align-items-center mb-4">
                <MDBIcon fas icon="key me-3" size='lg'/>
                <MDBInput
                        label='Confirm your password'
                        id='confirmPassword'
                        type='password'
                        {...register('confirmPassword', {
                          required: 'Confirm password is required',
                          validate: (value) => value === password || 'Passwords do not match',
                        })}
                        />
                  {errors.confirmPassword &&
                   <p className='error-message'>{errors.confirmPassword.message}</p>}
              </div>

              <div className='mb-4'>
                <MDBCheckbox name='flexCheck' value='' id='flexCheckDefault' label='Subscribe to our newsletter' />
              </div>

              <CDBBtn color='primary' circle size='lg' className='px-4 py-2'>Register</CDBBtn>

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

export default SignUp;
