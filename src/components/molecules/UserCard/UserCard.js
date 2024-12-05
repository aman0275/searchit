import React from 'react';
import { Link } from 'react-router-dom';
import LazyImage from '../LazyImage/LazyImage';
import './UserCard.css';

export const UserCard = ({ user }) => {
  return (
    <Link to={`/user/${user.id}`} className="user-card">
      <div className="user-card-content">
        <div className="user-card-image">
          <LazyImage 
            src={user.imageUrl} 
            alt={`${user.firstName} ${user.lastName}`}
            placeholder="https://via.placeholder.com/50"
          />
        </div>
        <h3>{`${user.firstName} ${user.lastName}`}</h3>
        <p>SSN: {user.ssn}</p>
      </div>
    </Link>
  );
}; 