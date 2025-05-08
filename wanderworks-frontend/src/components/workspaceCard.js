// src/components/WorkspaceCard.js
import React from 'react';
import { useNavigate } from 'react-router-dom';
import "./navbar.css"; // Add this CSS file or put styles inline

const WorkspaceCard = ({
  id,
  name,
  location,
  type,
  rate_day_pass,
  rate_long_term,
  available,
  amenities,
}) => {
  const navigate = useNavigate();

 
  const handleViewDetails = () => {
    navigate(`/workspace/${id}`);
  };

  return (
    <div className="workspace-card">
      <h3>{name}</h3>
      <p><strong>Location:</strong> {location}</p>
      <p><strong>Type:</strong> {type.join(', ')}</p>
      <p><strong>Day Pass:</strong> ₹{rate_day_pass}</p>
      <p><strong>Weekly Pass:</strong> ₹{rate_long_term}</p>
      <p><strong>Available:</strong> {available ? 'Yes' : 'No'}</p>
      <p><strong>Amenities:</strong> {amenities.join(', ')}</p>

      <div className="btn-group" style={{ display: 'flex', gap: '10px', marginTop: '10px' }}>
       
        <button onClick={handleViewDetails} className="details-btn">
          View Details
        </button>
      </div>
    </div>
  );
};

export default WorkspaceCard;
