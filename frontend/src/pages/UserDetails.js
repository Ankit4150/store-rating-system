import { useEffect, useState } from "react";

import { useParams } from "react-router-dom";

import API from "../services/api";

import Navbar from "../components/Navbar";

function UserDetails() {

  const { id } = useParams();

  const [data, setData] =
    useState(null);

  const fetchDetails = async () => {

    try {

      const res = await API.get(
        `/admin/user/${id}`
      );

      setData(res.data);

    } catch (error) {

      console.log(error);

    }

  };

  useEffect(() => {
    fetchDetails();
  }, []);

  if (!data) {
    return <h2>Loading...</h2>;
  }

  return (

    <div>

      <Navbar />

      <div className="details-container">

        <h2>User Details</h2>

        <div className="details-card">

          <p>
            <strong>Name:</strong>
            {data.user.name}
          </p>

          <p>
            <strong>Email:</strong>
            {data.user.email}
          </p>

          <p>
            <strong>Address:</strong>
            {data.user.address}
          </p>

          <p>
            <strong>Role:</strong>
            {data.user.role}
          </p>

          {data.user.role ===
            "STORE_OWNER" && (

            <p>
              <strong>
                Average Rating:
              </strong>

              {data.averageRating}
            </p>

          )}

        </div>

      </div>

    </div>

  );
}

export default UserDetails;