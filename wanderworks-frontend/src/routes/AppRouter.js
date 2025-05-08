import React from 'react';
import { Routes, Route } from 'react-router-dom';
import Home from '../pages/Home';
import WorkspaceDetails from '../pages/WorkspaceDetails';
 import Login from '../pages/Login';
 import Register from '../pages/register';
import AddWorkspace from '../pages/addWorkspace';
import Booking from '../pages/Booking';
import Profile from '../pages/Profile';

const AppRouter = () => (
  <Routes>
    <Route path="/" element={<Home />} />
    <Route path="/add-Workspace" element={<AddWorkspace />} />
    <Route path="/workspace/:id" element={<WorkspaceDetails />} />
   <Route path="/login" element={<Login />} />
    <Route path="/register" element={<Register />} />
    <Route path="/booking/:id" element={<Booking />} />
    <Route path='/Profile' element={<Profile/>}/>
  </Routes>
);

export default AppRouter;
