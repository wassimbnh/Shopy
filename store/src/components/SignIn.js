import React from 'react';
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


function SignIn() {
  return (
    <MDBContainer fluid>

      <MDBCard className='text-black m-5A mx-auto mt' style={{borderRadius: '25px', padding: '30px', maxWidth: '800px', marginTop: '80px'}}>
        <MDBCardBody>
          <MDBRow>
            <MDBCol md='10' lg='6' className='order-2 order-lg-1 d-flex flex-column align-items-center'>

              <h2 classNAme="text-center h1 fw-bold mb-5 mx-1 mx-md-4 mt-4 pb-3">Sign in</h2>

              

              <div className="d-flex flex-row align-items-center mb-4">
                <MDBIcon fas icon="envelope me-3" size='lg'/>
                <MDBInput label='Your Email' id='form2' type='email'/>
              </div>

              <div className="d-flex flex-row align-items-center mb-4">
                <MDBIcon fas icon="lock me-3" size='lg'/>
                <MDBInput label='Password' id='form3' type='password'/>
              </div>

              

              
              <div className='d-flex align-items-center '>
              <CDBBtn color='primary' circle size='lg' className='px-4 py-2'>Sign in</CDBBtn>
              <a href="signup" className='px-2'>Don't have an account?</a>

              </div>
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

export default SignIn;
