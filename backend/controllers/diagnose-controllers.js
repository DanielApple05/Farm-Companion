const axios = require("axios");
const Crop = require("../models/Crop");
const { explainDiagnosis } = require("../services/claudeService");

const diagnoseCrop = async (req, res) => {
  try {
    if (!req.file) {
      return res.status(400).json({
        message: "No image uploaded",
      });
    }

    const { cropId } = req.body;

    if (!cropId) {
      return res.status(400).json({
        message: "cropId is required",
      });
    }

    const cropDoc = await Crop.findById(cropId).populate("farm", "owner");

    if (!cropDoc) {
      return res.status(404).json({
        message: "Crop not found",
      });
    }

    if (cropDoc.farm.owner.toString() !== req.user.id) {
      return res.status(403).json({
        message: "Not authorized to diagnose this crop",
      });
    }

    // Convert uploaded image to base64
    const base64Image = req.file.buffer.toString("base64");

    // --------------------------------
    // KINDWISE DIAGNOSIS
    // --------------------------------

    const kindwiseResponse = await axios.post(
      "https://crop.kindwise.com/api/v1/identification",
      {
        images: [base64Image],
      },
      {
        headers: {
          "Api-Key": process.env.KINDWISE_API_KEY,
          "Content-Type": "application/json",
        },
      },
    );

    const result = kindwiseResponse.data.result;

    const topCrop = result.crop?.suggestions?.[0];
    const topDisease = result.disease?.suggestions?.[0];

    // No disease detected
    if (!topDisease) {
      return res.status(200).json({
        message: "No disease detected",
        selectedCrop: cropDoc.name,
        detectedCrop: topCrop?.name || null,
      });
    }

    const confidence = Math.round(topDisease.probability * 100);

    // --------------------------------
    // SAVE KINDWISE RESULT
    // --------------------------------

    const diagnosisLog = {
      disease: topDisease.name,
      confidence,
      imageUrl: "",
    };

    cropDoc.diagnosisLogs.push(diagnosisLog);
    cropDoc.status = "Flagged";

    // --------------------------------
    // OPTIONAL AI EXPLANATION
    // --------------------------------

    let explanation = "";

    if (process.env.CLAUDE_API_KEY) {
      try {
        explanation = await explainDiagnosis(
          topDisease.name,
          cropDoc.name,
          confidence,
        );
      } catch (aiError) {
        console.error("AI explanation failed:", aiError.message);
      }
    }

    // Add explanation if AI was available
    if (explanation) {
      cropDoc.diagnosisLogs[cropDoc.diagnosisLogs.length - 1].explanation =
        explanation;
    }

    await cropDoc.save();

    // --------------------------------
    // RESPONSE
    // --------------------------------

    res.status(200).json({
      selectedCrop: cropDoc.name,
      detectedCrop: topCrop?.name || null,
      disease: topDisease.name,
      confidence,
      explanation:
        explanation ||
        `Kindwise identified ${topDisease.name} with ${confidence}% confidence.`,
    });
  } catch (error) {
    console.error("Diagnosis error:", error.response?.data || error.message);

    res.status(500).json({
      message: "Diagnosis failed",
    });
  }
};

module.exports = {
  diagnoseCrop,
};
