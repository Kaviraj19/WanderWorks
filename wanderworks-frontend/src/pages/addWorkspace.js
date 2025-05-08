import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { createWorkspaceAction } from '../redux/actions/workspaceActions';
import './addWorkspace.css';
import { useNavigate } from 'react-router-dom';
const AddWorkspace = () => {
  const dispatch = useDispatch();
  const { loading, error, success } = useSelector((state) => state.workspace);
   const navigate = useNavigate();
  const [form, setForm] = useState({
    name: '',
    location: '',
    type: [],
    rate_day_pass: '',
    rate_long_term: '',
    amenities: [],
    available: true,
  });

  const workspaceTypes = ["coworking", "private_office", "virtual_office", "meeting_room"];

  const handleChange = (e) => {
    const { name, value, checked } = e.target;

    if (name === "type") {
      const newTypes = checked
        ? [...form.type, value]
        : form.type.filter((t) => t !== value);
      setForm({ ...form, type: newTypes });
    } else if (name === "amenities") {
      setForm({ ...form, amenities: value.split(',').map(a => a.trim()) });
    } else if (name === "available") {
      setForm({ ...form, available: checked });
    } else {
      setForm({ ...form, [name]: value });
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(createWorkspaceAction(form));
    navigate('/'); 
  };

  return (
    <div className="workspace-form">
      <h2>Add Workspace</h2>
      <form onSubmit={handleSubmit}>
        <input type="text" name="name" placeholder="Workspace Name" value={form.name} onChange={handleChange} required />
        <input type="text" name="location" placeholder="Location" value={form.location} onChange={handleChange} required />

        <div className="type-checkboxes">
          <label>Type:</label>
          {workspaceTypes.map((type) => (
            <label key={type}>
              <input type="checkbox" name="type" value={type} onChange={handleChange} checked={form.type.includes(type)} />
              {type}
            </label>
          ))}
        </div>

        <input type="number" name="rate_day_pass" placeholder="Rate (Day Pass)" value={form.rate_day_pass} onChange={handleChange} />
        <input type="number" name="rate_long_term" placeholder="Rate (Long Term)" value={form.rate_long_term} onChange={handleChange} />

        <input type="text" name="amenities" placeholder="Amenities (comma-separated)" value={form.amenities.join(', ')} onChange={handleChange} />

        <label>
          <input type="checkbox" name="available" checked={form.available} onChange={handleChange} />
          Available
        </label>

        <button type="submit" disabled={loading}>
          {loading ? 'Adding...' : 'Add Workspace'}
        </button>
      </form>

      {error && <p className="error">{error}</p>}
      {success && <p className="success">Workspace added successfully!</p>}
    </div>
  );
};

export default AddWorkspace;
