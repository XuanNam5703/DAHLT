import { useEffect, useState } from "react";
import axios from "axios";
function Update(){
    const [errors, setErrors] = useState({});
    const [user, setUser] = useState({
        name:"",
        email:"",
        address:"",
        phone:"",
        password:"",
        avatar:""
    });
    const[file,setFile]= useState(null)
    useEffect(()=>{
        let userData = localStorage.getItem ("login")
        
        if(userData){
            userData= JSON.parse(userData);
           
            
                setUser({
                    name: userData.Auth.name,
                    email: userData.Auth.email,
                    address: userData.Auth.address,
                    phone: userData.Auth.phone,
                    password: "",
                    avatar: userData.Auth.avatar
                });
                
        };
      
    },[]);
    const handleChange =(e) =>{
        setUser({
            ...user,
            [e.target.name] : e.target.value
        });
    };
    const handleFile=(e)=>{
        const fileUpload = e.target.files[0];
        if(!fileUpload)return;
        
        setFile(fileUpload);

        const reader = new FileReader();
        reader.onload = (event) =>{
            setUser(prev =>({
                ...prev,
                avatar: event.target.result
            }))
        };
        reader.readAsDataURL(fileUpload);
    
    
    }
    

    const handleSubmit =(e)=>{
        e.preventDefault();
        
        let errorSubmit = {};
        let flag= true;

        if(!user.name){
            flag= false;
            errorSubmit.name= "nhap name"
        }
        if(!user.phone){
            flag= false;
            errorSubmit.phone="nhap phone"
        }
        if(!user.address){
            flag= false;
            errorSubmit.address="nhap dia chi"
        }
       if (file) {
            const allowTypes = ["image/jpeg", "image/png", "image/jpg"];

            if (!allowTypes.includes(file.type)) {
                flag = false;
                errorSubmit.avatar = "Avatar phải là hình ảnh";
            }

            if (file.size > 1024 * 1024) {
                flag = false;
                errorSubmit.avatar = "Avatar phải nhỏ hơn 1MB";
            }
            }
    if(!flag){
        setErrors(errorSubmit);
        return;
    }
    const formData = new FormData();

formData.append("name", user.name);
formData.append("email", user.email);
formData.append("password", user.password);
formData.append("phone", user.phone);
formData.append("address", user.address);
if(file){
  formData.append("avatar", file);
}
        let data = JSON.parse(localStorage.getItem("appState"));

axios.post(
  "http://localhost/laravel8/laravel8/public/api/user/update/" + data.Auth.id,
  formData,
  {
    headers: {
      Authorization: "Bearer " + data.token,
      "Content-Type": "multipart/form-data"
    }
  }
)
        .then(res => {
        if (res.data.errors) {
      setErrors(res.data.errors);
      
    }
        console.log(res.data);
        alert("Thành công");
      })
      .catch(err => {
        console.log(err.response);
      });
        }
    
    return(
        <div class="col-sm-9">
            <div  className="signup-form" >
            <h2 className="title text-center">Update User</h2>
            <form onSubmit={handleSubmit} encType="multipart/form-data">
                    <input name="name" value={user.name} onChange={handleChange}/>
                    {errors.name && <p>{errors.name}</p>}

                    <input name="email" value={user.email} readOnly />
                    {errors.email && <p>{errors.email}</p>}

                    <input type="password" name="password" onChange={handleChange}/>
                    {errors.password && <p>{errors.password}</p>}

                    <input name="phone" value={user.phone} onChange={handleChange}/>
                    {errors.phone && <p>{errors.phone}</p>}

                    <input name="address" value={user.address} onChange={handleChange}/>
                    {errors.address && <p>{errors.address}</p>}

                   <input type="file" name="avatar" onChange={handleFile} />
                    {errors.avatar && <p>{errors.avatar}</p>}

                    <button type="submit">Update</button>
            </form>
        </div>
        </div>
        
    )
}
export default Update;