var { DataTypes} = require("sequelize")



module.exports = (s) => {
  s.define("categories",{
    id: {
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
      primaryKey: true
    },
    name: {
      type: DataTypes.STRING,
      allowNull: false
    },
    iconName: {
      type: DataTypes.STRING,
      allowNull: true
    }
  })
}