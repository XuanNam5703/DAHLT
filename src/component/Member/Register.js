import { useState } from "react";
import axios from "axios";

function Register() {
  const [inputs, setInputs] = useState({
    name: "",
    email: "",
    password: "",
    phone: "",
    address: "",
    avatar: "",
    level: 0
  });

  const [file, setFile] = useState(null);

  const [errors, setErrors] = useState({});

  const handleChange = (e) => {
    setInputs({
      ...inputs,
      [e.target.name]: e.target.value
    });
  };


  const handleUserInputFile = (e) => {
    const files = e.target.files;
    if (!files || !files[0]) return;

    const fileUpload = files[0];

    setFile(fileUpload);

    const reader = new FileReader();
    reader.onload = (event) => {
      setInputs(prev => ({
        ...prev,
        avatar: event.target.result
      }));
    };
    reader.readAsDataURL(fileUpload);
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    let errorSubmit = {};
    let flag = true;

    if (!inputs.name) {
      flag = false;
      errorSubmit.name = "Vui lòng nhập name";
    }

    if (!inputs.email) {
      flag = false;
      errorSubmit.email = "Vui lòng nhập email";
    }

    if (!inputs.password) {
      flag = false;
      errorSubmit.password = "Vui lòng nhập password";
    }

    if (!inputs.phone) {
      flag = false;
      errorSubmit.phone = "Vui lòng nhập phone";
    }

    if (!inputs.address) {
      flag = false;
      errorSubmit.address = "Vui lòng nhập address";
    }
    if (!file) {
      flag = false;
      errorSubmit.avatar = "Vui lòng upload avatar";
    } else {
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

    if (!flag) {
      setErrors(errorSubmit);
      return;
    }
    const data = {
      name: inputs.name,
      email: inputs.email,
      password: inputs.password,
      phone: inputs.phone,
      address: inputs.address,
      avatar: inputs.avatar,
      level: 0
    };

    axios
      .post(
        "http://localhost/laravel8/laravel8/public/api/register",
        data
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
  };

  return (
    <div className="signup-form">
      <h2 className="title text-center">New User Signup!</h2>

      <form onSubmit={handleSubmit} encType="multipart/form-data">
        <input name="name" placeholder="Name" onChange={handleChange}  />
        {errors.name && <p>{errors.name}</p>}

        <input name="email" placeholder="Email" onChange={handleChange} />
        {errors.email && <p>{errors.email}</p>}

        <input type="password" name="password" placeholder="Password" onChange={handleChange} />
        {errors.password && <p>{errors.password}</p>}

        <input name="phone" placeholder="Phone" onChange={handleChange} />
        {errors.phone && <p>{errors.phone}</p>}

        <input name="address" placeholder="Address" onChange={handleChange} />
        {errors.address && <p>{errors.address}</p>}

        <input type="file" name="avatar" onChange={handleUserInputFile} />
        {errors.avatar && <p>{errors.avatar}</p>}

        <button type="submit">Signup</button>
      </form>
    </div>
  );
}

export default Register;
