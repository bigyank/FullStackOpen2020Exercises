const dummy = (blogs) => {
  return 1;
};

const totalLikes = (blogs) => {
  return blogs.reduce((total, blog) => (total += blog.likes), 0);
};

const favouriteBlog = (blogs) => {
  const maxLike = Math.max(...blogs.map((blog) => blog.likes));
  return blogs.find((blog) => blog.likes === maxLike);
};

module.exports = {
  dummy,
  totalLikes,
  favouriteBlog,
};
