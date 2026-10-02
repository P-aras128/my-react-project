import { useParams, Link } from 'react-router-dom';
import { useState, useEffect } from 'react';
import { getComments } from '../api/index.js';

function SinglePostPage({ posts }) {
  const { id } = useParams();
  const [comments, setComments] = useState([]);
  const [liked, setLiked] = useState(false);
  const [likeCount, setLikeCount] = useState(Math.floor(Math.random() * 100) + 10);

  useEffect(() => {
    getComments(id).then(setComments);
  }, [id]);

  if (!posts || posts.length === 0) {
    return <div className="p-10 text-center">Loading...</div>;
  }

  const post = posts.find(p => p.id == id);
  if (!post) return <div className="p-10 text-center">Post not found</div>;

  const handleLike = () => {
    if (liked) {
      setLikeCount(likeCount - 1);
    } else {
      setLikeCount(likeCount + 1);
    }
    setLiked(!liked);
  };

  return (
    <div className="max-w-[650px] mx-auto">
      <Link to="/" className="bg-white px-4 py-2 rounded-lg shadow-sm text-blue-600 inline-block mb-4 font-medium">← Back to Feed</Link>

      <div className="bg-white rounded-xl shadow-sm border overflow-hidden">
        {/* Header */}
        <div className="p-3 flex items-center gap-3">
          <img src={`https://i.pravatar.cc/150?img=${post.id}`} className="w-10 h-10 rounded-full" />
          <div>
            <h4 className="font-semibold text-sm">User {post.userId}</h4>
            <p className="text-[11px] text-gray-500">Just now • 🌍</p>
          </div>
        </div>

        {/* Image */}
        <img src={post.image} className="w-full" />

        {/* Title + Body */}
        <div className="p-4 border-b">
          <h2 className="font-bold text-[17px] capitalize">{post.title}</h2>
          <p className="text-[14px] text-gray-700 mt-2">{post.body}</p>
        </div>

        {/* Like Count */}
        <div className="px-4 py-2 flex justify-between text-[13px] text-gray-500">
          <span>👍 {likeCount} Likes</span>
          <span>{comments.length} Comments</span>
        </div>

        {/* Like Comment Share Buttons */}
        <div className="flex border-t">
          <button
            onClick={handleLike}
            className={`flex-1 py-3 text-sm font-medium hover:bg-gray-50 ${liked? 'text-blue-600' : 'text-gray-600'}`}
          >
            {liked? '👍 Liked' : '👍 Like'}
          </button>
          <button className="flex-1 py-3 text-sm font-medium text-gray-600 hover:bg-gray-50">💬 Comment</button>
          <button className="flex-1 py-3 text-sm font-medium text-gray-600 hover:bg-gray-50">↗️ Share</button>
        </div>

        {/* Comments Section */}
        <div className="bg-[#f0f2f5] p-3 space-y-2">
          <h3 className="font-bold text-sm mb-2">Comments ({comments.length})</h3>
          {comments.map((c) => (
            <div key={c.id} className="flex gap-3 items-start bg-white p-3 rounded-lg shadow-sm">
              <span className="w-7 h-7 bg-blue-100 text-blue-600 text-xs font-bold rounded-full flex items-center justify-center flex-shrink-0">
                {c.id}
              </span>
              <div>
                <p className="font-semibold text-[13px]">{c.email}</p>
                <p className="text-[13px] text-gray-700 mt-1">{c.body}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default SinglePostPage;