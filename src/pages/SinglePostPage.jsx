import { useParams, Link } from 'react-router-dom';

function SinglePostPage({ posts }) {
  const { id } = useParams();

  // Agar posts abhi load nahi hue to Loading dikhao, blank nahi
  if (!posts || posts.length === 0) {
    return <div className="p-10 text-center">Loading...</div>;
  }

  const post = posts.find(p => p.id == id);

  if (!post) {
    return <div className="p-10 text-center">Post {id} not found</div>;
  }

  return (
    <div className="max-w-[600px] mx-auto">
      <Link to="/" className="bg-white px-4 py-2 rounded-lg shadow-sm text-blue-600 inline-block mb-4">← Back</Link>
      <div className="bg-white rounded-xl border overflow-hidden">
        <img src={post.image} className="w-full" />
        <div className="p-4">
          <h2 className="font-bold">{post.title}</h2>
          <p className="text-sm mt-2 text-gray-700">{post.body}</p>
        </div>
      </div>
    </div>
  );
}

export default SinglePostPage;