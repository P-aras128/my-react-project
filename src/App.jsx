import { Routes, Route, Link, useParams } from 'react-router-dom';
import { useEffect, useState } from 'react';
import LeftSideBar from './components/LeftSideBar.jsx';
import { getpost, getPhotos, getAlbums, getAlbumPhotos } from './api/index.js';
import PostCard from './components/PostCard.jsx';
import Lightbox from "yet-another-react-lightbox";
import "yet-another-react-lightbox/styles.css";

function FeedPage({ posts }) {
  return <div>{posts.map(p => <PostCard key={p.id} post={p} />)}</div>
}

function AlbumsPage() {
  const [albums, setAlbums] = useState([]);
  useEffect(() => { getAlbums().then(setAlbums); }, []);
  return (
    <div style={{background:'#fff', padding:'20px', borderRadius:'8px'}}>
      <h2>Albums</h2>
      <div style={{display:'grid', gridTemplateColumns:'1fr 1fr 1fr', gap:'15px', marginTop:'15px'}}>
        {albums.map(a => <Link key={a.id} to={`/albums/${a.id}`} style={{textDecoration:'none', color:'#000'}}><div style={{border:'1px solid #ddd', padding:'10px', borderRadius:'8px'}}><img src={`https://picsum.photos/200/200?random=${a.id}`} style={{width:'100%'}}/><p>{a.title}</p></div></Link>)}
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
  if (!photos.length) return <div>Loading...</div>;
  return (
    <div style={{background:'#fff', padding:'20px', borderRadius:'8px'}}>
      <Link to="/albums">← Back</Link>
      <div style={{display:'grid', gridTemplateColumns:'1fr 1fr 1fr', gap:'10px', marginTop:'15px'}}>
        {photos.map((p, i) => <img key={p.id} src={p.thumbnailUrl} onClick={() => { setIdx(i); setOpen(true); }} style={{width:'100%', borderRadius:'8px', cursor:'pointer'}} />)}
      </div>
      <Lightbox open={open} close={() => setOpen(false)} index={idx} slides={photos.map(p => ({ src: p.url }))} />
    </div>
  )
}

function App() {
  const [posts, setPosts] = useState([]);
  useEffect(() => {
    Promise.all([getpost(), getPhotos()]).then(([pd, ph]) => {
      const m = pd.map(post => {
        const photo = ph.find(p => p.id === post.id);
        return {...post, image: photo? photo.url : `https://picsum.photos/500/500?random=${post.id}` };
      });
      setPosts(m);
    });
  }, []);
  if (!posts.length) return <h1>Loading...</h1>;

  return (
    <div style={{ display: 'flex' }}>
      <div style={{ position: 'fixed', left: 0, top: 0, width: '280px', height: '100vh', overflowY: 'auto', background: '#fff', borderRight: '1px solid #ddd' }}>
        <LeftSideBar />
      </div>
      <div style={{ marginLeft: '300px', flex: 1, padding: '20px', background: '#f0f2f5', minHeight: '100vh' }}>
        <Routes>
          <Route path="/" element={<FeedPage posts={posts} />} />
          <Route path="/news-feed" element={<FeedPage posts={posts} />} />
          <Route path="/albums" element={<AlbumsPage />} />
          <Route path="/albums/:id" element={<SingleAlbumPage />} />
        </Routes>
      </div>
    </div>
  );
}
export default App;