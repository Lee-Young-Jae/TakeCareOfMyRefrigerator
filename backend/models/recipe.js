const DataTypes = require("sequelize");
const { Model } = DataTypes;

class FoodData extends Model {
  static init(sequelize) {
    return super.init(
      {
        id: {
          type: DataTypes.INTEGER(11),
          allowNull: false,
          primaryKey: true,
        },
        recipeName: {
          type: DataTypes.TEXT,
          allowNull: true,
        },
        registrantId: {
          type: DataTypes.TEXT,
          allowNull: true,
        },
        registrantName: {
          type: DataTypes.TEXT,
          allowNull: true,
        },
        views: {
          type: DataTypes.INTEGER(11),
          allowNull: true,
        },
        likes: {
          type: DataTypes.INTEGER(11),
          allowNull: true,
        },
        scraps: {
          type: DataTypes.INTEGER(11),
          allowNull: true,
        },
        ee3: {
          type: DataTypes.TEXT,
          allowNull: true,
        },
        ee: {
          type: DataTypes.TEXT,
          allowNull: true,
        },
        foodType: {
          type: DataTypes.TEXT,
          allowNull: true,
        },
        introduce: {
          type: DataTypes.TEXT,
          allowNull: true,
        },

        foodRecipe: {
          type: DataTypes.TEXT,
          allowNull: true,
        },
        servings: {
          type: DataTypes.TEXT,
          allowNull: true,
        },

        cookingTime: {
          type: DataTypes.TEXT,
          allowNull: true,
        },
        difficulty: {
          type: DataTypes.TEXT,
          allowNull: true,
        },
        FIRST_REG_DT: {
          type: DataTypes.DOUBLE,
          allowNull: true,
        },
      },
      {
        sequelize,
        modelName: "Recipes",
        tableName: "recipes",
        charset: "utf8mb4",
        collate: "utf8mb4_general_ci",
        timestamps: false,
      }
    );
  }

  static associate(db) {}
}

module.exports = FoodData;
