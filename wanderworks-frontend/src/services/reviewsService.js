// src/services/reviewService.js
import axios from 'axios';

export const getReviewsByWorkspaceId = async (workspaceId) => {
  const response = await axios.get(`/api/reviews?workspaceId=${workspaceId}`);
  return response.data;  // Assuming the response contains an array of reviews
};



export const addReview = async (workspaceId, reviewData) => {
  const response = await axios.post('http://localhost:4000/api/reviews/', {
    user_id: reviewData.user_id, // Ensure this is dynamically set based on logged-in user
    workspace_id: workspaceId,
    comment: reviewData.comment,
    rating: reviewData.rating,
  });
  return response.data; // Return the response or handle as needed
};

