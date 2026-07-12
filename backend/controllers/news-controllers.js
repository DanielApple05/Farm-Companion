const axios = require("axios");

const getAgricultureNews = async (req, res) => {
  try {
    const response = await axios.get("https://newsdata.io/api/1/latest", {
      params: {
        apikey: process.env.NEWSDATA_API_KEY,
        q: "agriculture",
        country: "ng",
      },
    });
    res.json(response.data);
  } catch (error) {
    console.error(error.response?.data || error.message);
    res.status(500).json({ message: "Failed to fetch news" });
  }
};

module.exports = { getAgricultureNews };