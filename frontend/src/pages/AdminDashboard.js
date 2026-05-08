
// import { useEffect, useState } from "react";
// import { useNavigate } from "react-router-dom";
// import { toast } from "react-toastify";

// import API from "../services/api";
// import Navbar from "../components/Navbar";


// function AdminDashboard() {
//   const navigate = useNavigate();

//   const [dashboard, setDashboard] = useState({});
//   const [users, setUsers] = useState([]);
//   const [stores, setStores] = useState([]);

//   const [search, setSearch] = useState("");
//   const [roleFilter, setRoleFilter] = useState("");
//   const [sortOrder, setSortOrder] = useState("ASC");
//   const [storeSortOrder, setStoreSortOrder] = useState("ASC");

//   const [userForm, setUserForm] = useState({
//     name: "",
//     email: "",
//     password: "",
//     address: "",
//     role: "USER",
//   });

//   const [storeForm, setStoreForm] = useState({
//     name: "",
//     email: "",
//     address: "",
//     ownerId: "",
//   });

 

//   const fetchData = async () => {
//     try {
//       const dash = await API.get("/admin/dashboard");

//       const usersData = await API.get(
//         `/admin/users?search=${search}&role=${roleFilter}`
//       );

//       const storesData = await API.get("/admin/stores");

//       setDashboard(dash.data);

//       let sortedUsers = [...usersData.data];

//       sortedUsers.sort((a, b) =>
//         sortOrder === "ASC"
//           ? a.name.localeCompare(b.name)
//           : b.name.localeCompare(a.name)
//       );

//       setUsers(sortedUsers);

//       let sortedStores = [...storesData.data];

//       sortedStores.sort((a, b) =>
//         storeSortOrder === "ASC"
//           ? a.name.localeCompare(b.name)
//           : b.name.localeCompare(a.name)
//       );

//       setStores(sortedStores);
//     } catch (error) {
//       toast.error("Failed to fetch data");
//     }
//   };

//   useEffect(() => {
//     fetchData();
//   }, [search, roleFilter, sortOrder, storeSortOrder]);

//   const addUser = async (e) => {
//     e.preventDefault();

//     try {
//       if (userForm.name.length < 20 || userForm.name.length > 60)
//         return toast.error("Name must be 20-60 characters");

//       if (userForm.address.length > 400)
//         return toast.error("Address max 400 characters");

//       const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
//       if (!emailRegex.test(userForm.email))
//         return toast.error("Invalid Email");

//       const passwordRegex = /^(?=.*[A-Z])(?=.*[\W_]).{8,16}$/;
//       if (!passwordRegex.test(userForm.password))
//         return toast.error("Password must be strong");

//       await API.post("/admin/add-user", userForm);

//       toast.success("User Added Successfully");

//       setUserForm({
//         name: "",
//         email: "",
//         password: "",
//         address: "",
//         role: "USER",
//       });

//       fetchData();
//     } catch (error) {
//       toast.error(error.response?.data?.message || "Failed to add user");
//     }
//   };
//   const addStore = async (e) => {
//     e.preventDefault();

//     try {
//       await API.post("/admin/add-store", storeForm);

//       toast.success("Store Added Successfully");

//       setStoreForm({
//         name: "",
//         email: "",
//         address: "",
//         ownerId: "",
//       });

//       fetchData();
//     } catch (error) {
//       toast.error(error.response?.data?.message || "Failed to add store");
//     }
//   };

//   return (
//     <div>
//       <Navbar />
//       <div className="dashboard">
//         <div className="card">
//           <h2>Total Users</h2>
//           <p>{dashboard.totalUsers}</p>
//         </div>

//         <div className="card">
//           <h2>Total Stores</h2>
//           <p>{dashboard.totalStores}</p>
//         </div>

//         <div className="card">
//           <h2>Total Ratings</h2>
//           <p>{dashboard.totalRatings}</p>
//         </div>
//       </div>
//       <div className="admin-container">


//         <div className="form-box">
//           <h2>Add User</h2>

//           <form onSubmit={addUser}>
//             <input
//               type="text"
//               placeholder="Name"
//               value={userForm.name}
//               onChange={(e) =>
//                 setUserForm({ ...userForm, name: e.target.value })
//               }
//             />

//             <input
//               type="email"
//               placeholder="Email"
//               value={userForm.email}
//               onChange={(e) =>
//                 setUserForm({ ...userForm, email: e.target.value })
//               }
//             />

//             <input
//               type="password"
//               placeholder="Password"
//               value={userForm.password}
//               onChange={(e) =>
//                 setUserForm({ ...userForm, password: e.target.value })
//               }
//             />

//             <textarea
//               placeholder="Address"
//               value={userForm.address}
//               onChange={(e) =>
//                 setUserForm({ ...userForm, address: e.target.value })
//               }
//             />

//             <select
//               value={userForm.role}
//               onChange={(e) =>
//                 setUserForm({ ...userForm, role: e.target.value })
//               }
//             >
//               <option value="USER">USER</option>
//               <option value="ADMIN">ADMIN</option>
//               <option value="STORE_OWNER">STORE OWNER</option>
//             </select>

//             <button>Add User</button>
//           </form>
//         </div>
//         <div className="form-box">
//           <h2>Add Store</h2>

//           <form onSubmit={addStore}>
//             <input
//               type="text"
//               placeholder="Store Name"
//               value={storeForm.name}
//               onChange={(e) =>
//                 setStoreForm({ ...storeForm, name: e.target.value })
//               }
//             />

//             <input
//               type="email"
//               placeholder="Store Email"
//               value={storeForm.email}
//               onChange={(e) =>
//                 setStoreForm({ ...storeForm, email: e.target.value })
//               }
//             />

//             <textarea
//               placeholder="Address"
//               value={storeForm.address}
//               onChange={(e) =>
//                 setStoreForm({ ...storeForm, address: e.target.value })
//               }
//             />

//             <input
//               type="number"
//               placeholder="Owner ID"
//               value={storeForm.ownerId}
//               onChange={(e) =>
//                 setStoreForm({ ...storeForm, ownerId: e.target.value })
//               }
//             />

//             <button>Add Store</button>
//           </form>
//         </div>
//       </div>
//       <div className="filter-box">
//         <input
//           type="text"
//           placeholder="Search Users"
//           value={search}
//           onChange={(e) => setSearch(e.target.value)}
//         />

//         <select onChange={(e) => setRoleFilter(e.target.value)}>
//           <option value="">All Roles</option>
//           <option value="USER">USER</option>
//           <option value="ADMIN">ADMIN</option>
//           <option value="STORE_OWNER">STORE OWNER</option>
//         </select>

//         <select onChange={(e) => setSortOrder(e.target.value)}>
//           <option value="ASC">User A-Z</option>
//           <option value="DESC">User Z-A</option>
//         </select>
//       </div>
//       <h2 className="table-heading">Users</h2>

//       <table>
//         <thead>
//           <tr>
//             <th>Name</th><th>Email</th><th>Role</th><th>Address</th><th>Action</th>
//           </tr>
//         </thead>

//         <tbody>
//           {users.map((u) => (
//             <tr key={u.id}>
//               <td>{u.name}</td>
//               <td>{u.email}</td>
//               <td>{u.role}</td>
//               <td>{u.address}</td>
//               <td>
//                 <button onClick={() => navigate(`/admin/user/${u.id}`)}>
//                   View
//                 </button>
//               </td>
//             </tr>
//           ))}
//         </tbody>
//       </table>
//       <h2 className="table-heading">Stores</h2>

//       <div className="filter-box">
//         <select onChange={(e) => setStoreSortOrder(e.target.value)}>
//           <option value="ASC">Store A-Z</option>
//           <option value="DESC">Store Z-A</option>
//         </select>
//       </div>

//       <table>
//         <thead>
//           <tr>
//             <th>Name</th><th>Email</th><th>Address</th><th>Rating</th>
//           </tr>
//         </thead>

//         <tbody>
//           {stores.map((s) => (
//             <tr key={s.id}>
//               <td>{s.name}</td>
//               <td>{s.email}</td>
//               <td>{s.address}</td>
//               <td>{s.averageRating}</td>
//             </tr>
//           ))}
//         </tbody>
//       </table>
//     </div>
//   );
// }

// export default AdminDashboard;













import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

import API from "../services/api";
import Navbar from "../components/Navbar";

import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";

function AdminDashboard() {
  const navigate = useNavigate();

  const [dashboard, setDashboard] = useState({});
  const [users, setUsers] = useState([]);
  const [stores, setStores] = useState([]);

  const [search, setSearch] = useState("");
  const [roleFilter, setRoleFilter] = useState("");
  const [sortOrder, setSortOrder] = useState("ASC");
  const [storeSortOrder, setStoreSortOrder] = useState("ASC");

  // 🔥 USER VALIDATION
  const userSchema = yup.object().shape({
    name: yup
      .string()
      .min(20, "Name min 20 characters")
      .max(60, "Name max 60 characters")
      .required("Name is required"),

    email: yup
      .string()
      .email("Invalid email")
      .required("Email is required"),

    password: yup
      .string()
      .min(8)
      .max(16)
      .matches(/[A-Z]/, "Must contain uppercase")
      .matches(/[\W_]/, "Must contain special char")
      .required("Password is required"),

    address: yup
      .string()
      .max(400, "Max 400 characters")
      .required("Address is required"),

    role: yup.string().required(),
  });

  // 🔥 STORE VALIDATION
  const storeSchema = yup.object().shape({
    name: yup.string().required("Store name required"),
    email: yup.string().email().required("Email required"),
    address: yup.string().max(400).required("Address required"),
    ownerId: yup.string().required("Owner ID required"),
  });

  // USER FORM
  const {
    register: userRegister,
    handleSubmit: handleUserSubmit,
    formState: { errors: userErrors },
    reset: resetUser,
  } = useForm({
    resolver: yupResolver(userSchema),
    defaultValues: {
      role: "USER",
    },
  });

  // STORE FORM
  const {
    register: storeRegister,
    handleSubmit: handleStoreSubmit,
    formState: { errors: storeErrors },
    reset: resetStore,
  } = useForm({
    resolver: yupResolver(storeSchema),
  });

  // FETCH DATA
  const fetchData = async () => {
    try {
      const dash = await API.get("/admin/dashboard");
      const usersData = await API.get(`/admin/users?search=${search}&role=${roleFilter}`);
      const storesData = await API.get("/admin/stores");

      setDashboard(dash.data);

      setUsers(
        [...usersData.data].sort((a, b) =>
          sortOrder === "ASC"
            ? a.name.localeCompare(b.name)
            : b.name.localeCompare(a.name)
        )
      );

      setStores(
        [...storesData.data].sort((a, b) =>
          storeSortOrder === "ASC"
            ? a.name.localeCompare(b.name)
            : b.name.localeCompare(a.name)
        )
      );
    } catch {
      toast.error("Failed to fetch data");
    }
  };

  useEffect(() => {
    fetchData();
  }, [search, roleFilter, sortOrder, storeSortOrder]);

  // ADD USER
  const onAddUser = async (data) => {
    try {
      await API.post("/admin/add-user", data);
      toast.success("User Added");
      resetUser();
      fetchData();
    } catch (err) {
      toast.error(err.response?.data?.message);
    }
  };

  // ADD STORE
  const onAddStore = async (data) => {
    try {
      await API.post("/admin/add-store", data);
      toast.success("Store Added");
      resetStore();
      fetchData();
    } catch (err) {
      toast.error(err.response?.data?.message);
    }
  };

  return (
    <div>
      <Navbar />

      {/* DASHBOARD */}
      <div className="dashboard">
        <div className="card"><h2>Total Users</h2><p>{dashboard.totalUsers}</p></div>
        <div className="card"><h2>Total Stores</h2><p>{dashboard.totalStores}</p></div>
        <div className="card"><h2>Total Ratings</h2><p>{dashboard.totalRatings}</p></div>
      </div>

      {/* FORMS */}
      <div className="admin-container">

        {/* USER FORM */}
        <div className="form-box">
          <h2>Add User</h2>

          <form onSubmit={handleUserSubmit(onAddUser)}>

            <input placeholder="Name" {...userRegister("name")}
              style={{ border: userErrors.name ? "2px solid red" : "" }} />
            <p className="error-text">{userErrors.name?.message}</p>

            <input placeholder="Email" {...userRegister("email")}
              style={{ border: userErrors.email ? "2px solid red" : "" }} />
            <p className="error-text">{userErrors.email?.message}</p>

            <input type="password" placeholder="Password" {...userRegister("password")}
              style={{ border: userErrors.password ? "2px solid red" : "" }} />
            <p className="error-text">{userErrors.password?.message}</p>

            <textarea placeholder="Address" {...userRegister("address")}
              style={{ border: userErrors.address ? "2px solid red" : "" }} />
            <p className="error-text">{userErrors.address?.message}</p>

            <select {...userRegister("role")}>
              <option value="USER">USER</option>
              <option value="ADMIN">ADMIN</option>
              <option value="STORE_OWNER">STORE OWNER</option>
            </select>

            <button>Add User</button>
          </form>
        </div>

        {/* STORE FORM */}
        <div className="form-box">
          <h2>Add Store</h2>

          <form onSubmit={handleStoreSubmit(onAddStore)}>

            <input placeholder="Store Name" {...storeRegister("name")}
              style={{ border: storeErrors.name ? "2px solid red" : "" }} />
            <p className="error-text">{storeErrors.name?.message}</p>

            <input placeholder="Email" {...storeRegister("email")}
              style={{ border: storeErrors.email ? "2px solid red" : "" }} />
            <p className="error-text">{storeErrors.email?.message}</p>

            <textarea placeholder="Address" {...storeRegister("address")}
              style={{ border: storeErrors.address ? "2px solid red" : "" }} />
            <p className="error-text">{storeErrors.address?.message}</p>

            <input type="number" placeholder="Owner ID" {...storeRegister("ownerId")}
              style={{ border: storeErrors.ownerId ? "2px solid red" : "" }} />
            <p className="error-text">{storeErrors.ownerId?.message}</p>

            <button>Add Store</button>
          </form>
        </div>
      </div>

      {/* USERS TABLE */}
      <h2 className="table-heading">Users</h2>

      <table>
        <thead>
          <tr>
            <th>Name</th><th>Email</th><th>Role</th><th>Address</th>
          </tr>
        </thead>
        <tbody>
          {users.map((u) => (
            <tr key={u.id}>
              <td>{u.name}</td>
              <td>{u.email}</td>
              <td>{u.role}</td>
              <td>{u.address}</td>
            </tr>
          ))}
        </tbody>
      </table>

      {/* STORES TABLE */}
      <h2 className="table-heading">Stores</h2>

      <table>
        <thead>
          <tr>
            <th>Name</th><th>Email</th><th>Address</th><th>Rating</th>
          </tr>
        </thead>
        <tbody>
          {stores.map((s) => (
            <tr key={s.id}>
              <td>{s.name}</td>
              <td>{s.email}</td>
              <td>{s.address}</td>
              <td>{s.averageRating}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default AdminDashboard;