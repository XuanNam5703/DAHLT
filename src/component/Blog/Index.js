import axios from "axios";
import { useState, useEffect } from "react";
import { Link } from "react-router-dom";

function Index(){

    const [getItem, setItem] = useState([]);

    useEffect(()=>{

        axios.get('http://localhost/laravel8/laravel8/public/api/blog')

        .then(res=>{
            console.log(res.data);
            setItem(res.data.blog)
        })

        .catch(function (error){
            console.log(error)
        })

    },[]);

    function fetchData(){

        if(Object.keys(getItem).length >0){

            return getItem.data.map((value, key)=>{

                return (

                    <div className="single-blog-post" key={key}>

                        <h3>{value.title}</h3>

                        <div className="post-meta">

                            <ul>

                                <li><i className="fa fa-user"/> {value.author}</li>

                                <li><i className="fa fa-clock-o"/> {value.created_at}</li>

                            </ul>

                        </div>

                        <Link to={"/blog2/detail2/" + value.id}>

                            <img 
                            src={"http://localhost/laravel8/laravel8/public/upload/Blog/image/" + value.image} 
                            alt="" 
                            />

                        </Link>

                        <p>{value.description}</p>

                        <Link 
                        className="btn btn-primary" 
                        to={"/blog/detail/" + value.id}
                        >
                            Read More
                        </Link>

                    </div>

                )

            })

        }

    }

    return (

        <div className="col-sm-9">

            <div className="blog-post-erea">

                <h2 className="title text-center">Latest From our Blog</h2>

                {fetchData()}

            </div>

        </div>

    )

}

export default Index;