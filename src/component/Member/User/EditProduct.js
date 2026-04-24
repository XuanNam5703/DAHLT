import axios from "axios";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

function EditProduct() {

    const { id } = useParams();

    const [inputs, setInputs] = useState({
        name: "",
        price: "",
        category: "",
        brand: "",
        company: "",
        detail: "",
        status: 1,
        sale: 0
    });

    const [categoryList, setCategoryList] = useState([]);
    const [brandList, setBrandList] = useState([]);
    const [files, setFiles] = useState([]);
    const [errors, setErrors] = useState({});
    const [images, setImages] = useState([]); 
    const [avatarCheckBox, setAvatarCheckBox] = useState([]); 

    useEffect(() => {

        let user = JSON.parse(localStorage.getItem("login"));
        let token = user.token;

        let config = {
            headers: {
                Authorization: "Bearer " + token,
                Accept: "application/json"
            }
        };

        axios.get("http://localhost/laravel8/laravel8/public/api/category-brand")
            .then(res => {
                setCategoryList(res.data.category);
                setBrandList(res.data.brand);
            });

        axios.get("http://localhost/laravel8/laravel8/public/api/user/product/" + id, config)
            .then(res => {
                console.log(res.data)
                let data = res.data.data;

                setInputs({
                    name: data.name,
                    price: data.price,
                    category: data.id_category,
                    brand: data.id_brand,
                    company: data.company_profile,
                    detail: data.detail,
                    status: data.status,
                    sale: data.sale
                });

                let imageData = data.image;

            if (typeof imageData === "string") {
                try {
                    setImages(JSON.parse(imageData));
                } catch {
                    setImages(imageData.split(","));
                }
            } else {
                setImages(imageData);
            }
                        });

    }, [id]);

    const handleChange = (e) => {
        setInputs({
            ...inputs,
            [e.target.name]: e.target.value
        });
    };

    const handleFile = (e) => {
        setFiles(e.target.files);
    };

    const handleCheck = (e) => {
        let value = e.target.value;
        let checked = e.target.checked;

        if (checked) {
            setAvatarCheckBox(prev => [...prev, value]);
        } else {
            setAvatarCheckBox(prev => prev.filter(item => item !== value));
        }
    };
    
    const handleSubmit = (e) => {
        e.preventDefault();

        let errorSubmit = {};
        let flag = true;

        if (!inputs.name) {
            flag = false;
            errorSubmit.name = "Nhập name";
        }
        if (!inputs.price) {
            flag = false;
            errorSubmit.price = " nhập giá"
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
       if (inputs.status === 0 && !inputs.sale) {
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
        let total = images.length - avatarCheckBox.length + files.length;

        if (total > 3) {
            flag = false;
            errorSubmit.avatar = "Tổng ảnh <= 3";
        }

        if (!flag) {
            setErrors(errorSubmit);
            return;
        }
        
        let user = JSON.parse(localStorage.getItem("login"));
        let token = user.token;

        let config = {
            headers: {
                Authorization: "Bearer " + token,
                "Content-Type": "multipart/form-data",
                Accept: "application/json"
            }
        };

        let formData = new FormData();
        formData.append("name", inputs.name);
        formData.append("price", inputs.price);
        formData.append("category", inputs.category);
        formData.append("brand", inputs.brand);
        formData.append("company", inputs.company);
        formData.append("detail", inputs.detail);
        formData.append("status", inputs.status);
        formData.append("sale", inputs.status === "0" ? inputs.sale : 0);
       
        Object.values(files).forEach((f) => {
            formData.append("file[]", f);
        });

        avatarCheckBox.forEach((img) => {
            formData.append("avatarCheckBox[]", img);
        });

        axios.post(
            "http://localhost/laravel8/laravel8/public/api/user/product/update/" + id,
            formData,
            config
        )
        .then(res => {
            alert("Update thành công");
        })
        .catch(err => console.log(err.response));
    };
    
    let user = JSON.parse(localStorage.getItem("login"));
    let userId = user?.Auth?.id;

    return (
        <div className="col-sm-9">
            <div className="signup-form">
                <h2>Edit Product</h2>

                <form onSubmit={handleSubmit}>

                    <input name="name" value={inputs.name} onChange={handleChange} />
                    {errors.name && <p>{errors.name}</p>}
                    <input name="price" value={inputs.price} onChange={handleChange} />
                    {errors.price && <p>{errors.price}</p>}
                    <select name="category" value={inputs.category} onChange={handleChange}>
                        {categoryList.map(item => (
                            <option key={item.id} value={item.id}>
                                {item.category}
                            </option>
                        ))}
                    </select>
                        {errors.category && <p>{errors.category }</p>}
                    <select name="brand" value={inputs.brand} onChange={handleChange}>
                        {brandList.map(item => (
                            <option key={item.id} value={item.id}>
                                {item.brand}
                            </option>
                        ))}
                    </select>
                        {errors.brand && <p>{errors.brand }</p>}
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

                    <input name="company" value={inputs.company} onChange={handleChange} />

                    
                    <input type="file" multiple onChange={handleFile} />

                    
                    <ul>
                        {images.map((img, index) => (
                            <li key={index}>
                                <img
                                    src={
                                        "http://localhost/laravel8/laravel8/public/upload/product/" +
                                        userId + "/" + img
                                    }
                                    width="80"
                                />

                                <input
                                    type="checkbox"
                                    value={img}
                                    checked={avatarCheckBox.includes(img)}
                                    onChange={handleCheck}
                                />
                            </li>
                        ))}
                    </ul>

                    {errors.avatar && <p>{errors.avatar}</p>}

                    <textarea name="detail" value={inputs.detail} onChange={handleChange} />

                    <button type="submit">Update</button>

                </form>
            </div>
        </div>
    );
}

export default EditProduct;