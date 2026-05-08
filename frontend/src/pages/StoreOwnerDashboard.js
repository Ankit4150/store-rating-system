import { useEffect, useState } from "react";

import API from "../services/api";

import Navbar from "../components/Navbar";

function StoreOwnerDashboard() {

  const [data, setData] = useState({
    ratings: [],
  });

  const fetchDashboard = async () => {
    const res = await API.get(
      "/store-owner/dashboard"
    );

    setData(res.data);
  };

  useEffect(() => {
    fetchDashboard();
  }, []);

  return (
    <div>

      <Navbar />

      <h2>
        Average Rating:
        {data.averageRating}
      </h2>

      <table>

        <thead>

          <tr>
            <th>User</th>
            <th>Rating</th>
          </tr>

        </thead>

        <tbody>

          {data.ratings.map((r) => (
            <tr key={r.id}>
              <td>{r.User.name}</td>
              <td>{r.rating}</td>
            </tr>
          ))}

        </tbody>

      </table>

    </div>
  );
}

export default StoreOwnerDashboard;