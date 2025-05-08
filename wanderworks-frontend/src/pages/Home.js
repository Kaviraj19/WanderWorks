import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchWorkspaces } from '../redux/actions/workspaceActions';
import WorkspaceCard from '../components/workspaceCard';
import { Link } from 'react-router-dom';
import Filter from '../components/Filter';  // Import Filter Component
import './Home.css';

const Home = () => {
  const dispatch = useDispatch();
  const workspaceList = useSelector((state) => state.workspace);
  const { workspaces, loading, error } = workspaceList;

  const [filteredWorkspaces, setFilteredWorkspaces] = useState(workspaces);
  const [filters, setFilters] = useState({
    location: '',
    type: '',
    rate_day_pass: '',
    rate_long_term: '',
  });

  useEffect(() => {
    dispatch(fetchWorkspaces());
  }, [dispatch]);

  useEffect(() => {
    if (error) console.error('🔥 Workspace Fetch Error:', error);
  }, [error]);

  useEffect(() => {
    setFilteredWorkspaces(
      workspaces.filter((workspace) => {
        const locationMatch =
          filters.location === '' ||
          workspace.location.toLowerCase().includes(filters.location.toLowerCase());
  
        const typeMatch =
          filters.type === '' ||
          workspace.type.join(', ').toLowerCase().includes(filters.type.toLowerCase());
  
        const rateDayMatch =
          filters.rate_day_pass === '' ||
          workspace.rate_day_pass <= Number(filters.rate_day_pass);
  
        const rateLongTermMatch =
          filters.rate_long_term === '' ||
          workspace.rate_long_term <= Number(filters.rate_long_term);
  
        return locationMatch && typeMatch && rateDayMatch && rateLongTermMatch;
      })
    );
  }, [filters, workspaces]);
  

  const handleFilterChange = (newFilters) => {
    setFilters(newFilters);
  };

  return (
    <div>
      <h2>Available Workspaces</h2>
      <Filter onFilterChange={handleFilterChange} />
      {loading ? (
        <div>Loading...</div>
      ) : error ? (
        <div>Error: {error}</div>
      ) : (
        <div className="workspace-grid">
          {filteredWorkspaces.map((workspace) => (
            <WorkspaceCard
              key={workspace.id}
              id={workspace.id}
              name={workspace.name}
              location={workspace.location}
              type={workspace.type}
              rate_day_pass={workspace.rate_day_pass}
              rate_long_term={workspace.rate_long_term}
              available={workspace.available}
              amenities={workspace.amenities}
            />
          ))}
        </div>
      )}
      <Link to="/add-workspace" className="fab">
        +
      </Link>
    </div>
  );
};

export default Home;
