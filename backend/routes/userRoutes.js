const router = require("express").Router();

const auth = require("../middleware/authMiddleware");

const role = require("../middleware/roleMiddleware");

const {
  
  getStores,
  submitRating,
  updatePassword,
} = require("../controllers/userController");

router.get(
  "/stores",
  auth,
  role("USER"),
  getStores
);

router.post(
  "/rating",
  auth,
  role("USER"),
  submitRating
);

router.put(
  "/password",
  auth,
  role("USER"),
  updatePassword
);

module.exports = router;