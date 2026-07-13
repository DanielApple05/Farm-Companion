const Farm = require("../models/Farm");
const User = require("../models/User");

const createFarm = async (req, res) => {
  const { name, location, type, size, photoUrl } = req.body;

  try {
    if (!name || !location) {
      return res.status(400).json({ message: "All fields are required" });
    }

    const user = await User.findById(req.user.id);
    if (!user) return res.status(401).json({ message: "User not found" });

    const farm = await Farm.create({
      name,
      location,
      type,
      size,
      photoUrl,
      owner: user._id,
    });

    await User.findByIdAndUpdate(req.user.id, { $push: { farms: farm._id } });
    res.status(201).json(farm);
  } catch (error) {
    console.error("Create farm error:", error);
    res.status(500).json({ message: "Server error" });
  }
};

 
// GET /api/farms
// Returns all farms owned by the logged-in user
const getFarms = async (req, res) => {
  try {
    const farms = await Farm.find({ owner: req.user.id }).sort({ createdAt: -1 });
    res.json(farms);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server error" });
  }
};
 
// GET /api/farms/:id
// Returns one farm with its crops and livestock fully populated
const getFarmById = async (req, res) => {
  try {
    const farm = await Farm.findOne({ _id: req.params.id, owner: req.user.id })
      .populate("crops")
      .populate("livestock");
 
    if (!farm) {
      return res.status(404).json({ message: "Farm not found" });
    }
 
    res.json(farm);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server error" });
  }
};
 
// PUT /api/farms/:id
const updateFarm = async (req, res) => {
  try {
    const farm = await Farm.findOne({ _id: req.params.id, owner: req.user.id });
 
    if (!farm) {
      return res.status(404).json({ message: "Farm not found" });
    }
 
    const { name, location, type, size, photoUrl } = req.body;
 
    if (name) farm.name = name;
    if (location) farm.location = location;
    if (type) farm.type = type;
    if (size) farm.size = size;
    if (photoUrl) farm.photoUrl = photoUrl;
 
    await farm.save();
    res.json(farm);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server error" });
  }
};
 
// DELETE /api/farms/:id
// Also cleans up the reference on the User document
const deleteFarm = async (req, res) => {
  try {
    const farm = await Farm.findOne({ _id: req.params.id, owner: req.user.id });
 
    if (!farm) {
      return res.status(404).json({ message: "Farm not found" });
    }
 
    await Farm.findByIdAndDelete(req.params.id);
    await User.findByIdAndUpdate(req.user.id, { $pull: { farms: farm._id } });
 
    // NOTE: this does not cascade-delete the farm's crops/livestock —
    // decide later whether orphaned Crop/Livestock docs should be deleted too
    res.json({ message: "Farm deleted" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server error" });
  }
};

 
// POST /api/farms/:farmId/equipment
// Adds a piece of equipment to a farm's embedded equipment list
const addEquipment = async (req, res) => {
  try {
    const farm = await Farm.findOne({ _id: req.params.farmId, owner: req.user.id });
 
    if (!farm) {
      return res.status(404).json({ message: "Farm not found" });
    }
 
    const { name, quantity, condition } = req.body;
    if (!name || !quantity) {
      return res.status(400).json({ message: "name and quantity are required" });
    }
 
    farm.equipment.push({ name, quantity, condition }, farmId);
    await farm.save();
 
    // Return just the newly added item — the last one pushed —
    // so the frontend can append it without refetching the whole farm
    const newItem = farm.equipment[farm.equipment.length - 1];
    res.status(201).json(newItem);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server error" });
  }
};
 
// DELETE /api/farms/:farmId/equipment/:equipmentId
const deleteEquipment = async (req, res) => {
  try {
    const farm = await Farm.findOne({ _id: req.params.farmId, owner: req.user.id });
 
    if (!farm) {
      return res.status(404).json({ message: "Farm not found" });
    }
 
    farm.equipment = farm.equipment.filter(
      (item) => item._id.toString() !== req.params.equipmentId
    );
    await farm.save();
 
    res.json({ message: "Equipment removed" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server error" });
  }
};
 
module.exports = {
  createFarm,
  getFarms,
  getFarmById,
  updateFarm,
  deleteFarm,
  addEquipment,
  deleteEquipment,
};
