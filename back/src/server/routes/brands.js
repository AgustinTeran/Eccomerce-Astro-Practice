var router = require("express").Router()
var {sequelize, Op} = require("../../db")

var authMiddleware = require("../middlewares/auth")


router.get("/",async(req,res) => {
  try {
    var {offset,limit=15,orderBy="updatedAt",order="DESC",search,attributes} = req.query

    if(typeof attributes === "string"){
      attributes = [attributes]
    }

    if(search){
      var where = {
        [Op.or]: [
          { name: { [Op.iLike]: `%${search}%` } },
        ],
      }
    }
    

    res.send(await sequelize.models.brands.findAndCountAll({
      order: [[orderBy, order]],
      offset: offset && Number(offset),
      limit: Number(limit),
      where,
      attributes
    }))
  } catch (error) {
    res.status(404).send({message: error.message,status:404})
  }
})

router.get("/:id",async(req,res) => {
  try {
    var {id} = req.params
    res.send(await sequelize.models.brands.findByPk(id))
  } catch (error) {
    res.status(404).send({message: error.message,status:404})
  }
})

router.put("/:id",authMiddleware,async(req,res) => {
  try {
    var userTokenID = await sequelize.models.users.findByPk(req.user.id)

    if(userTokenID.role === "admin"){
      var {id} = req.params

      await sequelize.models.brands.update(req.body,{where: {id}})
      res.send(await sequelize.models.brands.findByPk(id))
    }else{
      res.status(401).send({message: "No autorizado",status:401})
    }
  } catch (error) {
    res.status(404).send({message: error.message,status:404})
  }
})

router.post("/",/* authMiddleware, */async(req,res) => {
  try {
    // var userTokenID = await sequelize.models.users.findByPk(req.user.id)

    // if(userTokenID.role === "admin"){
      res.send(await sequelize.models.brands.create(req.body))
    // }else{
    //   res.status(401).send({message: "No autorizado",status:401})
    // }
  } catch (error) {
    res.status(404).send({message: error.message,status:404})
  }
})

router.delete("/:id",authMiddleware,async(req,res) => {
  try {
    var userTokenID = await sequelize.models.users.findByPk(req.user.id)

    if(userTokenID.role === "admin"){
      var {id} = req.params
      await sequelize.models.brands.destroy({where: {id}})
      res.send({message: "deleted"})
    }else{
      res.status(401).send({message: "No autorizado",status:401})
    }
  } catch (error) {
    res.status(404).send({message: error.message,status:404})
  }
})

module.exports = router