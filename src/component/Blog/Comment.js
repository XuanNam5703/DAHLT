import { useState } from "react";
import axios from "axios";
import ListComment from "./ListComment";

function Comment(props){

const [comment,setComment] = useState("")
const [listComment,setListComment] = useState([])

function handleChange(e){
setComment(e.target.value)
}

function handleSubmit(e){

e.preventDefault()

let loginData = localStorage.getItem("login")

if(!loginData){
alert("Vui lòng login")
return
}

if(!comment){
alert("Vui lòng nhập bình luận")
return
}

let userData = JSON.parse(loginData)
let accessToken = userData.token

let config = {
headers:{
Authorization: "Bearer "+accessToken,
"Content-Type":"application/x-www-form-urlencoded",
Accept:"application/json"
}
}

const formData = new FormData()

formData.append("id_blog",props.idBlog)
formData.append("id_user",userData.auth.id)
formData.append("id_comment",0)
formData.append("comment",comment)
formData.append("image_user",userData.auth.avatar)
formData.append("name_user",userData.auth.name)

axios.post(
"http://localhost/laravel8/laravel8/public/api/blog/comment/"+props.idBlog,
formData,
config
)

.then(res=>{

setListComment([...listComment,res.data.data])
setComment("")

})

}

return(

<div>

<h3>Leave a Comment</h3>

<form onSubmit={handleSubmit}>

<textarea
value={comment}
onChange={handleChange}
/>

<button type="submit">
Post Comment
</button>

</form>

<ListComment listComment={listComment}/>

</div>

)

}

export default Comment