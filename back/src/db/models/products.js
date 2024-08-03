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
    }
  })
}