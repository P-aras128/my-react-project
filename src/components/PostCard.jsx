import { useState, useEffect } from 'react';
import { getComments } from '../api/index.js';

export default function PostCard({ post }) {
  const [comments, setComments] = useState([]);
  const [showComments, setShowComments] = useState(false);

  const loadComments = async () => {
    if (comments.length === 0) {
      const data = await getComments(post.id);
      setComments(data);
    }
    setShowComments(!showComments);
  };

  return (
    <div style={{background:'#fff', borderRadius:'8px', padding:'15px', marginBottom:'15px', boxShadow:'0 1px 2px rgba(0,0,0,0.1)'}}>
      {/* User */}
      <div style={{display:'flex', alignItems:'center', gap:'10px', marginBottom:'10px'}}>
        <img src={`https://i.pravatar.cc/40?u=${post.id}`} style={{width:'40px', height:'40px', borderRadius:'50%'}} />
        <div>
          <h4 style={{margin:0, fontSize:'14px', fontWeight:'600'}}>User {post.userId}</h4>
          <p style={{margin:0, fontSize:'12px', color:'#65676b'}}>Just now</p>
        </div>
      </div>

      {/* Post Text */}
      <h3 style={{fontSize:'15px', fontWeight:'600', margin:'0 0 5px 0'}}>{post.title}</h3>
      <p style={{fontSize:'14px', color:'#050505', margin:'0 0 10px 0'}}>{post.body}</p>

      {/* Post Image */}
      {post.image && (
        <img src={post.image} style={{width:'100%', borderRadius:'6px', maxHeight:'400px', objectFit:'cover'}} />
      )}

      {/* Actions */}
      <div style={{display:'flex', justifyContent:'space-between', marginTop:'10px', borderTop:'1px solid #e4e6eb', paddingTop:'10px'}}>
        <button style={{border:'none', background:'none', cursor:'pointer'}}>👍 Like</button>
        <button onClick={loadComments} style={{border:'none', background:'none', cursor:'pointer'}}>💬 Comment ({comments.length || '...'})</button>
        <button style={{border:'none', background:'none', cursor:'pointer'}}>↗️ Share</button>
      </div>

      {/* Comments */}
      {showComments && (
        <div style={{marginTop:'10px', background:'#f0f2f5', padding:'10px', borderRadius:'8px'}}>
          {comments.map(c => (
            <div key={c.id} style={{marginBottom:'8px'}}>
              <b style={{fontSize:'13px'}}>{c.email}: </b>
              <span style={{fontSize:'13px'}}>{c.body}</span>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}