import axios from "axios";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";

function List(){

    const [blogs, setBlogs] = useState([]);

    useEffect(()=>{

        axios.get("http://localhost/laravel8/laravel8/public/api/blog")
        .then(res => {
            console.log(res.data);
            setBlogs(res.data.blog.data);
        })
        .catch(err => {
            console.log(err);
        });

    },[]);

    return(
        <div className="blog-post-area">
            <h2 className="title text-center">Latest From our Blog</h2>

            {blogs.map((item,key)=>(

                <div className="single-blog-post" key={key}>

                    <h3>{item.title}</h3>

                    <div className="post-meta">
                        <ul>
                            <li><i className="fa fa-user"></i> {item.author}</li>
                            <li><i className="fa fa-clock-o"></i> {item.created_at}</li>
                        </ul>
                    </div>

                    <Link to={"/blog2/detail2/" + item.id}>

                        <img 
                        src={"http://localhost/laravel8/laravel8/public/upload/Blog/image/" + item.image} 
                        alt="" 
                        />

                    </Link>

                    <p>{item.description}</p>

                    <Link 
                        className="btn btn-primary" 
                        to={"/blog/detail/" + item.id}
                    >
                        Read More
                    </Link>

                </div>

            ))}

        </div>
    )
}

export default List;