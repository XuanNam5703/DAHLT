import { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
function Login() {
  const [inputs, setInputs] = useState({
    name: "",
    email: "",
    password:""
  });

  const [errors, setErrors] = useState({});

  const handleChange = (e) => {
    setInputs({
      ...inputs,
      [e.target.name]: e.target.value
    });
  };
  const navigate = useNavigate();

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
      errorSubmit.password = "password khong duoc de trong";
    }

    if (!flag) {
      setErrors(errorSubmit);
      return;
    }

    axios
  .post("http://localhost/laravel8/laravel8/public/api/login", {
    name: inputs.name,
    email: inputs.email,
    password: inputs.password
  })
  .then((res) => {
    console.log(res.data);

   if (res.data.errors) {
  setErrors(res.data.errors);
} else {
  alert("Đăng nhập thành công");
  localStorage.setItem("login", JSON.stringify(res.data));
  navigate('/');
}
  })
  .catch((err) => {
    console.log(err.response);
    setErrors({ login: "Login thất bại" });
  });

  };
  
  

  return (
    <div className="login-form">
      <h2>Login to your account</h2>

      <form onSubmit={handleSubmit}>
        <input
          type="text"
          name="name"
          placeholder="Name"
          onChange={handleChange}
        />
        {errors.name && <p className="text-danger">{errors.name}</p>}

        <input
          type="email"
          name="email"
          placeholder="Email Address"
          onChange={handleChange}
        />
        {errors.email && <p className="text-danger">{errors.email}</p>}

        <input
          type="password"
          name="password"
          placeholder="password Address"
          onChange={handleChange}
        />
        {errors.password && <p className="text-danger">{errors.password}</p>}

        {errors.login && <p className="text-danger">{errors.login}</p>}

        <button type="submit" className="btn btn-default">
          Login
        </button>
      </form>
    </div>
  );
}

export default Login;
