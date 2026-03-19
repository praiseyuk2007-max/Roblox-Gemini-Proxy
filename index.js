const express = require('express');
const axios = require('axios');
const app = express();
app.use(express.json());

// This is the "Middleman" route
app.post('/gemini/:model', async (req, res) => {
    const { model } = req.params;
    const apiKey = req.headers['x-goog-api-key'];
    const url = `https://generativelanguage.googleapis.com/v1beta/models/${model}:generateContent?key=${apiKey}`;

    try {
        const response = await axios.post(url, req.body, {
            headers: { 'Content-Type': 'application/json' }
        });
        res.status(200).json(response.data);
    } catch (error) {
        console.error("Proxy Error:", error.response?.data || error.message);
        res.status(error.response?.status || 500).json(error.response?.data || "Error");
    }
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Proxy running on port ${PORT}`));
