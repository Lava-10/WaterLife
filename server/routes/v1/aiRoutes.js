const express = require("express");
const multer = require("multer");
const { GoogleGenerativeAI } = require("@google/generative-ai");
require("dotenv").config();

const router = express.Router();
const upload = multer();

// Route to analyze the image
router.post("/analyze-image", upload.single("image"), async (req, res) => {
  try {
    if (!req.file) {
      return res.status(400).json({ error: "No image file provided" });
    }

    const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);
    const model = genAI.getGenerativeModel({ model: "gemini-1.5-pro" });


    const imagePart = {
      inlineData: {
        data: req.file.buffer.toString("base64"),
        mimeType: req.file.mimetype,
      },
    };

    // Custom prompt for analyzing marine life
    const prompt = `You are an oceanographer and environmental scientist with expertise in analyzing images related to oceans, water bodies, and their ecosystems.
    Analyze the uploaded image and provide:
    1. A description of the scene or subject in the image (e.g., marine species, water body, ecosystem, or any relevant object).
    2. Details about the habitat or environment depicted.
    3. Information about any identifiable species or objects, including names and key characteristics.
    4. Insights into the ecological or environmental significance of the scene.
    5. Suggestions for conservation, sustainability, or actions to improve the health of the depicted ecosystem or environment.`;

    const response = await model.generateContent([prompt, imagePart]);

    const result = await response.response.text();
    return res.json({ result });
  } catch (error) {
    console.error("Error analyzing image through Gemini:", error);
    return res.status(500).json({ error: "Failed to analyze the image." });
  }
});

module.exports = router;
