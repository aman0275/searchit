import React from 'react';
import { useParams, Link } from 'react-router-dom';
import { mockUsers } from '../mockData';
import LazyImage from '../components/molecules/LazyImage/LazyImage';
import './UserDetailsPage.css';

const UserDetailsPage = () => {
  const { id } = useParams();
  const user = mockUsers.find(user => user.id === parseInt(id));

  if (!user) {
    return (
      <div className="user-details-error">
        <h2>User not found</h2>
        <Link to="/" className="back-button">Back to Search</Link>
      </div>
    );
  }

  return (
    <div className="user-details-page">
      <div className="user-details-container">
        <Link to="/" className="back-button">
          <i className="fas fa-arrow-left"></i> Back to Search
        </Link>
        
        <div className="user-details-card">
          <div className="user-profile-section">
            <div className="user-image-container">
              <LazyImage
                src={user.imageUrl}
                alt={`${user.firstName} ${user.lastName}`}
                placeholder="https://via.placeholder.com/200"
              />
            </div>
            <h1>{`${user.firstName} ${user.lastName}`}</h1>
          </div>
          
          <div className="user-info">
            <div className="info-grid">
              <div className="info-item">
                <label>SSN</label>
                <p>{user.ssn}</p>
              </div>
              
              <div className="info-item">
                <label>Email</label>
                <p>{user.email}</p>
              </div>
              
              <div className="info-item">
                <label>Phone</label>
                <p>{user.phone}</p>
              </div>
              
              <div className="info-item">
                <label>Address</label>
                <p>{user.address}</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default UserDetailsPage; 