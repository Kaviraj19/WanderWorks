import axios from 'axios';

const API_URL = process.env.REACT_APP_API_URL;

export const getAllWorkspaces = async () => {
  try {
    const response = await axios.get(`${API_URL}/workspaces`);
    console.log('✅ Workspaces fetched successfully:', response.data);
    return response.data;
  } catch (error) {
    console.error('❌ Error fetching workspaces:', error);
    throw error;
  }
};

export const getWorkspaceById = async (id) => {
  try {
    const response = await axios.get(`${API_URL}/workspaces/${id}`);
    return response.data;
  } catch (error) {
    console.error('❌ Error fetching workspace by ID:', error);
    throw error;
  }
};

export const createWorkspace = async (workspaceData) => {
    const response = await axios.post(`${API_URL}/workspaces`, workspaceData);
    return response.data;
  };
