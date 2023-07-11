import React, { useState } from 'react';
import { Card, Image, Form, Button } from 'react-bootstrap';

const ProfileComponent = () => {
  const [username, setUsername] = useState('John Doe');
  const [email, setEmail] = useState('johndoe@example.com');
  const [profilePicture, setProfilePicture] = useState('');

  const handleUsernameChange = (event) => {
    setUsername(event.target.value);
  };

  const handleEmailChange = (event) => {
    setEmail(event.target.value);
  };

  const handlePictureChange = (event) => {
    const file = event.target.files[0];
    const reader = new FileReader();

    reader.onloadend = () => {
      setProfilePicture(reader.result);
    };

    if (file) {
      reader.readAsDataURL(file);
    }
  };

  const handleFormSubmit = (event) => {
    event.preventDefault();
    // Perform the logic to update the username, email, and profile picture
    console.log('Username:', username);
    console.log('Email:', email);
    console.log('Profile Picture:', profilePicture);
  };

  return (
    <div className="profile-container">
      <Card className="profile-card">
        <div className="profile-image">
          <Image src={profilePicture || 'https://mdbcdn.b-cdn.net/img/new/avatars/1.webp'} roundedCircle />
        </div>
        <Card.Body>
          <Card.Title>{username}</Card.Title>
          <Card.Text>Email: {email}</Card.Text>
          <Form onSubmit={handleFormSubmit}>
            <Form.Group controlId="username">
              <Form.Label>Username</Form.Label>
              <Form.Control type="text" value={username} className='mb-2' onChange={handleUsernameChange} />
            </Form.Group>
            <Form.Group controlId="email">
              <Form.Label>Email</Form.Label>
              <Form.Control type="email" value={email} className='mb-2' onChange={handleEmailChange} />
            </Form.Group>
            <Form.Group controlId="picture">
              <Form.Label>Profile Picture</Form.Label>
              <Form.Control type="file" accept="image/*" className='mb-2' onChange={handlePictureChange} />
            </Form.Group>
            <Button variant="primary" type="submit">Modify</Button>
          </Form>
        </Card.Body>
      </Card>
    </div>
  );
};

export default ProfileComponent;
