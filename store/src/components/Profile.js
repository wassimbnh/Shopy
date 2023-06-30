import React from 'react';
import { Card, Image } from 'react-bootstrap';

const ProfileComponent = () => {
  const user = {
    name: 'John Doe',
    bio: 'Frontend Developer',
    location: 'New York, USA',
    image: 'https://mdbcdn.b-cdn.net/img/new/avatars/1.webp'
  };

  return (
    <div className="profile-container">
      <Card className="profile-card">
        <div className="profile-image">
          <Image src={user.image} roundedCircle />
        </div>
        <Card.Body>
          <Card.Title>{user.name}</Card.Title>
          <Card.Text>{user.bio}</Card.Text>
          <Card.Text>{user.location}</Card.Text>
        </Card.Body>
      </Card>
    </div>
  );
};

export default ProfileComponent;
