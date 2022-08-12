const Blog = ({...blog}) => (
  <div>
    <li className="blog">
      
      Title: "{blog.title}". Author: {blog.author}.

      </li>
  </div>  
)

export default Blog