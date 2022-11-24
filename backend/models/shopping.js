const DataTypes = require("sequelize");
const { Model } = DataTypes;

class Shopping extends Model {
  static init(sequelize) {
    return super.init(
      {
        name: {
          type: DataTypes.STRING(20),
          allowNull: false,
        },
      },
      {
        sequelize,
        modelName: "Shopping",
        tableName: "shoppings",
        charset: "utf8",
        collate: "utf8_general_ci",
      }
    );
  }

  static associate(db) {
    db.Shopping.belongsTo(db.User);
    db.Shopping.hasMany(db.Cart);
  }
}
module.exports = Shopping;
