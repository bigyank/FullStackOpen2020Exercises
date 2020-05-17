const sortAsc = (blog) => {
  return blog.sort((a, b) => a.likes < b.likes);
};

export default { sortAsc };
