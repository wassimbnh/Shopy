import React from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { Button } from 'react-bootstrap'

const ActivationUser = () => {


  return (
    <div>
      <div className="d-flex justify-content-center align-items-center vh-100">
      <div className="text-center">
        <i className="fas fa-check-circle fa-7x text-success mb-4"></i>
        <h1 className="mb-3">Thank you for your trust</h1>
        <p>our account has been activated succesfully !
        you can now login</p>
        <Link to="/signin">
        <Button variant="success"
                className="mt-3"
                >
          Login
        </Button>
        </Link>
      </div>
    </div>
    </div>
  )
}

export default ActivationUser
