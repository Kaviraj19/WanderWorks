import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { getWorkspaceById } from '../services/workspaceService';
import { useNavigate } from 'react-router-dom';
import Reviews from '../components/Reviews';
import "./Home.css";

const WorkspaceDetails = () => {
  const { id } = useParams();
  const [workspace, setWorkspace] = useState(null);

  useEffect(() => {
    const fetchWorkspace = async () => {
      try {
        const data = await getWorkspaceById(id);
        setWorkspace(data);
      } catch (error) {
        console.error('Error fetching workspace details:', error);
      }
    };

    fetchWorkspace();
  }, [id]);
  const navigate = useNavigate();

  const handleBooking = () => {
    console.log('Booking button clicked for workspace:', workspace.name);
    navigate(`/booking/${workspace.id}`);
  };

  if (workspace === null) return <div>Loading...</div>;

  return (
    <div className="workspace-details">
      <div className="hero-section">
        <div className="workspace-content">
          <h1>{workspace.name}</h1>
          <div className="workspace-info">
            <p><strong>Location:</strong> {workspace.location}</p>
            <p><strong>Type:</strong> {workspace.type.join(', ')}</p>
            <p><strong>Price per Day:</strong> ₹{workspace.rate_day_pass}</p>
            <p><strong>Price (Long Term):</strong> ₹{workspace.rate_long_term}</p>
            <p><strong>Available:</strong> {workspace.available ? 'Yes' : 'No'}</p>
          </div>

          <div className="amenities">
            <strong>Amenities:</strong>
            {workspace.amenities.map((amenity, index) => (
              <span key={index} className="amenity-tag">{amenity}</span>
            ))}
          </div>

          <button onClick={handleBooking} className="btn btn-primary">
            Book this Workspace
          </button>
        </div>
      </div>

      {/* Reviews Display Only */}
      <Reviews workspaceId={id} />
    </div>
  );
};

export default WorkspaceDetails;
