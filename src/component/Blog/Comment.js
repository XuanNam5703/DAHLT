import axios from "axios";
import { useState } from "react";

function Comment(props){

    const [text,setText] = useState("")

    function handleChange(e){
        setText(e.target.value)
    }

    function handleSubmit(e){

        e.preventDefault()

            let login = localStorage.getItem("login")

        if(!login){
                alert("Vui lòng login")
                return
                }

        if(!text){
                alert("Vui lòng nhập bình luận")
                return
                }

            let userData = JSON.parse(login)

            let accessToken = userData.token

        if(!accessToken){
                alert("Token không tồn tại")
                return
                }

            let config = {
            headers:{
            Authorization: "Bearer " + accessToken,
            Accept: "application/json"
            }
        }

            let url = "http://localhost/laravel8/laravel8/public/api/blog/comment/" + props.idBlog

            const formData = new FormData()


            formData.append("id_blog", props.idBlog)
            formData.append("id_user", userData.Auth.id)
            formData.append("id_comment", 0)
            formData.append("comment", text)
            formData.append("image_user", userData.Auth.avatar)
            formData.append("name_user", userData.Auth.name)

                    axios.post(url,formData,config)

                    .then(res => {

                    if(res.data.data){

                    let newComment = res.data.data

                    props.setComment([...props.comment,newComment])

                    setText("")

                    alert("Bình luận thành công")

                    }

                })
            }

                return(

                    <div>

                        <h4>Leave a Comment</h4>

                            <form onSubmit={handleSubmit}>

                                <textarea value={text} onChange={handleChange}/>

                                <br/>

                        <button type="submit">Post Comment </button>

                            </form>

                    </div>

                )

}

export default Comment;