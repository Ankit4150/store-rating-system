import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import API from "../services/api";

import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";

import "./auth.css";

function Login() {
  const navigate = useNavigate();
  const schema = yup.object().shape({
    email: yup
      .string()
      .email("Invalid email format")
      .required("Email is required"),

    password: yup
      .string()
      .min(8, "Password must be at least 8 characters")
      .max(16, "Password max 16 characters")
      .required("Password is required"),
  });
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(schema),
  });
  const onSubmit = async (data) => {
    try {
      const res = await API.post("/auth/login", data);

      localStorage.setItem("token", res.data.token);
      localStorage.setItem("user", JSON.stringify(res.data.user));

      toast.success("Login Successful");
      const user = res.data.user;

      if (user.role === "ADMIN") {
        navigate("/admin");
      } else if (user.role === "USER") {
        navigate("/user");
      } else if (user.role === "STORE_OWNER") {
        navigate("/store-owner");
      }
    } catch (error) {
      toast.error(error.response?.data?.message || "Login failed");
    }
  };
  return (
    <div className="container">
      <form onSubmit={handleSubmit(onSubmit)} className="form">
        <h2>Login</h2>
        <input
          placeholder="Email"
          {...register("email")}
          style={{
            border: errors.email ? "2px solid red" : "1px solid #ccc",
          }}
        />
        <p className="error-text">{errors.email?.message}</p>
        <input
          type="password"
          placeholder="Password"
          {...register("password")}
          style={{
            border: errors.password ? "2px solid red" : "1px solid #ccc",
          }}
        />
        <p className="error-text">{errors.password?.message}</p>
        <button type="submit">Login</button>
        <p style={{ marginTop: "15px", textAlign: "center" }}>
          Don’t have an account?
        </p>

        <button
          type="button"
          onClick={() => navigate("/register")}
          style={{
            background: "transparent",
            color: "#007bff",
            border: "none",
            cursor: "pointer",
            fontWeight: "bold",
            marginTop: "5px",
          }}
        >
          Register Here
        </button>
      </form>
    </div>
  );
}
export default Login;