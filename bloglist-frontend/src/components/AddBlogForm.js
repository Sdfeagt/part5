const AddBlogForm = ({ addBlog, title, handleTitleChange, author, handleAuthorChange, url, handleUrlChange, likes, handleLikesChange }) => (
  <form onSubmit={addBlog}>
    <p>Add a blog</p>
    <div>
          Title
      <input
        type="text"
        value={title}
        name="Title"
        id="Title"
        onChange={handleTitleChange}
      />
    </div>
    <div>
          Author
      <input
        type="text"
        value={author}
        name="Author"
        id="Author"
        onChange={handleAuthorChange}
      />
    </div>
    <div>
          Url
      <input
        type="text"
        value={url}
        name="Url"
        id="Url"
        onChange={handleUrlChange}
      />
    </div>
    <div>
          Likes
      <input
        type="number"
        value={likes}
        name="Likes"
        id="Likes"
        onChange={handleLikesChange}
      />
    </div>
    <button type="submit">Add Blog</button>

  </form>
)

export default AddBlogForm