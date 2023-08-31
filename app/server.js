// server.js

const express = require("express");
const path = require("path");
const bodyParser = require("body-parser");
const axios = require("axios");
require('dotenv').config();

const app = express();

app.use(express.static(path.join(__dirname, "public")));
app.use(bodyParser.json());

const OPENAI_API_KEY = process.env.OPENAI_API_KEY;

app.post("/generate-names", async (req, res) => {
    const { prompt } = req.body;
    const { temperature } = req.body;
    console.log(temperature);

    try {
        const response = await axios.post(
            "https://api.openai.com/v1/engines/text-davinci-003/completions",
            {
                prompt: prompt,
                max_tokens: 100,
                temperature: temperature,
            },
            {
                headers: {
                    "Content-Type": "application/json",
                    "Authorization": `Bearer ${OPENAI_API_KEY}`,
                },
            }
        );

        const generatedNames = response.data.choices.map(choice => choice.text.trim());
        res.json({ names: generatedNames });
    } catch (error) {
        console.error("Error generating names:", error.message);
        res.status(500).json({ error: "An error occurred" });
    }
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
