require('dotenv').config()
var {Sequelize,Op} = require("sequelize")



var {DB_USER, DB_HOST, DB_PASSWORD, DB_DATABASE}  = process.env
var sequelize = new Sequelize(`postgres://${DB_USER}:${DB_PASSWORD}@${DB_HOST}:5432/${DB_DATABASE}`,{logging:false})


// var {POSTGRES_USER, POSTGRES_HOST, POSTGRES_PASSWORD, POSTGRES_DATABASE}  = process.env
// var sequelize = new Sequelize({
//     database: `${POSTGRES_DATABASE}`,
//     dialect: "postgres",
//     host: `${POSTGRES_HOST || "localhost"}`,
//     port: "5432",
//     username: `${POSTGRES_USER}`,
//     password: `${POSTGRES_PASSWORD}`,
//     logging: false,
//     dialectOptions: {
//       ssl: {
//         require: true,
//         rejectUnauthorized: false,
//       },
//       keepAlive: true,
//     },
//     ssl: true,
//   })


  // Inicializo los modelos
  require("./models/users")(sequelize)
  require("./models/products")(sequelize)
  require("./models/categories")(sequelize)
  require("./models/brands")(sequelize)

  sequelize.models.products.belongsToMany(sequelize.models.categories,{through: "products_categories"})
  sequelize.models.categories.belongsToMany(sequelize.models.products,{through: "products_categories"})

  sequelize.models.categories.hasMany(sequelize.models.categories,{foreignKey: "parent_category"})
  sequelize.models.categories.belongsTo(sequelize.models.categories,{foreignKey: "parent_category"})

  sequelize.models.brands.hasMany(sequelize.models.products)
  sequelize.models.products.belongsTo(sequelize.models.brands)
  

module.exports = {sequelize,Op}