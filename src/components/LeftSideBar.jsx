import { useNavigate, useLocation } from 'react-router-dom';

export default function LeftSidebar(){
  const navigate = useNavigate();
  const loc = useLocation();
  const menu = [
    'News Feed',
    'Albums',
    'Company',
    'Food Recalls',
    'Watch',
    'Reels',
    'Saved Posts',
    'My Groups',
    'My Pages',
    'Blog',
    'Market',
    'Directory',
    'Events',
    'Games',
    'Movies',
    'Jobs'
  ];
  
  return (
    <div style={{width:'250px',background:'#fff',padding:'10px',position:'sticky', top:'0', height:'100vh', overflowY:'auto', borderRight:'1px solid #ddd'}}>
      {menu.map(name=>{
        const path = '/' + name.toLowerCase().replace(/\s+/g,'-');
        const isActive = loc.pathname === path || (name === 'News Feed' && loc.pathname === '/');
        return (
          <div 
            key={name} 
            onClick={()=>navigate(path)} 
            style={{
              padding:'10px',cursor:'pointer',
              background:isActive?'#e4e6eb':'#fff',
              borderRadius:'6px',marginBottom:'4px',
              fontWeight: isActive ? '600' : '400'
            }}
          >
            {name}
          </div>
        )
      })}
    </div>
  )
}