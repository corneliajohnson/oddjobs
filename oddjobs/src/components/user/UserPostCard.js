import React from "react";
import { Link } from "react-router-dom";

export const UserPostCard = ({ post }) => (
  <div className="col">
    <div className="card">
      <div className="card-title">
        {post.pay ? (
          <Link to={`/jobs/detail/${post.id}`}>{post.title}</Link>
        ) : (
          <Link to={`/services/detail/${post.id}`}>{post.title}</Link>
        )}
      </div>
      <div className="card-title">{post.title}</div>
      <div className="card-text text-truncate">{post.details}</div>
      <div className="card-text">Date Posted: {post.posted}</div>
      <div className="card-text">Visible: {post.visible ? "Yes" : "No"}</div>
    </div>
  </div>
);
