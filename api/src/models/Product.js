const { DataTypes } = require("sequelize");

module.exports = (sequelize) => {
  sequelize.define(
    "Product",
    {
      id: {
        type: DataTypes.UUID,
        allowNull: false,
        primaryKey: true,
      },
      title: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true,
      },
      category: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      color: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      season: {
        type: DataTypes.ENUM("autumn", "spring", "summer", "winter"),
        allowNull: false,
      },
      price: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
      isOnSale: {
        //en descuento por estar fuera de temporada o por ser liquidacion
        type: DataTypes.BOOLEAN,
        allowNull: true, //por si no pone que esta en descuento
        defaultValue: false,
      },
      size: {
        type: DataTypes.ENUM("xs", "s", "m", "l", "xl"),
        allowNull: false,
      },
      gender: {
        type: DataTypes.ENUM("female", "male", "other"),
        allowNull: false,
      },
      stock: {
        type: DataTypes.INTEGER,
        allowNull: true,
        defaultValue: 1, //si no lo especifica, que sea 1
      },
      image: {
        type: DataTypes.STRING,
        allowNull: false,
      },
    },
    {
      timestamps: true, //interesa saber cuando se creo
    }
  );
};
