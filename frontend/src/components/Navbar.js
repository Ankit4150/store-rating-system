import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

function Navbar() {
  const navigate = useNavigate();

  const logout = () => {
    localStorage.clear();

    toast.success("Logged out successfully", {
      autoClose: 1000,
    });

    setTimeout(() => {
      navigate("/");
    }, 900);
  };

  return (
    <div className="navbar">

      <h2 className="logo">Store Rating App</h2>

      <div className="nav-buttons">

        <button className="btn logout-btn" onClick={logout}>
          Logout
        </button>

        <button
          className="btn update-btn"
          onClick={() => navigate("/update-password")}
        >
          Update Password
        </button>

      </div>

    </div>
  );
}

export default Navbar;