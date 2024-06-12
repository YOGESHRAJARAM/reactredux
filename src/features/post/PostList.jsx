import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import {
  selectAllPost,
  getPostsError,
  getPostsStatus,
  fetchPosts,
} from "./postSlice.js";
import PostExcerpts from "./PostExcerpts.jsx";

const PostList = () => {
  const dispatch = useDispatch()
  const posts = useSelector(selectAllPost);
  const postStatus = useSelector(getPostsStatus);
  const error = useSelector(getPostsError);
  
  useEffect(()=>{ if(postStatus === 'idle'){dispatch(fetchPosts())}  },[postStatus,dispatch])
  let content;
  if(postStatus === 'loading'){
    content = <p>"Loading......"</p>;
  } else if(postStatus === 'succeeded'){
    const orderdPost = posts.slice().sort((a, b) => b.date.localeCompare(a.date));
    content = orderdPost.map((post) => (<PostExcerpts key={post.id} post ={post}/>
    
    ));
  }else if(postStatus === 'failed'){
      content = <p>{error}</p>;
  }


  return (
    <section>
      <h2>Posts</h2>
      {content}
    </section>
  );
};

export default PostList;
