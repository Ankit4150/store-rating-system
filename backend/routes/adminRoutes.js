const router = require("express").Router();

const auth = require("../middleware/authMiddleware");

const role = require("../middleware/roleMiddleware");


const {
  dashboard,
  addUser,
  addStore,
  getUsers,
  getStores,
  getUserDetails,
} = require("../controllers/adminController");

router.get(
  "/dashboard",
  auth,
  role("ADMIN"),
  dashboard
);

router.post(
  "/add-user",
  auth,
  role("ADMIN"),
  addUser
);

router.post(
  "/add-store",
  auth,
  role("ADMIN"),
  addStore
);

router.get(
  "/users",
  auth,
  role("ADMIN"),
  getUsers
);

router.get(
  "/stores",
  auth,
  role("ADMIN"),
  getStores
);
router.get(
  "/user/:id",
  auth,
  role("ADMIN"),
  getUserDetails
);

module.exports = router;