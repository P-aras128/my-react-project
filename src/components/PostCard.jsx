import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { getComments } from '../api/index.js';

function PostCard({ post }) {
  const [comments, setComments] = useState([]);
  const [showComments, setShowComments] = useState(false);
  const [showMenu, setShowMenu] = useState(false);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleCommentClick = async () => {
    if (showComments) {
      setShowComments(false);
      return;
    }
    setLoading(true);
    const data = await getComments(post.id);
    setComments(data);
    setShowComments(true);
    setLoading(false);
  };

  return (
    <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden mb-4 relative">
      {/* Header */}
      <div className="flex items-center justify-between p-3">
        <div className="flex items-center gap-3">
          <img src={`https://i.pravatar.cc/150?img=${post.id}`} className="w-10 h-10 rounded-full" />
          <div>
            <h4 className="font-semibold text-sm">test ✔️ <span className="font-normal">changed his profile picture</span></h4>
            <p className="text-[11px] text-gray-500">1 w • 🌍</p>
          </div>
        </div>

        {/* V ICON WITH DROPDOWN */}
        <div className="relative">
          <button
            onClick={() => setShowMenu(!showMenu)}
            className="w-8 h-8 flex items-center justify-center hover:bg-gray-100 rounded-full font-bold text-gray-600"
          >
            ⌄
          </button>

          {showMenu && (
            <div className="absolute right-0 top-9 w-44 bg-white border border-gray-200 rounded-lg shadow-lg z-20 py-1">
              <button
                onClick={() => navigate(`/post/${post.id}`)}
                className="w-full text-left px-4 py-2.5 text-sm hover:bg-gray-100"
              >
                👁️ View Post
              </button>
              <button
                onClick={() => navigate(`/post/${post.id}`)}
                className="w-full text-left px-4 py-2.5 text-sm hover:bg-gray-100"
              >
                🔗 Open Single Page
              </button>
            </div>
          )}
        </div>
      </div>

      {/* Image */}
      <img src={post.image} alt="post" className="w-full max-h-[500px] object-cover bg-gray-100" />

      {/* Like Comment Bar */}
      <div className="flex justify-around border-t py-1">
        <button className="flex-1 py-2 text-sm font-medium text-gray-600 hover:bg-gray-50 rounded">👍 Like</button>
        <button onClick={handleCommentClick} className="flex-1 py-2 text-sm font-medium text-gray-600 hover:bg-gray-50 rounded">
          {loading? 'Loading...' : '💬 Comment'}
        </button>
        <button className="flex-1 py-2 text-sm font-medium text-gray-600 hover:bg-gray-50 rounded">↗️ Share</button>
      </div>

      {/* Comments - ID left side */}
      {showComments && (
        <div className="bg-[#f0f2f5] p-3 space-y-2">
          {comments.map((c) => (
            <div key={c.id} className="flex gap-3 items-start bg-white p-2.5 rounded-lg shadow-sm">
              <span className="w-6 h-6 bg-blue-100 text-blue-600 text-xs font-bold rounded-full flex items-center justify-center flex-shrink-0">
                {c.id}
              </span>
              <p className="text-[13px] text-gray-700">{c.body}</p>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

export default PostCard;