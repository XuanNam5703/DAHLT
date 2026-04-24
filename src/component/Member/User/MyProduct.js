import axios from "axios";
import { useEffect, useState } from "react";
import EditProduct from "./EditProduct";
function MyProduct() {

    const [products, setProducts] = useState([]);

    useEffect(() => {
        fetchProduct();

    }, []);
    const fetchProduct=()=>{
        let user = JSON.parse(localStorage.getItem("login"));

        if (!user) {
            alert("Vui lòng login");
            return;
        }

        let token = user.token;

        let config = {
            headers: {
                Authorization: "Bearer " + token,
                Accept: "application/json"
            }
        };
        
        axios
            .get("http://localhost/laravel8/laravel8/public/api/user/my-product" , config)
            .then(res => {
                // console.log("API:",res.data)
                let data = res.data.data;
                setProducts(Object.values(data));
            })
            .catch(err => console.log(err.response));
    }
    const handleDelete=(id)=>{
        let confirmDelete = window.confirm("bạn có muốn xóa?");
        if(!confirmDelete)return;
        let user=JSON.parse(localStorage.getItem("login"))
        let token= user.token
        let config={
            headers:{
                Authorization: "Bearer " + token,
                Accept: "application/json"
            }
        };
        axios.get("http://localhost/laravel8/laravel8/public/api/user/product/delete/" + id , config)
        .then(res=>{
         
            alert("Xóa thành công");
            fetchProduct();
           
        })
          .catch(err => console.log(err.response));
    };

   
    let user = JSON.parse(localStorage.getItem("login"));
    let userId = user?.Auth?.id;

    return (
        <div className="col-sm-9">
            <div className="table-responsive cart_info">
                <table className="table table-condensed">
                    <thead>
                        <tr className="cart_menu">
                            <td>Id</td> 
                            <td className="description">Name</td>
                            <td className="image">Image</td>
                            <td className="price">Price</td>
                            <td className="total">Action</td>
                        </tr>
                    </thead>

                    <tbody>
                        {products.map((value, key) => {

                            let images = value.image ? JSON.parse(value.image) : [];
                            let firstImage = images[0];

                            return (
                                <tr key={key}>
                                     <td>{value.id}</td>
                                     <td className="cart_description">
                                        <h4>{value.name}</h4>
                                    </td>
                                    <td className="cart_product">
                                        {firstImage && (
                                            <img
                                                src={
                                                    "http://localhost/laravel8/laravel8/public/upload/product/" +
                                                    userId + "/" + firstImage
                                                }
                                                width="80"
                                                alt=""
                                            />
                                        )}
                                    </td>

                                    

                                    <td className="cart_price">
                                        <p>${value.price}</p>
                                    </td>

                                    <td className="cart_total">
                                        <a href="#">Edit</a>
                                         |{" "}
                                        <a href="#"
                                        
                                            onClick={(e) => {
                                                e.preventDefault();
                                                handleDelete(value.id);
                                            }}>Delete</a>
                                    </td>
                                </tr>
                            );
                        })}
                    </tbody>

                </table>
            </div>
        </div>
    );
}

export default MyProduct;