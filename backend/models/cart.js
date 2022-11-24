const DataTypes = require("sequelize");
const { Model } = DataTypes;

class Cart extends Model {
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
        modelName: "Cart",
        tableName: "carts",
        charset: "utf8",
        collate: "utf8_general_ci",
      }
    );
  }

  static associate(db) {
    db.Cart.belongsTo(db.Shopping);
  }
}
module.exports = Cart;
