import express from "express";
import Category from "../../models/categoryModel.js";

const router = express.Router();

// Get all categories
router.get("/", async (req, res) => {
  try {
    const categories = await Category.findAll({ order: [["createdAt", "DESC"]] });
    res.json({ success: true, categories, count: categories.length });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
});

// Create a new category
router.post("/", async (req, res) => {
  try {
    const { name } = req.body;
    const category = await Category.create({ name });
    res.json({ success: true, category });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
});

// Update category by ID
router.put("/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const { name } = req.body;

    const category = await Category.findByPk(id);
    if (!category) {
      return res.status(404).json({ success: false, message: "Category not found" });
    }

    category.name = name;
    await category.save();

    res.json({ success: true, category });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
});

// Delete category by ID
router.delete("/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const deleted = await Category.destroy({ where: { id } });

    res.json({ success: deleted > 0 });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
});

// Optional: count categories
router.get("/count", async (req, res) => {
  try {
    const count = await Category.count();
    res.json({ success: true, count });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
});

export default router;
