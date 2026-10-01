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