import { DataTypes } from 'sequelize';
import sequelize from '../lib/db.js';
import Category from './categoryModel.js'

const News = sequelize.define('News', {
  title: {
    type: DataTypes.STRING,
    allowNull: false,
    validate : {
      notEmpty : true
    }
  },
  publisherName : {
    type: DataTypes.STRING,
    allowNull:false,
  },
  description: {
    type: DataTypes.TEXT,
    allowNull : false
  },
  image: {
    type:DataTypes.STRING,
    allowNull:false
  },
  categoryId: {
    type: DataTypes.INTEGER,  // Ensure this is an integer
    allowNull: false,
    references: {
      model: Category,  // Reference the Category model
      key: 'id'
    }
  },
  publishedAt : {
    type :DataTypes.DATE,
    allowNull : false,
    defaultValue : DataTypes.NOW
  }

}, {
  timestamps:true,
  tableName : 'news'
});

// Associations
News.belongsTo(Category, { foreignKey: "categoryId" });
Category.hasMany(News, { foreignKey: "categoryId" });

export default News;
