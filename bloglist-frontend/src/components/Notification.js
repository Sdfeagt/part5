const Notification = ({ message }) => {
    if (message === null) {
      return null
    }
  
    return (
      <div className="completedoperation">
        {message}
      </div>
    )
  }
  
  export default Notification