const Farm = require("../models/Farm");
const User = require("../models/User");

const createFarm = async (req, res) => {
  const { name, location, farmType, firstEntry } = req.body;

  try {

    const user = User.findOne({ user._id });
    if (!user) {
      return res.status(404).json({ message: "please login" });
    }

    const farm = await Farm.create({
      name,
      location,
      farmType,
      firstEntry,
    });

    // Sync the other side of the relationship
    user.farms.push(farm._id);
    await farm.save();
    res.status(200).json(farm);

  } catch (error) {
    res.status(500).json({ message: "Server error" });
  }
};

module.exports = { createFarm };