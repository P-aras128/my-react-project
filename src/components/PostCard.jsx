import { useState } from 'react';
import { getComments } from '../api/index.js';

function PostCard({ post }) {
  const [comments, setComments] = useState([]);
  const [show, setShow] = useState(false);
  const [loading, setLoading] = useState(false);

  const loadComments = async () => {
    if (show) {
      setShow(false);
      return;
    }
    setLoading(true);
    const data = await getComments(post.id);
    setComments(data);
    setShow(true);
    setLoading(false);
  };

  return (
    <div className="bg-white rounded-xl shadow-sm mb-5 overflow-hidden">
      {/* Post Image */}
      <img src={post.image} alt="post" className="w-full h-[350px] object-cover" />

      <div className="p-4">
        <h3 className="font-bold text-[16px] capitalize">{post.title}</h3>
        <p className="text-sm text-gray-600 mt-1">{post.body}</p>

        <button
          onClick={loadComments}
          className="mt-3 text-sm font-semibold text-blue-600 hover:underline"
        >
          {loading? 'Loading...' : show? 'Hide Comments' : `Show Comments (${post.id})`}
        </button>

        {/* Comments Section - Yehi wo section hai jo pehle tha */}
        {show && (
          <div className="mt-4 border-t pt-3 space-y-3">
            {comments.map(c => (
              <div key={c.id} className="bg-[#f0f2f5] p-3 rounded-lg">
                <p className="text-xs font-bold text-gray-800">{c.name}</p>
                <p className="text-[11px] text-blue-500">{c.email}</p>
                <p className="text-xs text-gray-700 mt-1">{c.body}</p>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

export default PostCard;