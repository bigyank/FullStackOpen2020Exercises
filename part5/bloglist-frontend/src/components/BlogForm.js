import React from "react";
import "../Form.css";

const BlogForm = ({
  newBlog: { title, author, url },
  handleBlogSubmit,
  setNewBlog,
}) => {
  return (
    <form onSubmit={handleBlogSubmit}>
      <section>
        Title
        <input
          type="text"
          value={title}
          name={"title"}
          onChange={({ target }) =>
            setNewBlog({ author, url, title: target.value })
          }
        />
      </section>
      author
      <input
        type="text"
        value={author}
        name={"author"}
        onChange={({ target }) =>
          setNewBlog({ title, url, author: target.value })
        }
      />
      <section>
        URL
        <input
          type="text"
          value={url}
          name={"url"}
          onChange={({ target }) =>
            setNewBlog({ title, author, url: target.value })
          }
        />
      </section>
      <button>Add</button>
    </form>
  );
};

export default BlogForm;
