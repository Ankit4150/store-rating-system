import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import API from "../services/api";

import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";

import "./auth.css";

function Register() {
  const navigate = useNavigate();

  const schema = yup.object().shape({
    name: yup
      .string()
      .min(20, "Name must be at least 20 characters")
      .max(60, "Name must be at most 60 characters")
      .required("Name is required"),

    email: yup
      .string()
      .email("Invalid email format")
      .required("Email is required"),

    password: yup
      .string()
      .min(8, "Min 8 characters")
      .max(16, "Max 16 characters")
      .matches(/[A-Z]/, "Must contain 1 uppercase letter")
      .matches(/[\W_]/, "Must contain 1 special character")
      .required("Password is required"),

    address: yup
      .string()
      .max(400, "Address max 400 characters")
      .required("Address is required"),
  });

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm({
    resolver: yupResolver(schema),
  });

  const onSubmit = async (data) => {
    try {
      const res = await API.post("/auth/register", data);

      toast.success(res.data.message || "Registered Successfully");

      reset();

      setTimeout(() => {
        navigate("/");
      }, 800);
    } catch (error) {
      toast.error(error.response?.data?.message || "Registration failed");
    }
  };

  const handleCancel = () => {
    toast.info("Registration cancelled");

    setTimeout(() => {
      navigate("/");
    }, 500);
  };

  return (
    <div className="container">
      <form onSubmit={handleSubmit(onSubmit)} className="form">
        <h2>Register</h2>

        <input
          placeholder="Name"
          {...register("name")}
          style={{
            border: errors.name ? "2px solid red" : "1px solid #ccc",
          }}
        />
        <p className="error-text">{errors.name?.message}</p>
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
        <textarea
          placeholder="Address"
          {...register("address")}
          style={{
            border: errors.address ? "2px solid red" : "1px solid #ccc",
          }}
        />
        <p className="error-text">{errors.address?.message}</p>

        <button type="submit">Register</button>

        <button
          type="button"
          onClick={handleCancel}
          style={{
            marginTop: "10px",
            background: "#ccc",
            color: "#000",
            border: "none",
            padding: "10px",
            cursor: "pointer",
            width: "100%",
            borderRadius: "5px",
          }}
        >
          Cancel
        </button>
      </form>
    </div>
  );
}

export default Register;