import blogService from '../services/blogs';
import sortAsc from '../utils/arrayHelper';

const reducer = (state = [], action) => {
  switch (action.type) {
    case 'INIT':
      return sortAsc(action.data);
    case 'ADD_BLOG':
      return [...state, action.data];
    case 'REMOVE_BLOG': {
      const blogToRemove = action.data;
      const newBlogs = state.filter((blog) => blog.id !== blogToRemove.id);
      return sortAsc(newBlogs);
    }
    case 'UPDATE_BLOG': {
      const updatedBlog = action.data;
      const newBlogs = state.filter((blog) => blog.id !== updatedBlog.id);
      return sortAsc([...newBlogs, updatedBlog]);
    }
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

export const removeBlog = (blog) => {
  return async (dispatch) => {
    await blogService.remove(blog);
    dispatch({
      type: 'REMOVE_BLOG',
      data: blog,
    });
  };
};

export const likeBlog = (blog) => {
  return async (dispatch) => {
    const likedBlog = await blogService.update(blog);
    dispatch({
      type: 'UPDATE_BLOG',
      data: likedBlog,
    });
  };
};

export const commentBlog = (blog) => {
  return async (dispatch) => {
    const response = await blogService.comment(blog);
    dispatch({
      type: 'UPDATE_BLOG',
      data: response,
    });
  };
};

export default reducer;
