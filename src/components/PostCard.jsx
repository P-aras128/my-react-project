import { useState } from 'react';
import { getComments } from '../api/index.js';

function PostCard({ post }) {
  const [comments, setComments] = useState([]);
  const [showComments, setShowComments] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleCommentClick = async () => {
    if (showComments) {
      setShowComments(false);
      return;
    }
    setLoading(true);
    try {
      const data = await getComments(post.id);
      setComments(data);
      setShowComments(true);
    } catch (e) {
      console.log(e);
    }
    setLoading(false);
  };

  return (
    <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden mb-4">
      {/* Header */}
      <div className="flex items-center gap-3 p-3">
        <img
          src={`https://i.pravatar.cc/150?img=${post.id}`}
          alt="avatar"
          className="w-10 h-10 rounded-full"
        />
        <div>
          <h4 className="font-semibold text-sm">User {post.userId}</h4>
          <p className="text-[11px] text-gray-500">Just now • 🌍</p>
        </div>
      </div>

      {/* Title & Body */}
      <div className="px-3 pb-2">
        <h3 className="font-bold text-[15px] capitalize leading-tight">{post.title}</h3>
        <p className="text-[14px] text-gray-700 mt-1">{post.body}</p>
      </div>

      {/* Image */}
      <img src={post.image} alt="post" className="w-full max-h-[500px] object-cover bg-gray-100" />

      {/* Like Comment Share Bar */}
      <div className="flex justify-around border-t border-b border-gray-100 py-1 mx-1">
        <button className="flex-1 py-2 text-sm font-medium text-gray-600 hover:bg-gray-50 rounded">👍 Like</button>
        <button
          onClick={handleCommentClick}
          className="flex-1 py-2 text-sm font-medium text-gray-600 hover:bg-gray-50 rounded"
        >
          {loading? 'Loading...' : '💬 Comment'}
        </button>
        <button className="flex-1 py-2 text-sm font-medium text-gray-600 hover:bg-gray-50 rounded">↗️ Share</button>
      </div>

      {/* Comments Section - ID left side, Comment right side */}
      {showComments && (
        <div className="bg-[#f0f2f5] p-3 space-y-2">
          {comments.length === 0? (
            <p className="text-xs text-center text-gray-500">No comments</p>
          ) : (
            comments.map((c) => (
              <div key={c.id} className="flex gap-3 items-start bg-white p-2.5 rounded-lg shadow-sm">
                <span className="flex-shrink-0 w-6 h-6 bg-blue-100 text-blue-600 text-xs font-bold rounded-full flex items-center justify-center">
                  {c.id}
                </span>
                <div className="flex-1">
                  <p className="text-xs font-bold text-gray-800">{c.email}</p>
                  <p className="text-[13px] text-gray-700 leading-snug mt-0.5">{c.body}</p>
                </div>
              </div>
            ))
          )}
        </div>
      )}
    </div>
  );
}

export default PostCard;