import blogService from '../services/blogs';

const reducer = (state = [], action) => {
  switch (action.type) {
    case 'INIT':
      return action.data;
    case 'ADD_BLOG':
      return [...state, action.data];
    default:
      return state;
  }
};

export const initBlogs = () => {
  return async (dispatch) => {
    const blogs = await blogService.getAll();
    dispatch({
      type: 'INIT',
      data: blogs,
    });
  };
};

export const addBlog = (blog) => {
  return async (dispatch) => {
    const savedBlog = await blogService.create(blog);
    dispatch({
      type: 'ADD_BLOG',
      data: savedBlog,
    });
  };
};

export default reducer;
