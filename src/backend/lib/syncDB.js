// src/backend/lib/syncDB.js
import sequelize from "./db.js";
import Category from "../models/categoryModel.js";
import News from "../models/newsModel.js";

const syncDatabase = async () => {
  try {
    await sequelize.authenticate();
    console.log("✅ Database connected!");

    // Sync all models
    await sequelize.sync({ alter: true }); // use { force: true } to drop & recreate
    console.log("✅ All models synced!");
  } catch (error) {
    console.error("❌ Unable to connect to DB:", error);
  }
};



export default syncDatabase;
