const Livestock = require("../models/Livestock");
const Farm = require("../models/Farm");

// POST /api/livestock
// Creates a livestock group, links it to its parent farm, and confirms the farm belongs to the logged-in user
const createLivestock = async (req, res) => {
  const { type, breed, headcount, farmId } = req.body;

  try {
    if (!type || !headcount || !farmId) {
      return res.status(400).json({ message: "type, headcount, and farmId are required" });
    }

    // Confirm the farm exists AND belongs to the logged-in user before attaching livestock to it
    const farm = await Farm.findOne({ _id: farmId, owner: req.user.id });
    if (!farm) {
      return res.status(404).json({ message: "Farm not found" });
    }

    const livestock = await Livestock.create({
      type,
      breed,
      headcount,
      farm: farmId,
    });

    // Sync the other side of the relationship
    farm.livestock.push(livestock._id);
    await farm.save();

    res.status(201).json(livestock);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server error" });
  }
};

// GET /api/livestock
// Returns all livestock groups across every farm owned by the logged-in user
const getLivestock = async (req, res) => {
  try {
    const farms = await Farm.find({ owner: req.user.id }).select("_id");
    const farmIds = farms.map((f) => f._id);

    const livestock = await Livestock.find({ farm: { $in: farmIds } })
      .populate("farm", "name location")
      .sort({ createdAt: -1 });

    res.json(livestock);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server error" });
  }
};

// GET /api/livestock/:id
const getLivestockById = async (req, res) => {
  try {
    const livestock = await Livestock.findById(req.params.id).populate("farm", "name location owner");

    if (!livestock) {
      return res.status(404).json({ message: "Livestock not found" });
    }

    if (livestock.farm.owner.toString() !== req.user.id) {
      return res.status(403).json({ message: "Not authorized to view this livestock group" });
    }

    res.json(livestock);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server error" });
  }
};

// PUT /api/livestock/:id
const updateLivestock = async (req, res) => {
  try {
    const livestock = await Livestock.findById(req.params.id).populate("farm", "owner");

    if (!livestock) {
      return res.status(404).json({ message: "Livestock not found" });
    }

    if (livestock.farm.owner.toString() !== req.user.id) {
      return res.status(403).json({ message: "Not authorized to update this livestock group" });
    }

    const { breed, headcount, status } = req.body;

    if (breed) livestock.breed = breed;
    if (headcount) livestock.headcount = headcount;
    if (status) livestock.status = status;

    await livestock.save();
    res.json(livestock);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server error" });
  }
};

// POST /api/livestock/:id/vaccinations
// Adds a scheduled vaccination entry to a livestock group
const addVaccination = async (req, res) => {
  try {
    const livestock = await Livestock.findById(req.params.id).populate("farm", "owner");

    if (!livestock) {
      return res.status(404).json({ message: "Livestock not found" });
    }

    if (livestock.farm.owner.toString() !== req.user.id) {
      return res.status(403).json({ message: "Not authorized to update this livestock group" });
    }

    const { name, dueDate } = req.body;
    if (!name || !dueDate) {
      return res.status(400).json({ message: "name and dueDate are required" });
    }

    livestock.vaccinations.push({ name, dueDate });
    await livestock.save();

    res.status(201).json(livestock);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server error" });
  }
};

// POST /api/livestock/:id/health-logs
// Adds a symptom/health entry, e.g. from the "Log symptom" flow
const addHealthLog = async (req, res) => {
  try {
    const livestock = await Livestock.findById(req.params.id).populate("farm", "owner");

    if (!livestock) {
      return res.status(404).json({ message: "Livestock not found" });
    }

    if (livestock.farm.owner.toString() !== req.user.id) {
      return res.status(403).json({ message: "Not authorized to update this livestock group" });
    }

    const { note, aiResponse } = req.body;
    if (!note) {
      return res.status(400).json({ message: "note is required" });
    }

    livestock.healthLogs.push({ note, aiResponse });
    await livestock.save();

    res.status(201).json(livestock);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server error" });
  }
};

// DELETE /api/livestock/:id
const deleteLivestock = async (req, res) => {
  try {
    const livestock = await Livestock.findById(req.params.id).populate("farm", "owner");

    if (!livestock) {
      return res.status(404).json({ message: "Livestock not found" });
    }

    if (livestock.farm.owner.toString() !== req.user.id) {
      return res.status(403).json({ message: "Not authorized to delete this livestock group" });
    }

    await Livestock.findByIdAndDelete(req.params.id);
    await Farm.findByIdAndUpdate(livestock.farm._id, { $pull: { livestock: livestock._id } });

    res.json({ message: "Livestock deleted" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server error" });
  }
};

module.exports = {
  createLivestock,
  getLivestock,
  getLivestockById,
  updateLivestock,
  addVaccination,
  addHealthLog,
  deleteLivestock,
};