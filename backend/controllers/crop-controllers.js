const Crop = require("../models/Crop");
const Farm = require("../models/Farm");
const { getTipsForCrop } = require("../services/tipEngine");
const { getWeather } = require("../services/weatherService");
const { supportedCrops } = require("../knowledge/crops/availableCrops");

const isOwnerMatch = (ownerId, userId) => {
  if (!ownerId || !userId) return false;
  return ownerId.toString() === userId.toString();
};

// POST /api/crops
// Creates a crop, links it to its parent farm, and confirms the farm belongs to the logged-in user
const createCrop = async (req, res) => {
  const { cropName, farmId, plantedOn, photoUrl } = req.body;

  try {
    if (!cropName || !farmId || !plantedOn) {
      return res.status(400).json({ message: "All feilds Are Required!" });
    }

    const farm = await Farm.findOne({ _id: farmId, owner: req.user.id });
    if (!farm) {
      return res.status(404).json({ message: "Farm not found" });
    }

    const crop = await Crop.create({
      name: cropName,
      farm: farmId,
      plantedOn,
      photoUrl,
    });

    farm.crops.push(crop._id);
    await farm.save();

    res.status(201).json(crop);
  } catch (error) {
    console.error(error);
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

    if (!isOwnerMatch(crop.farm.owner, req.user.id)) {
      return res
        .status(403)
        .json({ message: "Not authorized to view this crop" });
    }

    console.log("Crop found:", crop.name);
    console.log("Farm location:", crop.farm.location);

    const weatherData = await getWeather(crop.farm.location);

    console.log("Weather data received:", weatherData);

    const result = getTipsForCrop(crop, weatherData);

    console.log("Tip engine result:", result);

    res.json({
      crop,
      growth: result.growth,
      weatherCondition: result.weatherCondition,
      cropTips: result.cropTips,
      weatherTips: result.weatherTips,
    });
  } catch (error) {
    console.error("GET CROP BY ID ERROR:", error);
    res.status(500).json({
      message: "Server error",
      error: error.message,
    });
  }
};

// PUT /api/crops/:id
const updateCrop = async (req, res) => {
  try {
    const crop = await Crop.findById(req.params.id).populate("farm", "owner");

    if (!crop) {
      return res.status(404).json({ message: "Crop not found" });
    }

    if (!isOwnerMatch(crop.farm.owner, req.user.id)) {
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

    if (!isOwnerMatch(crop.farm.owner, req.user.id)) {
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

const getSupportedCrops = async (req, res) => {
  res.json(
    supportedCrops.map((crop) => ({
      id: crop.id,
      name: crop.name,
    }))
  );
};

module.exports = { createCrop, getCrops, getCropById, updateCrop, deleteCrop, getSupportedCrops };
