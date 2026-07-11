const axios = require("axios");

const diagnoseCrop = async (req, res) => {
  try {
    if (!req.file) {
      return res.status(400).json({ message: "No image uploaded" });
    }
    const { crop } = req.body;

    // Step 1: convert the image buffer to base64
    const base64Image = req.file.buffer.toString("base64");

    // Step 2: send it to Kindwise
    const kindwiseResponse = await axios.post(
      "https://crop.kindwise.com/api/v1/identification",
      {
        images: [base64Image], // their API expects an array, even for one image
      },
      {
        headers: {
          "Api-Key": process.env.KINDWISE_API_KEY,
          "Content-Type": "application/json",
        },
      },
    );

    // Step 3: pull out what we actually need from their (large) response
    const result = kindwiseResponse.data.result;
    const topCrop = result.crop?.suggestions?.[0];
    const topDisease = result.disease?.suggestions?.[0]; // highest-probability match
    console.log(JSON.stringify(kindwiseResponse.data, null, 2));

    if (!topDisease) {
      return res.status(200).json({
        message: "No disease detected",
        crop,
      });
    }
    res.json({
      selectedCrop: crop, // what the user told you
      detectedCrop: topCrop?.name, // what Kindwise independently thinks
      disease: topDisease.name,
      confidence: Math.round(topDisease.probability * 100),
    });
  } catch (error) {
    console.error(error.response?.data || error.message);
    res.status(500).json({ message: "Diagnosis failed" });
  }
};

module.exports = { diagnoseCrop };
