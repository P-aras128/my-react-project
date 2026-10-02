import { Routes, Route, Link, useParams } from 'react-router-dom';
import { useEffect, useState } from 'react';
import LeftSideBar from './components/LeftSideBar.jsx';
import { getpost, getPhotos, getAlbums, getAlbumPhotos } from './api/index.js';
import PostCard from './components/PostCard.jsx';
import SinglePostPage from './pages/SinglePostPage';
import Lightbox from "yet-another-react-lightbox";
import "yet-another-react-lightbox/styles.css";

function FeedPage({ posts }) {
  return <div className="space-y-4">{posts.map(p => <PostCard key={p.id} post={p} />)}</div>
}

function AlbumsPage() {
  const [albums, setAlbums] = useState([]);
  useEffect(() => { getAlbums().then(setAlbums); }, []);
  return (
    <div className="bg-white p-4 md:p-6 rounded-xl shadow-sm">
      <h2 className="text-xl font-bold">Albums</h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 mt-4">
        {albums.map(a => (
          <Link key={a.id} to={`/albums/${a.id}`}>
            <div className="border rounded-xl p-2 hover:shadow-lg transition">
              <img src={`https://picsum.photos/200/200?random=${a.id}`} className="w-full rounded-lg aspect-square object-cover"/>
              <p className="text-sm mt-2 line-clamp-2 font-medium">{a.title}</p>
            </div>
          </Link>
        ))}
      </div>
    </div>
  )
}

function SingleAlbumPage() {
  const { id } = useParams();
  const [photos, setPhotos] = useState([]);
  const [open, setOpen] = useState(false);
  const [idx, setIdx] = useState(0);
  useEffect(() => { getAlbumPhotos().then(all => setPhotos(all.filter(p => p.albumId == id).slice(0, 24))); }, [id]);
  if (!photos.length) return <div className="p-10 text-center">Loading...</div>;
  return (
    <div className="bg-white p-4 md:p-6 rounded-xl shadow-sm">
      <Link to="/albums" className="text-blue-600 font-medium">← Back to Albums</Link>
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3 mt-4">
        {photos.map((p, i) => <img key={p.id} src={p.thumbnailUrl} onClick={() => { setIdx(i); setOpen(true); }} className="w-full rounded-lg cursor-pointer hover:opacity-80" />)}
      </div>
      <Lightbox open={open} close={() => setOpen(false)} index={idx} slides={photos.map(p => ({ src: p.url }))} />
    </div>
  )
}

function App() {
  const [posts, setPosts] = useState([]);
  const [showSidebar, setShowSidebar] = useState(false);

  useEffect(() => {
    Promise.all([getpost(), getPhotos()]).then(([pd, ph]) => {
      const m = pd.map(post => {
        const photo = ph.find(p => p.id === post.id);
        return {...post, image: photo? photo.url : `https://picsum.photos/500/500?random=${post.id}` };
      });
      setPosts(m);
    });
  }, []);

  if (!posts.length) return <h1 className="p-10 text-center font-bold">Loading...</h1>;

  return (
    <div className="flex min-h-screen bg-[#f0f2f5]">
      <div className="md:hidden fixed top-0 left-0 right-0 h-[60px] bg-white border-b flex items-center justify-between px-4 z-[100]">
        <h3 className="font-bold text-lg">My App</h3>
        <button onClick={() => setShowSidebar(!showSidebar)} className="text-3xl">☰</button>
      </div>

      <div className={`
        fixed left-0 bg-white border-r z-50 w-[280px] h-screen overflow-y-auto
        transition-transform duration-300
        top-[60px] md:top-0
        ${showSidebar? 'translate-x-0' : '-translate-x-full md:translate-x-0'}
      `}>
        <LeftSideBar />
      </div>

      {showSidebar && <div onClick={() => setShowSidebar(false)} className="fixed inset-0 bg-black/40 z-40 md:hidden top-[60px]"></div>}

      <div className="flex-1 md:ml-[280px] mt-[60px] md:mt-0 p-2 md:p-6">
        <Routes>
          <Route path="/" element={<FeedPage posts={posts} />} />
          <Route path="/news-feed" element={<FeedPage posts={posts} />} />
          <Route path="/albums" element={<AlbumsPage />} />
          <Route path="/albums/:id" element={<SingleAlbumPage />} />
          <Route path="/post/:id" element={<SinglePostPage posts={posts} />} />
        </Routes>
      </div>
    </div>
  );
}
export default App;