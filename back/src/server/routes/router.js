var router = require("express").Router()


router.use("/categories",require("./categories"))
router.use("/products",require("./products"))
router.use("/users",require("./users"))
router.use("/brands",require("./brands"))


module.exports = router