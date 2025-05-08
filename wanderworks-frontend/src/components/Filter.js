import React, { useState } from 'react';
import './navbar.css'; // Assuming you have some CSS for styling

const Filter = ({ onFilterChange }) => {
  const [filters, setFilters] = useState({
    location: '',
    type: '',
    rate_day_pass: '',
    rate_long_term: '',
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFilters((prevFilters) => {
      const newFilters = { ...prevFilters, [name]: value };
      onFilterChange(newFilters); // Pass updated filters to parent
      return newFilters;
    });
  };

  return (
    <div className="filter-container">
      <label>
        Location:
        <input
          type="text"
          name="location"
          value={filters.location}
          onChange={handleChange}
          placeholder="Enter location"
        />
      </label>
      <label>
        Type:
        <input
          type="text"
          name="type"
          value={filters.type}
          onChange={handleChange}
          placeholder="Enter workspace type"
        />
      </label>
      <label>
        Rate (Day Pass):
        <input
          type="number"
          name="rate_day_pass"
          value={filters.rate_day_pass}
          onChange={handleChange}
          placeholder="Enter day pass rate"
        />
      </label>
      <label>
        Rate (Long Term):
        <input
          type="number"
          name="rate_long_term"
          value={filters.rate_long_term}
          onChange={handleChange}
          placeholder="Enter long term rate"
        />
      </label>
    </div>
  );
};

export default Filter;
