import React, { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import axios from "axios";

const ReviewComponent = ({ gameId }) => {
  const [reviewRating, setReviewRating] = useState(0);
  const [reviewComment, setReviewComment] = useState("");
  const [reviews, setReviews] = useState([]);
  const user = useSelector((state) => state.user); // Ottieni lo userId dallo stato globale Redux

  useEffect(() => {
    fetchReviews();
  }, [gameId]);

  const fetchReviews = async () => {
    try {
      const response = await axios.get(`http://localhost:8000/api/games/${gameId}/reviews`);
      setReviews(response.data);
    } catch (error) {
      console.error("Error fetching reviews:", error);
    }
  };

  const handleReviewSubmit = async () => {
    try {
      const response = await axios.post(`http://localhost:8000/api/games/${gameId}/reviews`, {
        user_id: user.id, // Usa lo userId ottenuto dallo stato Redux
        rating: reviewRating,
        game_id: gameId,
        comment: reviewComment,
      });
      console.log("Review submitted successfully:", response.data);
      setReviewRating(0);
      setReviewComment("");
      fetchReviews(); // Aggiorna l'elenco delle recensioni dopo l'invio di una nuova recensione
    } catch (error) {
      console.error("Error submitting review:", error);
    }
  };

  const handleDeleteReview = async (reviewId) => {
    try {
      const response = await axios.delete(`http://localhost:8000/api/reviews/${reviewId}`);
      console.log("Review deleted successfully:", response.data);
      fetchReviews();
    } catch (error) {
      console.error("Error deleting review:", error);
    }
  };

  const renderStars = () => {
    return [...Array(5)].map((_, index) => {
      return (
        <i
          key={index}
          className={`bi bi-star${index < reviewRating ? "-fill" : ""}`}
          style={{ cursor: "pointer", color: index < reviewRating ? "#ffc107" : "#e4e5e9", fontSize: "1.5rem" }}
          onClick={() => setReviewRating(index + 1)}
        ></i>
      );
    });
  };

  return (
    <div className="text-white review-container">
      <h2>Leave a Review</h2>
      {/* Form per inviare una nuova recensione */}
      <div className="mb-3">
        <label htmlFor="rating" className="form-label">
          Rating
        </label>
        <div id="rating" className="d-flex">
          {renderStars()}
        </div>
      </div>
      <div className="mb-3">
        <label htmlFor="comment" className="form-label">
          Comment
        </label>
        <textarea
          className="form-control"
          id="comment"
          rows="3"
          value={reviewComment}
          onChange={(e) => setReviewComment(e.target.value)}
        ></textarea>
      </div>
      <button type="button" className="card-button1" onClick={handleReviewSubmit}>
        Submit Review
      </button>

      {/* Visualizzazione delle recensioni esistenti */}
      <div className="review-list">
        <h2 className="text-center mb-5">Recensioni </h2>
        {reviews.length === 0 ? (
          <p>No reviews yet.</p>
        ) : (
          reviews.map((review) => (
            <div
              key={review.id}
              className="review mb-4 p-3"
              style={{ backgroundColor: "#7d5729", color: "#c7d5e0", borderRadius: "5px" }}
            >
              <div className="d-flex align-items-center mb-3">
                <img
                  src={review.user.profile_img}
                  style={{ height: "50px", width: "50px", borderRadius: "50%", marginRight: "15px" }}
                  alt={`${review.user.name}'s profile`}
                />
                <div>
                  <p className="mb-0" style={{ fontWeight: "bold" }}>
                    {review.user.name}
                  </p>
                  <p className="mb-0" style={{ fontSize: "14px", color: "#8c8f94" }}>
                    {review.user.reviewsCount} reviews
                  </p>
                </div>
              </div>
              <div>
                <p>
                  <strong>Rating:</strong> {review.rating} <i className="bi bi-star-fill"></i>
                </p>
                <p>
                  <strong>Comment:</strong> {review.comment}
                </p>
                {(user.id === review.user.id || user.role === "admin") && (
                  <button className="review-delete-btn" onClick={() => handleDeleteReview(review.id)}>
                    Delete
                  </button>
                )}
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
};

export default ReviewComponent;
