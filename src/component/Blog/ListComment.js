function ListComment(props) {

  const { comment } = props

  const parentComment = comment.filter(item => item.id_comment === 0)

  function renderChildComment(parentId) {
    return comment
      .filter(item => item.id_comment === parentId)
      .map((child, index) => (
        <div key={index} style={{ marginLeft: "40px", marginTop: "10px" }}>
          
          <img
            src={"http://localhost/laravel8/laravel8/public/upload/user/avatar/" + child.image_user}
            width="40"
          />

          <b>{child.name_user}</b>
          <p>{child.comment}</p>

        </div>
      ))
  }

  return (
    <div>

      <h3>Danh sách bình luận</h3>

      {parentComment.map((item, index) => (
        <div key={index} style={{ marginBottom: "20px" }}>

          <img
            src={"http://localhost/laravel8/laravel8/public/upload/user/avatar/" + item.image_user}
            width="50"
          />

          <b>{item.name_user}</b>
          <p>{item.comment}</p>

    
          {renderChildComment(item.id)}

        </div>
      ))}

    </div>
  )
}

export default ListComment;