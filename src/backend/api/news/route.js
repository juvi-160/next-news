import express from "express";
import  News  from "../../models/newsModel.js";
import Category from "../../models/categoryModel.js";
import upload from "../../middlleware/multer.js";

const router = express.Router();

// GET /api/news - get all news
router.get("/", async (req, res) => {
  try {
    const newsList = await News.findAll();
    res.json(newsList);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// POST /api/news - create news with image upload
router.post("/", upload.single("image"), async (req, res) => {
  try {
    const { title, publisherName, description, categoryId, publishedAt } = req.body;
    const image = req.file ? req.file.filename : null;

    const news = await News.create({
      title,
      publisherName,
      description,
      image,
      categoryId,
      publishedAt: publishedAt || new Date(),
    });

    res.status(201).json(news);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// GET /api/news/count - get news count by category
router.get("/count", async (req, res) => {
  try {
    const total = await News.count();
    const categories = await Category.findAll();
    const counts = { total };

    for (const category of categories) {
      counts[category.name.toLowerCase()] = await News.count({ where: { categoryId: category.id } });
    }

    res.json({ success: true, ...counts });
  } catch (error) {
    console.error("Error getting news counts:", error);
    res.status(500).json({ success: false, message: "Failed to get news counts" });
  }
});

// GET /api/news/:id - get news by id
router.get("/:id", async (req, res) => {
  try {
    const news = await News.findByPk(req.params.id);
    if (!news) return res.status(404).json({ error: "News not found" });
    res.json(news);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// PUT /api/news/:id - update news with optional image upload
router.put("/:id", upload.single("image"), async (req, res) => {
  try {
    const news = await News.findByPk(req.params.id);
    if (!news) return res.status(404).json({ error: "News not found" });

    const { title, publisherName, description, categoryId, publishedAt } = req.body;
    const updatedData = {
      title,
      publisherName,
      description,
      categoryId,
      publishedAt: publishedAt || new Date(),
    };

    if (req.file) {
      updatedData.image = req.file.filename;
    }

    await news.update(updatedData);
    res.json(news);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// DELETE /api/news/:id - delete news
router.delete("/:id", async (req, res) => {
  try {
    const news = await News.findByPk(req.params.id);
    if (!news) return res.status(404).json({ error: "News not found" });

    await news.destroy();
    res.json({ message: "News deleted successfully" });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

export default router;
