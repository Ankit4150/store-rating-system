import { useState } from "react";
import { toast } from "react-toastify";
import API from "../services/api";
import "./auth.css";

function UpdatePassword() {
  const [form, setForm] = useState({
    oldPassword: "",
    newPassword: "",
  });

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      
      if (!form.oldPassword || !form.newPassword) {
        return toast.error("All fields are required");
      }

      
      const passwordRegex = /^(?=.*[A-Z])(?=.*[\W_]).{8,16}$/;

      if (!passwordRegex.test(form.newPassword)) {
        return toast.error(
          "Password must be 8-16 chars with uppercase & special character"
        );
      }

      const res = await API.put(
        "/auth/update-password",
        form
      );

      toast.success(res.data.message || "Password updated successfully");

      setForm({
        oldPassword: "",
        newPassword: "",
      });

    } catch (error) {
      toast.error(
        error.response?.data?.message || "Update failed"
      );
    }
  };

  return (
    <div className="container">
      <form onSubmit={handleSubmit} className="form">
        <h2>Update Password</h2>

        <input
          type="password"
          placeholder="Old Password"
          value={form.oldPassword}
          onChange={(e) =>
            setForm({ ...form, oldPassword: e.target.value })
          }
          required
        />

        <input
          type="password"
          placeholder="New Password"
          value={form.newPassword}
          onChange={(e) =>
            setForm({ ...form, newPassword: e.target.value })
          }
          required
        />

        <button type="submit">
          Update Password
        </button>
      </form>
    </div>
  );
}

export default UpdatePassword;