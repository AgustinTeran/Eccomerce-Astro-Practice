var { DataTypes} = require("sequelize")



module.exports = (s) => {
  s.define("brands",{
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