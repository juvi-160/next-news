import express from "express";
import dotenv from "dotenv";
import cors from 'cors';
import syncDatabase from "./lib/syncDB.js";
import categoryRoutes from "./api/categories/route.js";
import adminRoutes from "./api/admin/login/route.js";
import newsRoutes from "./api/news/route.js";

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(express.json());
app.use(cors({ origin: 'http://localhost:3000' }));

// Routes
app.use("/categories", categoryRoutes);
app.use("/admin", adminRoutes);
app.use("/news", newsRoutes);

// Start Server with DB sync
const startServer = async () => {
  try {
    await syncDatabase(); // ⬅️ Connect and sync Sequelize

    app.listen(PORT, () => {
      console.log(`🚀 Server is running on http://localhost:${PORT}`);
    });
  } catch (error) {
    console.error("❌ Failed to start server:", error);
  }
};

startServer();
