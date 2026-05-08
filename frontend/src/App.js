
import {
  BrowserRouter,
  Routes,
  Route,
} from "react-router-dom";

import Login from "./pages/Login";
import Register from "./pages/Register";
import UpdatePassword from "./pages/UpdatePassword";
import UserDetails from "./pages/UserDetails";

import AdminDashboard from "./pages/AdminDashboard";

import UserDashboard from "./pages/UserDashboard";

import StoreOwnerDashboard from "./pages/StoreOwnerDashboard";

import ProtectedRoute from "./components/ProtectedRoute";

function App() {
  return (
    <BrowserRouter>

      <Routes>

        <Route
          path="/"
          element={<Login />}
        />

        <Route
          path="/register"
          element={<Register />}
        />
<Route
  path="/update-password"
  element={
    <ProtectedRoute>
      <UpdatePassword />
    </ProtectedRoute>
  }
/>
        <Route
          path="/admin"
          element={
            <ProtectedRoute role="ADMIN">
              <AdminDashboard />
            </ProtectedRoute>
          }
        />

        <Route
          path="/user"
          element={
            <ProtectedRoute role="USER">
              <UserDashboard />
            </ProtectedRoute>
          }
        />
        <Route
  path="/admin/user/:id"
  element={
    <ProtectedRoute role="ADMIN">
      <UserDetails />
    </ProtectedRoute>
  }
/>

        <Route
          path="/store-owner"
          element={
            <ProtectedRoute role="STORE_OWNER">
              <StoreOwnerDashboard />
            </ProtectedRoute>
          }
        />

      </Routes>

    </BrowserRouter>
  );
}

export default App;