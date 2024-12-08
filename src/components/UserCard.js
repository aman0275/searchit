import React from 'react';

function UserCard({ user, onClick }) {
  return (
    <div
      key={user.id}
      onClick={onClick}
      className="user-card"
    >
      <h2>{`${user.firstName} ${user.lastName}`}</h2>
      <p>@{user.username}</p>
      <p>{user.email}</p>
    </div>
  );
}

export default UserCard; 