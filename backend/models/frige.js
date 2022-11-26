const DataTypes = require("sequelize");
const { Model } = DataTypes;

class Frige extends Model {
  static init(sequelize) {
    return super.init(
      {
        expirationDate: {
          type: DataTypes.DATE,
          allowNull: false,
        },
        name: {
          type: DataTypes.STRING(20),
          allowNull: false,
        },
        type: {
          type: DataTypes.STRING(20),
          allowNull: false,
        },
      },
      {
        sequelize,
        modelName: "Frige",
        tableName: "friges",
        charset: "utf8mb4",
        collate: "utf8mb4_general_ci",
        timestamps: true,
      }
    );
  }

  static associate(db) {
    db.Frige.belongsTo(db.User);
  }
}

module.exports = Frige;
