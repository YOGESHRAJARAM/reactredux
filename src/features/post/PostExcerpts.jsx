import React from 'react'
import PostAuthor from "./PostAuthor.jsx";
import TimeAgo from "./TimeAgo.jsx";
import ReactionButtons from "./ReactionButtons.jsx";

const PostExcerpts = ({post}) => {
  return (
    <article>
    <h3>{post.title}</h3>
    <p>{post.body.substring(0, 100)}</p>
    <p className="postCredit">
      <PostAuthor userId={post.userId} />
      <TimeAgo timestamp={post.date} />
      <ReactionButtons post={post} />
    </p>
  </article>
  )
}

export default PostExcerpts