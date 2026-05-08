const Store = require("../models/Store");
const Rating = require("../models/Rating");
const User = require("../models/User");

exports.dashboard = async (req, res) => {
  try {
    const store = await Store.findOne({
      where: {
        ownerId: req.user.id,
      },
    });

    const ratings = await Rating.findAll({
      where: {
        StoreId: store.id,
      },

      include: [
        {
          model: User,
        },
      ],
    });

    let avg = 0;

    if (ratings.length > 0) {
      avg =
        ratings.reduce(
          (acc, item) => acc + item.rating,
          0
        ) / ratings.length;
    }

    res.json({
      ratings,
      averageRating: avg,
    });
  } catch (error) {
    res.status(500).json(error);
  }
};