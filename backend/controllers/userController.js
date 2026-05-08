const Store = require("../models/Store");
const Rating = require("../models/Rating");
const User = require("../models/User");

exports.getStores = async (req, res) => {
  try {
    const stores = await Store.findAll();

    res.json(stores);
  } catch (error) {
    res.status(500).json(error);
  }
};

exports.submitRating = async (req, res) => {
  try {
    const { storeId, rating } = req.body;

    const existing = await Rating.findOne({
      where: {
        UserId: req.user.id,
        StoreId: storeId,
      },
    });

    if (existing) {
      existing.rating = rating;

      await existing.save();

      return res.json({
        message: "Rating updated",
      });
    }

    await Rating.create({
      rating,
      UserId: req.user.id,
      StoreId: storeId,
    });

    res.json({
      message: "Rating submitted",
    });
  } catch (error) {
    res.status(500).json(error);
  }
};

exports.updatePassword = async (req, res) => {
  try {
    const bcrypt = require("bcryptjs");

    const { password } = req.body;

    const hashed = await bcrypt.hash(
      password,
      10
    );

    await User.update(
      {
        password: hashed,
      },
      {
        where: {
          id: req.user.id,
        },
      }
    );

    res.json({
      message: "Password updated",
    });
  } catch (error) {
    res.status(500).json(error);
  }
};