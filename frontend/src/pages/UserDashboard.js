import { useEffect, useState } from "react";
import API from "../services/api";
import Navbar from "../components/Navbar";

function UserDashboard() {
  const [stores, setStores] = useState([]);

  const [rating, setRating] = useState({});

  const fetchStores = async () => {
    const res = await API.get(
      "/user/stores"
    );

    setStores(res.data);
  };

  useEffect(() => {
    fetchStores();
  }, []);

  const submitRating = async (storeId) => {
    await API.post("/user/rating", {
      storeId,
      rating: rating[storeId],
    });

    alert("Rating Submitted");
  };

  return (
    <div>

      <Navbar />

      <div className="store-grid">

        {stores.map((store) => (
          <div className="store-card">

            <h2>{store.name}</h2>

            <p>{store.address}</p>

            <select
              onChange={(e) =>
                setRating({
                  ...rating,
                  [store.id]: e.target.value,
                })
              }
            >

              <option>Select Rating</option>

              <option value="1">1</option>

              <option value="2">2</option>

              <option value="3">3</option>

              <option value="4">4</option>

              <option value="5">5</option>

            </select>

            <button
              onClick={() =>
                submitRating(store.id)
              }
            >
              Submit
            </button>

          </div>
        ))}

      </div>

    </div>
  );
}

export default UserDashboard;