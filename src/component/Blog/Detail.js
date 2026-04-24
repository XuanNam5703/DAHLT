import axios from "axios";
import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import Comment from "./Comment";
import ListComment from "./ListComment";
import Rate from "./Rate";


            function Detail(){

            const params = useParams();

            const [data, setData] = useState({});
            const [comment, setComment] = useState([]);
            
                    useEffect(()=>{

                    axios.get("http://localhost/laravel8/laravel8/public/api/blog/detail/" + params.id)

                    .then(res => {

                    setData(res.data.data);
                    setComment(res.data.data.comment);
                    

                    })

                        .catch(err => {
                        console.log(err);
                        })

                        },[params.id]);

        return(

                    <div className="blog-post-area">

                        <h2>{data.title}</h2>

                            <img
                            src={"http://localhost/laravel8/laravel8/public/upload/Blog/image/" + data.image}
                            alt=""
                            />

                            <p>{data.description}</p>

                           <Rate idBlog={params.id} />
                          

                            <h3>Comments</h3>

                                <Comment idBlog={params.id} setComment={setComment} comment={comment}/>

                                <ListComment comment={comment} />

        </div>

        )

}

export default Detail;