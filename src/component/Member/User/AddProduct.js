import axios from "axios";
import { useState } from "react";
import { useEffect } from "react";
function AddProduct (){
    const[inputs, setInputs] = useState({
        name: "",
        price: "",
        category: "",
        brand: "",
        company: "",
        detail: "",
        status: 1,
        sale: 0
    
    })
        const [categoryList, setCategoryList] = useState([]);
        const [brandList, setBrandList] = useState([]); 
    useEffect(() => {
  axios.get("http://localhost/laravel8/laravel8/public/api/category-brand")
    .then(res =>{
       
                setCategoryList(res.data.category);
                setBrandList(res.data.brand);
    });

}, []);
        
    const [files, setFiles] = useState([]); 
    const [errors, setErrors] = useState({})
    const handleChange = (e) =>{
        setInputs({
            ...inputs,
            [e.target.name] : e.target.value
        })
    };
    const handleFile =(e) =>{
        setFiles(e.target.files);
    };
    const handleSubmit =(e) =>{
        e.preventDefault();
        let errorSubmit ={};
        let flag = true;
        if(!inputs.name){
            flag = false;
            errorSubmit.name="vui lòng nhập name"
        }
        if(!inputs.price){
            flag = false;
            errorSubmit.price="vui long nhập price"
        }
        if(!inputs.category){
            flag = false;
            errorSubmit.category="vui long chọn category"
        }
        if(!inputs.brand){
            flag = false;
            errorSubmit.brand="vui long chon brand"
        }
        if(inputs.status === "" || inputs.status === null){
            flag = false;
            errorSubmit.status="vui lòng chọn sale and new"
        }
      if (inputs.status === "0" && !inputs.sale) {
            flag = false;
            errorSubmit.sale = "vui lòng nhập % sale";
        }
        if(!inputs.company){
            flag = false;
            errorSubmit.company="vui lòng nhập company"
        }
        if(!inputs.detail){
            flag = false;
            errorSubmit.detail="vui long nhập mô tả"
        }
        if(!files || files.length===0){
            flag= false;
            errorSubmit.avatar="vui lòng upload ít nhất 1 ảnh"
        }
        else{
            if(files.length>3){
                flag=false;
                errorSubmit.avatar="chỉ upload tối đa 3 ảnh"
            }
        }
        const allowTypes = ["image/jpeg", "image/png", "image/jpg"];
            Object.values(files).forEach((f) => {
                if (!allowTypes.includes(f.type)) {
                    flag = false;
                    errorSubmit.avatar = "Định dạng ảnh không hợp lệ";
                }
                if (f.size > 1024 * 1024) {
                    flag = false;
                    errorSubmit.avatar = "Mỗi ảnh phải nhỏ hơn 1MB";
                }
            });
    if (!flag) {
      setErrors(errorSubmit);
      return;
    }
    let data = JSON.parse(localStorage.getItem("login"));
        let token = data.token;
        console.log(token)

    let config ={
        headers:{
            'Authorization': 'Bearer ' + token,
            'Content-Type': 'multipart/form-data',
            'Accept': 'application/json'
            
        }
           
    };
   
    let formData = new FormData();
    formData.append("name",inputs.name);
    formData.append("price",inputs.price);
    formData.append("category", Number(inputs.category));
    formData.append("brand", Number(inputs.brand));
    formData.append("company",inputs.company);
    formData.append("detail", inputs.detail);
    formData.append("status", inputs.status);
    formData.append("sale", inputs.sale);

       Object.values(files).forEach((f) => {
            formData.append("file[]", f);
        });
    axios.post(
  "http://localhost/laravel8/laravel8/public/api/user/product/add",
  formData,
  config
)
.then(res => {
        if (res.data.errors) {
      setErrors(res.data.errors);
      
    }
        
        alert("Thành công");
        setErrors({});
      })
      .catch(err => {
        console.log(err.response);
      });
        
    }
 
    
    return(
        <div className="col-sm-9">
            <div className="blog-post-area">
            <h2 className="title text-center">Create Product</h2>
                <div className="signup-form">
                    <form onSubmit={handleSubmit}>
                    <input name="name" placeholder="Name" onChange={handleChange}/>
                    {errors.name && <p>{errors.name}</p>}
                    <input name="price" placeholder="Price" onChange={handleChange}/>
                    {errors.price && <p>{errors.price}</p>}

                    <select name="category" onChange={handleChange}>
                        <option value="">please choose category</option>
                        {categoryList.map(item => (
                            <option key={item.id} value={item.id}>
                            {item.category}
                            </option>
                        ))}
                        </select>
                        {errors.category && <p>{errors.category }</p>}


                        <select name="brand" onChange={handleChange}>
                        <option value="">please choose brand</option>
                        {brandList.map(item => (
                            <option key={item.id} value={item.id}>
                            {item.brand}
                            </option>
                        ))}
                        </select>
                        {errors.brand && <p>{errors.brand}</p>}

                     <select name="status" onChange={handleChange} value={inputs.status} >
                        <option value="1">new</option>
                        <option value="0">sale</option>
                    </select>
                    {errors.status && <p>{errors.status}</p>}  

                    {inputs.status === "0" && (
                            <div>
                                <input type="text" name="sale" placeholder="Sale %" value={inputs.sale} onChange={handleChange} />
                                {errors.sale && <p style={{color: 'red'}}>{errors.sale}</p>}
                            </div>
                        )}
                               

                     <input type="text" name="company" placeholder="Company" onChange={handleChange}/>
                     {errors.company && <p>{errors.company}</p>}

                    <input type="file" id="files" name="avatar" multiple onChange={handleFile}/>
                    {errors.avatar && <p>{errors.avatar}</p>}
                        
                    <textarea name="detail" placeholder="Detail" onChange={handleChange}></textarea>
                       {errors.detail && <p>{errors.detail}</p>}

                    <button type="submit" className="btn btn-default">
                        Signup
                    </button>
                </form>
                </div>
                
        </div>
        </div>
        
    );
}
export default AddProduct;