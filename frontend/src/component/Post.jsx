import { useEffect, useState } from "react";
import { format } from "date-fns";
import { Link } from 'react-router-dom';
const URL = import.meta.env.VITE_BASE_URL;

const Post = () => {
  const [posts, setPosts] = useState([]);

  useEffect(() => {
    const fetchPosts = async () => {
      try {
        const response = await fetch(`${URL}/posts`);
        if (!response.ok) {
          throw new Error(`HTTP error! Status: ${response.status}`);
        }
        const data = await response.json();
        setPosts(data);
      } catch (error) {
        console.error("Error fetching posts:", error.message);
      }
    };
    fetchPosts();
  }, []);

  return (
    <div>
      {posts.map((post) => (
        <div className='post' key={post._id}>
          <div className='images'>
            <Link to={`/post-detail/${post._id}`}>
              <img src={`${URL}/${post.cover}`} alt='' />
            </Link>
          </div>
          <div className='texts'>
            <Link to={`/post-detail/${post._id}`}>
              <h2>{post.title}</h2>
            </Link>
            <time>{format(new Date(post.createdAt), "dd MMMM yyyy HH:mm")}</time>
            <p className='info'>
              <a href="" className='author'>
                {post.author.username}
              </a>
            </p>
            <p className='summary'>{post.summary}</p>
          </div>
        </div>
      ))}
    </div>
  );
}; 
export default Post;
