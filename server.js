import "dotenv/config";
import express from "express";
import { fetchArticles } from "./main.js";

const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.static("public"));

app.get("/articles", async (req, res) => {
  try {
    const articles = await fetchArticles();
    res.json(articles);
  } catch (error) {
    res.status(500).json({ error: "Failed to fetch articles" });
  }
});

app.listen(PORT, "0.0.0.0", () => {
  console.log(`Server running at http://localhost:${PORT}`);
});
