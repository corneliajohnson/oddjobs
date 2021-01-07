import React from "react";

export const UserPostCard = ({ post }) => (
  <div className="card">
    <div className="card-title">{post.title}</div>
    <div className="card-text">Job Category: {post.jobCategoryId}</div>
    <div className="card-text">Date Posted: {post.posted}</div>
    <div className="card-text">Visible: {post.visible}</div>
  </div>
);
