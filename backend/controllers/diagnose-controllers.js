const axios = require("axios");
const Crop = require("../models/Crop");
const { explainDiagnosis } = require("../services/claudeService");

const diagnoseCrop = async (req, res) => {
  try {
    if (!req.file) {
      return res.status(400).json({ message: "No image uploaded" });
    }

    const { cropId } = req.body;
    if (!cropId) {
      return res.status(400).json({ message: "cropId is required" });
    }

    const cropDoc = await Crop.findById(cropId).populate("farm", "owner");
    if (!cropDoc) {
      return res.status(404).json({ message: "Crop not found" });
    }
    if (cropDoc.farm.owner.toString() !== req.user.id) {
      return res.status(403).json({ message: "Not authorized to diagnose this crop" });
    }

    const base64Image = req.file.buffer.toString("base64");

    const kindwiseResponse = await axios.post(
      "https://crop.kindwise.com/api/v1/identification",
      { images: [base64Image] },
      { headers: { "Api-Key": process.env.KINDWISE_API_KEY, "Content-Type": "application/json" } }
    );

    const result = kindwiseResponse.data.result;
    const topCrop = result.crop?.suggestions?.[0];
    const topDisease = result.disease?.suggestions?.[0];

    if (!topDisease) {
      return res.status(200).json({ message: "No disease detected", selectedCrop: cropDoc.name });
    }

    const confidence = Math.round(topDisease.probability * 100);

    cropDoc.diagnosisLogs.push({
      disease: topDisease.name,
      confidence,
      imageUrl: "",
    });
    cropDoc.status = "Flagged";
    await cropDoc.save();

    const explanation = await explainDiagnosis(topDisease.name, cropDoc.name, confidence);

    cropDoc.diagnosisLogs[cropDoc.diagnosisLogs.length - 1].explanation = explanation;
    await cropDoc.save();

    res.json({
      selectedCrop: cropDoc.name,
      detectedCrop: topCrop?.name || null,
      disease: topDisease.name,
      confidence,
      explanation,
    });
  } catch (error) {
    console.error(error.response?.data || error.message);
    res.status(500).json({ message: "Diagnosis failed" });
  }
};

module.exports = { diagnoseCrop };
