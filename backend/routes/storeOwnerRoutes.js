const router = require("express").Router();

const auth = require("../middleware/authMiddleware");

const role = require("../middleware/roleMiddleware");

const {
  dashboard,
} = require("../controllers/storeOwnerController");

router.get(
  "/dashboard",
  auth,
  role("STORE_OWNER"),
  dashboard
);

module.exports = router;