export const getpost = async () => {
  const res = await fetch('https://jsonplaceholder.typicode.com/posts?_limit=10');
  return res.json();
};

export const getPhotos = async () => {
  const res = await fetch('https://jsonplaceholder.typicode.com/photos?_limit=10');
  return res.json();
};

export const getAlbums = async () => {
  const res = await fetch('https://jsonplaceholder.typicode.com/albums?_limit=12');
  return res.json();
};

export const getAlbumPhotos = async () => {
  const res = await fetch('https://jsonplaceholder.typicode.com/photos?_limit=50');
  return res.json();
};

export const getComments = async (postId) => {
  const res = await fetch(`https://jsonplaceholder.typicode.com/posts/${postId}/comments`);
  return res.json();
};

// Food Recalls API - jo tumne bheji thi
export const getFoodRecalls = async () => {
  try {
    const res = await fetch('/food-api/api/recalls-latest.json');
    const data = await res.json();
    // API kabhi array deti hai, kabhi object me recalls key me
    const list = Array.isArray(data) ? data : data.recalls || data.data || data.results || [];
    console.log("FOOD API DATA:", list);
    return list;
  } catch (e) {
    console.error("Food API Error:", e);
    return [];
  }
}; 