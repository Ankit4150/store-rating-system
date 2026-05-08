// const express = require("express");
// const cors = require("cors");
// const cookieParser = require("cookie-parser");
// require("dotenv").config();

// const sequelize = require("./config/db");

// const authRoutes = require("./routes/authRoutes");

// const app = express();

// app.use(cors());

// app.use(express.json());

// app.use(cookieParser());

// app.use("/api/auth", authRoutes);

// sequelize.sync().then(() => {
//   console.log("Database connected");
// });

// app.listen(process.env.PORT, () => {
//   console.log("Server running");
// });



const express = require("express");

const cors = require("cors");

const cookieParser = require("cookie-parser");

require("dotenv").config();

const sequelize = require("./config/db");

const authRoutes = require("./routes/authRoutes");

const adminRoutes = require("./routes/adminRoutes");

const userRoutes = require("./routes/userRoutes");

const storeOwnerRoutes = require("./routes/storeOwnerRoutes");

const app = express();

app.use(cors());

app.use(express.json());

app.use(cookieParser());

app.use("/api/auth", authRoutes);

app.use("/api/admin", adminRoutes);

app.use("/api/user", userRoutes);

app.use("/api/store-owner", storeOwnerRoutes);

sequelize.sync().then(() => {
  console.log("Database connected");
});

app.listen(process.env.PORT, () => {
  console.log("Server running");
});