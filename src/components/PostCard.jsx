import { useState } from "react";

function PostCard({ post }) {
  return (
    <div style={{
      background: '#fff',
      borderRadius: '8px',
      border: '1px solid #dddfe2',
      marginBottom: '15px',
      overflow: 'hidden',
      maxWidth: '680px'
    }}>
      {/* HEADER */}
      <div style={{ display: 'flex', alignItems: 'center', padding: '12px', gap: '10px' }}>
        <img
          src={post.image}
          style={{ width: '40px', height: '40px', borderRadius: '50%', objectFit: 'cover' }}
          alt=""
        />
        <div style={{ flex: 1 }}>
          <div style={{ fontWeight: '600', fontSize: '15px', display: 'flex', alignItems: 'center', gap: '5px' }}>
            test <span style={{ color: '#1877f2', fontSize: '12px' }}>✔</span> changed his profile picture
          </div>
          <div style={{ fontSize: '12px', color: '#65676b' }}>1 w 🌐</div>
        </div>
        <div style={{ cursor: 'pointer' }}>⌄</div>
      </div>

      {/* IMAGE - Full Width jaise photo me */}
      <div style={{ background: '#f0f2f5' }}>
        <img src={post.image} style={{ width: '100%', display: 'block' }} alt="" />
      </div>

      {/* Comment Count */}
      <div style={{ padding: '10px 12px 0', textAlign: 'right', fontSize: '13px', color: '#65676b' }}>
        💬 0
      </div>

      {/* Like Comment Share - Jaise photo me */}
      <div style={{
        display: 'flex',
        justifyContent: 'space-around',
        borderTop: '1px solid #dddfe2',
        borderBottom: '1px solid #dddfe2',
        margin: '10px 12px 0',
        padding: '6px 0'
      }}>
        <button style={{ flex: 1, background: 'none', border: 'none', cursor: 'pointer', color: '#65676b', fontWeight: '600', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '6px' }}>
          👍 Like
        </button>
        <button style={{ flex: 1, background: 'none', border: 'none', cursor: 'pointer', color: '#65676b', fontWeight: '600', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '6px' }}>
          💬 Comment
        </button>
        <button style={{ flex: 1, background: 'none', border: 'none', cursor: 'pointer', color: '#65676b', fontWeight: '600', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '6px' }}>
          ↪ Share
        </button>
      </div>

      {/* Comment Input */}
      <div style={{ display: 'flex', alignItems: 'center', padding: '10px 12px', gap: '8px' }}>
        <img src={post.image} style={{ width: '32px', height: '32px', borderRadius: '50%' }} alt="" />
        <input
          placeholder="Write a comment and press enter"
          style={{
            flex: 1,
            background: '#f0f2f5',
            border: 'none',
            borderRadius: '20px',
            padding: '8px 12px',
            outline: 'none',
            fontSize: '14px'
          }}
        />
      </div>
    </div>
  );
}

export default PostCard;