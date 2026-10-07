import { useState, useEffect } from 'react';
import { Routes, Route, useNavigate, useLocation, useParams, Link } from 'react-router-dom';
import { getpost, getPhotos, getAlbums, getAlbumPhotos, getComments, getFoodRecalls } from './api/index.js';

function LeftSidebar({ isOpen, setIsOpen }) {
  const navigate = useNavigate();
  const location = useLocation();

  const menu = [
    { name: 'News Feed', path: '/news-feed' },
    { name: 'Albums', path: '/albums' },
    { name: 'Company', path: '/company' },
    { name: 'Food Recalls', path: '/food-recalls' },
    { name: 'Watch', path: '/watch' },
    { name: 'Reels', path: '/reels' },
    { name: 'Saved Posts', path: '/saved' },
    { name: 'Memories', path: '/memories' },
    { name: 'Pokes', path: '/pokes' },
    { name: 'My Groups', path: '/groups' },
    { name: 'My Pages', path: '/pages' },
    { name: 'Blog', path: '/blog' },
    { name: 'Market', path: '/market' },
    { name: 'Directory', path: '/directory' },
    { name: 'Events', path: '/events' },
    { name: 'Games', path: '/games' },
    { name: 'Movies', path: '/movies' },
    { name: 'Jobs', path: '/jobs' },
  ];

  return (
    <>
      {/* Mobile Overlay */}
      {isOpen && <div onClick={() => setIsOpen(false)} className="fixed inset-0 bg-black/50 z-40 lg:hidden"></div>}

      {/* Sidebar - Desktop pe fixed, Mobile pe drawer */}
      <div className={`
        fixed top-0 left-0 bottom-0 w-[280px] bg-white z-50 overflow-y-auto border-r
        transform transition-transform duration-300
        ${isOpen? 'translate-x-0' : '-translate-x-full'}
        lg:translate-x-0 lg:z-10
      `}>
        <div className="p-4 font-bold text-lg border-b lg:hidden flex justify-between items-center">
          My App
          <span onClick={() => setIsOpen(false)} className="cursor-pointer text-xl">✕</span>
        </div>
        <div className="hidden lg:block p-4 font-bold text-lg border-b">My App</div>

        <div className="p-2">
          {menu.map(item => {
            const active = location.pathname === item.path || (item.path === '/news-feed' && location.pathname === '/');
            return (
              <div key={item.name} onClick={() => { navigate(item.path); setIsOpen(false); }}
                className={`p-3 rounded-lg cursor-pointer mb-1 ${active? 'bg-gray-200 font-semibold' : 'hover:bg-gray-100'}`}>
                {item.name}
              </div>
            )
          })}
        </div>
      </div>
    </>
  )
}

// --- Tumhara Feed Card Same ---
function PostCard({ post }) {
  const [openMenu, setOpenMenu] = useState(false);
  const navigate = useNavigate();
  return (
    <div className="bg-white mb-3 rounded-lg shadow-sm overflow-hidden">
      <div className="flex items-center justify-between p-3">
        <div className="flex gap-2 items-center">
          <img src={`https://i.pravatar.cc/40?u=${post.id}`} className="w-10 h-10 rounded-full" />
          <div><div className="text-sm font-semibold">test ✔️ changed his profile picture</div><div className="text-xs text-gray-500">1 w • 🌍</div></div>
        </div>
        <div className="relative">
          <span onClick={()=>setOpenMenu(!openMenu)} className="cursor-pointer">▼</span>
          {openMenu && (
            <div className="absolute right-0 top-6 bg-white shadow-lg rounded-md w-48 z-10 border">
              <div onClick={()=>navigate(`/post/${post.id}`)} className="p-3 hover:bg-gray-100 cursor-pointer">👁️ View Post</div>
              <div onClick={()=>navigate(`/post/${post.id}`)} className="p-3 hover:bg-gray-100 cursor-pointer">🔗 Open Single Page</div>
            </div>
          )}
        </div>
      </div>
      <img src={post.image} className="w-full" />
      <div className="flex justify-around p-3 border-t text-sm">
        <span>👍 Like</span><span>💬 Comment</span><span>↗️ Share</span>
      </div>
    </div>
  )
}

function Feed() {
  const [posts, setPosts] = useState([]);
  useEffect(() => {
    Promise.all([getpost(), getPhotos()]).then(([p, ph]) => {
      setPosts(p.map(x => ({...x, image: ph.find(y => y.id === x.id)?.url || `https://picsum.photos/600/400?random=${x.id}`})));
    });
  }, []);
  if(!posts.length) return <p className="p-5">Loading...</p>;
  return <div>{posts.map(p => <PostCard key={p.id} post={p} />)}</div>;
}

function FoodPage() {
  const [recalls, setRecalls] = useState([]); const [loading, setLoading] = useState(true);
  useEffect(() => { getFoodRecalls().then(d => { setRecalls(d); setLoading(false); }); }, []);
  if(loading) return <p className="p-5">Loading Food Recalls...</p>;
  return (
    <div className="p-2">
      <h2 className="font-bold text-lg p-3 bg-white rounded-lg mb-3">Food Recalls - Latest ({recalls.length})</h2>
      {recalls.map((item, idx) => (
        <div key={idx} className="bg-white p-4 rounded-lg shadow-sm mb-3 border">
          <h3 className="font-bold text-red-600">{item.product || item.title || `Recall ${idx+1}`}</h3>
          <div className="mt-2 text-sm">
            {Object.entries(item).map(([k,v]) => (
              <p key={k} className="py-1 border-b last:border-0"><b className="capitalize">{k.replace(/_/g,' ')}:</b> {typeof v === 'object'? JSON.stringify(v) : String(v)}</p>
            ))}
          </div>
        </div>
      ))}
    </div>
  )
}

function CompanyPage() {
  return <div className="bg-white p-5 rounded-lg m-2"><h2 className="font-bold text-lg">Company</h2><p className="text-gray-500 mt-2">Albums ke neeche wala company section</p></div>
}

function Albums() {
  const [albums, setAlbums] = useState([]); 
  const navigate = useNavigate();
  useEffect(()=>{ getAlbums().then(setAlbums); },[]);
  return (
    <div className="p-2">
      <h2 className="font-bold p-2">Albums</h2>
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-2">
        {albums.map(a => (
          <div key={a.id} onClick={()=>navigate(`/albums/${a.id}`)} className="bg-white rounded-lg overflow-hidden cursor-pointer border hover:shadow-md">
            <img src={`https://picsum.photos/300/300?random=${a.id}`} className="w-full aspect-square object-cover" />
          </div>
        ))}
      </div>
    </div>
  )
} 

function AlbumPhotos() {
  const [photos, setPhotos] = useState([]);
  const [view, setView] = useState(null);
  useEffect(()=>{ getAlbumPhotos().then(p=>setPhotos(p.slice(0,30))); },[]);
  return (
    <div>
      <Link to="/albums" className="block p-3 text-blue-600 font-semibold">← Back to Albums</Link>
      <div className="grid grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-1 p-1">
        {photos.map(p => (
          <img key={p.id} src={p.url} onClick={()=>setView(p.url)} className="w-full aspect-square object-cover cursor-pointer rounded-sm hover:opacity-80" />
        ))}
      </div>
      {view && (
        <div onClick={()=>setView(null)} className="fixed inset-0 bg-black/90 flex items-center justify-center z-[100] p-4">
          <span className="absolute top-3 right-5 text-white text-3xl cursor-pointer">✕</span>
          <img src={view} className="max-w-[90%] max-h-[90%] rounded-lg" />
        </div>
      )}
    </div>
  )
} 

function SinglePost() {
  const { id } = useParams(); const [post, setPost] = useState(null); const [comments, setComments] = useState([]);
  useEffect(() => { getpost().then(all => setPost(all.find(x => x.id == id))); getPhotos().then(ph => setPost(prev => prev? {...prev, image: ph.find(y => y.id == id)?.url} : prev)); getComments(id).then(setComments); }, [id]);
  if(!post) return <p className="p-5">Loading...</p>;
  return (<div className="bg-white rounded-lg overflow-hidden m-2"><Link to="/" className="block p-3 text-blue-600">← Back to Feed</Link><div className="p-3 flex gap-2"><img src={`https://i.pravatar.cc/40?u=${post.id}`} className="w-10 rounded-full" /><div><b>User {post.userId}</b><div className="text-xs">Just now 🌍</div></div></div><img src={post.image || `https://picsum.photos/600/400?random=${id}`} className="w-full" /><div className="p-3"><h3 className="font-bold">{post.title}</h3><p className="text-sm mt-1">{post.body}</p><h4 className="mt-4 font-bold">Comments ({comments.length})</h4>{comments.map(c => (<div key={c.id} className="flex gap-2 mt-2 text-sm"><div className="w-8 h-8 bg-gray-200 rounded-full flex items-center justify-center text-xs">{c.id}</div><div><b className="text-xs">{c.email}</b><p>{c.body}</p></div></div>))}</div></div>)
}

export default function App() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  return (
    <div className="min-h-screen bg-[#f0f2f5]">
      {/* Header - Mobile pe hamburger, Desktop pe bhi */}
      <div className="bg-white p-3 flex justify-between items-center sticky top-0 z-30 shadow-sm lg:ml-[280px]">
        <h2 className="font-bold text-lg lg:hidden">My App</h2>
        <h2 className="font-bold text-lg hidden lg:block">Feed</h2>
        <span onClick={()=>setIsMenuOpen(true)} className="text-2xl cursor-pointer lg:hidden">☰</span>
        <span onClick={()=>setIsMenuOpen(!isMenuOpen)} className="text-2xl cursor-pointer hidden lg:block">☰</span>
      </div>

      <LeftSidebar isOpen={isMenuOpen} setIsOpen={setIsMenuOpen} />

      {/* Main Content - Desktop pe sidebar ke baad */}
      <div className="lg:ml-[280px] max-w-[600px] mx-auto lg:mx-0 lg:max-w-[700px] lg:p-4">
        <Routes>
          <Route path="/" element={<Feed/>} />
          <Route path="/news-feed" element={<Feed/>} />
          <Route path="/albums" element={<Albums/>} />
          <Route path="/albums/:id" element={<AlbumPhotos/>} />
          <Route path="/post/:id" element={<SinglePost/>} />
          <Route path="/company" element={<CompanyPage/>} />
          <Route path="/food-recalls" element={<FoodPage/>} />
          <Route path="/:page" element={<div className="bg-white p-5 rounded-lg m-2"><h2>Coming Soon</h2></div>} />
        </Routes>
      </div>
    </div>
  );
} 