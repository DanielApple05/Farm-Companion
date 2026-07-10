const Crop = require("../models/Crop");
const Farm = require("../models/Farm");

// POST /api/crops
// Creates a crop, links it to its parent farm, and confirms the farm belongs to the logged-in user
const createCrop = async (req, res) => {
  const { name, farmId, plantedOn, photoUrl } = req.body;

  try {
    // if (!name || !farmId || !plantedOn) {
    //   return res
    //     .status(400)
    //     .json({ message: "cropName, farmId, and plantedOn are required" });
    // }

    // Confirm the farm exists AND belongs to the logged-in user before attaching a crop to it
    const farm = await Farm.findOne(req.user.id);
    if (!farm) {
      return res.status(404).json({ message: "Farm not found" });
    }

    const crop = await Crop.create({
      name: cropName,
      farm: farmId,
      plantedOn,
      photoUrl,
      owner: user._id,
    });

    // Sync the other side of the relationship
    farm.crops.push(crop._id);
    await farm.save();

    res.status(201).json(crop);
  } catch (error) {
    res.status(500).json({ message: "Server error" });
  }
};

// GET /api/crops
// Returns all crops across every farm owned by the logged-in user
const getCrops = async (req, res) => {
  try {
    const farms = await Farm.find({ owner: req.user.id }).select("_id");
    const farmIds = farms.map((f) => f._id);

    const crops = await Crop.find({ farm: { $in: farmIds } })
      .populate("farm", "name location")
      .sort({ createdAt: -1 });

    res.json(crops);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server error" });
  }
};

// GET /api/crops/:id
const getCropById = async (req, res) => {
  try {
    const crop = await Crop.findById(req.params.id).populate(
      "farm",
      "name location owner",
    );

    if (!crop) {
      return res.status(404).json({ message: "Crop not found" });
    }

    // Ownership check — the crop's farm must belong to the logged-in user
    if (crop.farm.owner.toString() !== req.user.id) {
      return res
        .status(403)
        .json({ message: "Not authorized to view this crop" });
    }

    res.json(crop);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server error" });
  }
};

// PUT /api/crops/:id
const updateCrop = async (req, res) => {
  try {
    const crop = await Crop.findById(req.params.id).populate("farm", "owner");

    if (!crop) {
      return res.status(404).json({ message: "Crop not found" });
    }

    if (crop.farm.owner.toString() !== req.user.id) {
      return res
        .status(403)
        .json({ message: "Not authorized to update this crop" });
    }

    const { name, stage, status, yield: cropYield } = req.body;

    if (name) crop.name = name;
    if (stage) crop.stage = stage;
    if (status) crop.status = status;
    if (cropYield) crop.yield = cropYield;

    await crop.save();
    res.json(crop);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server error" });
  }
};

// DELETE /api/crops/:id
const deleteCrop = async (req, res) => {
  try {
    const crop = await Crop.findById(req.params.id).populate("farm", "owner");

    if (!crop) {
      return res.status(404).json({ message: "Crop not found" });
    }

    if (crop.farm.owner.toString() !== req.user.id) {
      return res
        .status(403)
        .json({ message: "Not authorized to delete this crop" });
    }

    // Remove the crop, then pull its reference out of the parent farm
    await Crop.findByIdAndDelete(req.params.id);
    await Farm.findByIdAndUpdate(crop.farm._id, { $pull: { crops: crop._id } });

    res.json({ message: "Crop deleted" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server error" });
  }
};

module.exports = { createCrop, getCrops, getCropById, updateCrop, deleteCrop };
