import { Link, useLocation } from "react-router-dom";

const menu = [
  { label: "News Feed", icon: "🏠", path: "/news-feed" },
  { label: "Albums", icon: "🖼️", path: "/albums" },
  { label: "Watch", icon: "▶️", path: "/watch" },
  { label: "Reels", icon: "🎞️", path: "/reels" },
  { label: "Saved Posts", icon: "🔖", path: "/saved" },
  { label: "Memories", icon: "🕰️", path: "/memories" },
  { label: "Pokes", icon: "👉", path: "/pokes" },
  { label: "My Groups", icon: "👥", path: "/groups" },
  { label: "My Pages", icon: "🚩", path: "/pages" },
  { label: "Blog", icon: "📰", path: "/blog" },
  { label: "Market", icon: "🏪", path: "/market" },
  { label: "Directory", icon: "🧩", path: "/directory" },
  { label: "Events", icon: "📅", path: "/events" },
  { label: "Games", icon: "🎮", path: "/games" },
  { label: "Movies", icon: "🎬", path: "/movies" },
  { label: "Jobs", icon: "💼", path: "/jobs" },
  { label: "Offers", icon: "🏷️", path: "/offers" },
  { label: "Find friends nearby", icon: "🧑‍🤝‍🧑", path: "/friends-nearby" },
  { label: "Common Things", icon: "🧩", path: "/common" },
  { label: "Fundraising", icon: "💝", path: "/fundraising" },
];

function LeftSideBar() {
  const location = useLocation();

  return (
    <div style={{ padding: '15px 10px' }}>
      <div style={{ display: 'flex', flexDirection: 'column', gap: '2px' }}>
        {menu.map((item) => {
          const isActive = location.pathname === item.path;
          return (
            <Link
              key={item.label}
              to={item.path}
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: '12px',
                padding: '8px 10px',
                borderRadius: '8px',
                textDecoration: 'none',
                color: '#050505',
                background: isActive ? '#e7f3ff' : 'transparent',
                fontWeight: isActive ? '600' : '500',
                fontSize: '15px'
              }}
            >
              <span style={{ fontSize: '20px', width: '28px', textAlign: 'center' }}>{item.icon}</span>
              <span>{item.label}</span>
            </Link>
          );
        })}
      </div>
    </div>
  );
}

export default LeftSideBar;