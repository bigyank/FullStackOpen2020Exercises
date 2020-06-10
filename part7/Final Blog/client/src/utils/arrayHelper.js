const sortAsc = (blogs) => {
  const blogsCopy = [...blogs];
  return blogsCopy.sort((a, b) => a.likes < b.likes);
};

export default sortAsc;
