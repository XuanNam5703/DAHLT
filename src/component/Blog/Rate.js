import { useState, useEffect } from "react";
import axios from "axios";
import { Rating } from "react-simple-star-rating";

function Rate(props) {
  const [rating, setRating] = useState(0);
  const [avg, setAvg] = useState(0);

 
  const processData = (data, userId) => {
    const list = Object.values(data);

    
    const valid = list.filter(item => item.rate > 0);

  
    const avgRate =
      valid.length
        ? valid.reduce((sum, item) => sum + item.rate, 0) / valid.length
        : 0;

    
    const last = list.findLast(
      item => item.user_id == userId && item.blog_id == props.idBlog
    );

    return {
      avg: avgRate,
      userRate: last ? last.rate : 0
    };
  };

  
  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await axios.get(
          "http://localhost/laravel8/laravel8/public/api/blog/rate/" + props.idBlog
        );

        const login = localStorage.getItem("login");
        const userData = login ? JSON.parse(login) : null;
        const userId = userData?.Auth?.id;

        const result = processData(res.data.data, userId);

        setAvg(result.avg);
        setRating(result.userRate);
      } catch (err) {
        console.log(err);
      }
    };

    fetchData();
  }, [props.idBlog]);

  
  const handleRating = async (rate) => {
    const login = localStorage.getItem("login");

    if (!login) return alert("Vui lòng login");

    const userData = JSON.parse(login);
    const accessToken = userData.token;

    if (!accessToken) return alert("Token không tồn tại");
    if (rate === 0) return alert("Vui lòng chọn sao");

    const config = {
      headers: {
        Authorization: "Bearer " + accessToken,
        Accept: "application/json"
      }
    };

    const formData = new FormData();
    formData.append("user_id", userData.Auth.id);
    formData.append("blog_id", props.idBlog);
    formData.append("rate", rate);

    try {
      await axios.post(
        "http://localhost/laravel8/laravel8/public/api/blog/rate/" + props.idBlog,
        formData,
        config
      );

      alert("Đánh giá thành công");

      
      const res = await axios.get(
        "http://localhost/laravel8/laravel8/public/api/blog/rate/" + props.idBlog
      );

      const result = processData(res.data.data, userData.Auth.id);

      setAvg(result.avg);
      setRating(result.userRate);

    } catch (err) {
      console.log(err.response);
      alert("Lỗi đánh giá");
    }
  };

  return (
    <div>
      <h4>Đánh giá</h4>

      <Rating
        onClick={handleRating}
        initialValue={rating}
        size={35}
        transition
        fillColor="gold"
        emptyColor="gray"
      />

      <p>⭐ Trung bình: {avg ? avg.toFixed(1) : 0}</p>
    </div>
  );
}

export default Rate;