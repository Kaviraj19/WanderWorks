import React, { useEffect, useState, useCallback } from 'react';
import { useSelector } from 'react-redux';
import axios from 'axios';
import './navbar.css';

const Reviews = ({ workspaceId }) => {
  const [reviews, setReviews] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [showForm, setShowForm] = useState(false);

  const { userInfo } = useSelector((state) => state.user);
  const userId = userInfo?.user?.id || userInfo?.id;

  const [rating, setRating] = useState(5);
  const [comment, setComment] = useState('');

  // useCallback makes fetchReviews stable (no unnecessary re-creation)
  const fetchReviews = useCallback(async () => {
    setLoading(true);
    try {
      const response = await axios.get(
        `http://localhost:4000/api/reviews/workspace_id/${workspaceId}`
      );
      setReviews(response.data);
      setError(null);
    } catch (err) {
      console.error('Error fetching reviews:', err);
      setError('Could not fetch reviews');
    } finally {
      setLoading(false);
    }
  }, [workspaceId]); // depends only on workspaceId

  useEffect(() => {
    if (workspaceId) {
      fetchReviews();
    }
  }, [workspaceId, fetchReviews]); // no warning now ✅

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!userInfo) {
      alert("You must be logged in to submit a review.");
      return;
    }

    try {
      const reviewData = {
        user_id: userId,
        workspace_id: workspaceId,
        rating,
        comment,
      };
      await axios.post('http://localhost:4000/api/reviews', reviewData);
      setComment('');
      setRating(5);
      setShowForm(false);
      await fetchReviews(); // refetch latest reviews
    } catch (err) {
      console.error('Error submitting review:', err);
      alert('Failed to submit review');
    }
  };

  return (
    <div className="reviews">
      <h3>Reviews</h3>

      {!showForm && (
        <button onClick={() => setShowForm(true)} style={{ marginBottom: '1rem' }}>
          Add Review
        </button>
      )}

      {showForm && (
        <form onSubmit={handleSubmit} style={{ marginBottom: '2rem' }}>
          <label>Comments: </label>
          <textarea
            value={comment}
            onChange={(e) => setComment(e.target.value)}
            placeholder="Write your review"
            rows={3}
            required
          />
          <br />
          <label>Rating: </label>
          <div className="star-rating">
            {[1, 2, 3, 4, 5].map((star) => (
              <span
                key={star}
                style={{
                  cursor: 'pointer',
                  color: star <= rating ? '#ffc107' : '#e4e5e9',
                  fontSize: '4.0rem',
                }}
                onClick={() => setRating(star)}
              >
                ★
              </span>
            ))}
          </div>
          <br />
          <button type="submit" style={{ marginRight: '1rem' }}>
            Submit Review
          </button>
          <button type="button" onClick={() => setShowForm(false)}>
            Cancel
          </button>
        </form>
      )}

      {loading ? (
        <p>Loading reviews...</p>
      ) : error ? (
        <p>{error}</p>
      ) : reviews.length === 0 ? (
        <p>No reviews yet.</p>
      ) : (
        <ul>
          {reviews.map((review) => (
            <li key={review.id} style={{ marginBottom: '1rem' }}>
              <p>
                <b>{review.User?.username || 'Unknown User'}</b>:
                <i> {review.comment || <em>No comment provided</em>}</i>
              </p>
              <small>Rating: {'⭐'.repeat(review.rating)}</small>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default Reviews;
