var { DataTypes} = require("sequelize")



module.exports = (s) => {
  s.define("products",{
    id: {
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
      primaryKey: true
    },
    name: {
      type: DataTypes.STRING,
      allowNull: false
    },
    image1: {
      type: DataTypes.STRING,
      allowNull: false,
      defaultValue: ""
    },
    image2: {
      type: DataTypes.STRING,
      allowNull: true
    },
    image3: {
      type: DataTypes.STRING,
      allowNull: true
    },
    price: {
      type: DataTypes.FLOAT,
      allowNull: false,
      defaultValue: 0
    },
    description: {
      type: DataTypes.TEXT,
      allowNull: false,
      defaultValue: ""
    },
  })
}