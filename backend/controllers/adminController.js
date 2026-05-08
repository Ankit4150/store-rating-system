const User = require("../models/User");
const Store = require("../models/Store");
const Rating = require("../models/Rating");
const bcrypt = require("bcryptjs");
const { Op } = require("sequelize");

exports.dashboard = async (req, res) => {
  try {
    const totalUsers = await User.count();

    const totalStores = await Store.count();

    const totalRatings = await Rating.count();

    res.json({
      totalUsers,
      totalStores,
      totalRatings,
    });
  } catch (error) {
    res.status(500).json(error);
  }
};

exports.addUser = async (req, res) => {
  try {
    const {
      name,
      email,
      password,
      address,
      role,
    } = req.body;


if (
  name.length < 20 ||
  name.length > 60
) {
  return res.status(400).json({
    message:
      "Name must be 20-60 characters",
  });
}

if (address.length > 400) {
  return res.status(400).json({
    message:
      "Address max 400 characters",
  });
}

const emailRegex =
  /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

if (!emailRegex.test(email)) {
  return res.status(400).json({
    message: "Invalid Email",
  });
}

const passwordRegex =
  /^(?=.*[A-Z])(?=.*[\W_]).{8,16}$/;

if (
  !passwordRegex.test(password)
) {
  return res.status(400).json({
    message:
      "Password must be 8-16 chars with uppercase & special character",
  });
}
    const hashedPassword = await bcrypt.hash(
      password,
      10
    );

    const user = await User.create({
      name,
      email,
      password: hashedPassword,
      address,
      role,
    });

    res.json(user);
  } catch (error) {
    res.status(500).json(error);
  }
};

exports.addStore = async (req, res) => {
  try {
    const {
      name,
      email,
      address,
      ownerId,
    } = req.body;

    const store = await Store.create({
      name,
      email,
      address,
      ownerId,
    });

    res.json(store);
  } catch (error) {
    res.status(500).json(error);
  }
};

exports.getUsers = async (
  req,
  res
) => {

  try {

    const {
      search = "",
      role = "",
    } = req.query;

    let whereClause = {

      [Op.or]: [

        {
          name: {
            [Op.like]:
              `%${search}%`,
          },
        },

        {
          email: {
            [Op.like]:
              `%${search}%`,
          },
        },

        {
          address: {
            [Op.like]:
              `%${search}%`,
          },
        },

      ],

    };

    if (role) {

      whereClause.role = role;

    }

    const users =
      await User.findAll({

        where: whereClause,

      });

    res.json(users);

  } catch (error) {

    res.status(500).json({
      message: error.message,
    });

  }

};

exports.getStores = async (
  req,
  res
) => {

  try {

    const stores =
      await Store.findAll({

        include: [
          {
            model: Rating,
          },
        ],

      });

    const updatedStores =
      stores.map((store) => {

        let avgRating = 0;

        if (
          store.Ratings.length > 0
        ) {

          avgRating =
            store.Ratings.reduce(
              (acc, item) =>
                acc + item.rating,
              0
            ) /
            store.Ratings.length;

        }

        return {
          ...store.toJSON(),
          averageRating:
            avgRating.toFixed(1),
        };

      });

    res.json(updatedStores);

  } catch (error) {

    res.status(500).json({
      message: error.message,
    });

  }

};

exports.getUserDetails = async (
  req,
  res
) => {

  try {

    const user = await User.findByPk(
      req.params.id
    );

    if (!user) {

      return res.status(404).json({
        message: "User not found",
      });

    }

    let averageRating = null;

    if (user.role === "STORE_OWNER") {

      const store = await Store.findOne({

        where: {
          ownerId: user.id,
        },

      });

      if (store) {

        const ratings =
          await Rating.findAll({

            where: {
              StoreId: store.id,
            },

          });

        if (ratings.length > 0) {

          averageRating =
            ratings.reduce(
              (acc, item) =>
                acc + item.rating,
              0
            ) / ratings.length;

        } else {

          averageRating = 0;

        }

      }

    }

    res.json({
      user,
      averageRating,
    });

  } catch (error) {

    res.status(500).json({
      message: error.message,
    });

  }

};