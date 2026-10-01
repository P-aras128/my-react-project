import { useState } from 'react';
import { getComments } from '../api/index.js';

export default function PostActions({ postId }) {
  const [comments, setComments] = useState([]);
  const [show, setShow] = useState(false);

  const handleClick = async () => {
    if (!show) {
      const data = await getComments(postId);
      setComments(data.slice(0, 5)); // 5 comments
    }
    setShow(!show);
  };

  return (
    <>
      <div className="fb-actions">
        <button>👍 Like</button>
        <button onClick={handleClick}>💬 Comment</button>
        <button>↗️ Share</button>
      </div>

      {show && (
        <div className="comment-section">
          {comments.map((c) => (
            <div className="comment-row" key={c.id}>
              {/* Left me Profile Pic */}
              <img 
                src={`https://i.pravatar.cc/100?u=${c.email}`} 
                className="comment-avatar" 
                alt="user" 
              />
              
              {/* Right me Comment */}
              <div className="comment-bubble">
                <span className="comment-name">{c.name}</span>
                <p className="comment-text">{c.body}</p>
              </div>
            </div>
          ))}
        </div>
      )}
    </>
  );
}