var router = require("express").Router()
var {sequelize,Op} = require("../../db")
var authMiddleware = require("../middlewares/auth")
var bcrypt = require("bcrypt")

var jwt = require("jsonwebtoken")

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
        ]
      }
    }

    res.send(await sequelize.models.users.findAndCountAll({
      order: [[orderBy, order]],
      offset: offset && Number(offset),
      limit: Number(limit),
      where
    }))
  } catch (error) {
    res.status(404).send({message: error.message,status:404})
  }
})

router.get("/profile",authMiddleware,async(req,res) => {
  try {
    var {id} = req.user

    res.send(await sequelize.models.users.findByPk(id,{
      attributes: ["id","name","email","role"]
    }))
  } catch (error) {
    res.status(404).send({message: error.message,status:404})
  }
})

router.get("/:id",async(req,res) => {
  try {
    var {id} = req.params
    res.send(await sequelize.models.users.findByPk(id))
  } catch (error) {
    res.status(404).send({message: error.message,status:404})
  }
})

router.put("/:id",authMiddleware,async(req,res) => {
  try {
    var userTokenID = await sequelize.models.users.findByPk(req.user.id)
    var {id} = req.params

    if(userTokenID.role === "admin" || req.user.id === id){
      var {password} = req.body

      if(userTokenID.role !== "admin") req.body.role = "user";


      if(password){
        req.body.password = await bcrypt.hash(password,9)
      }
      await sequelize.models.users.update(req.body,{where: {id}})
      res.send(await sequelize.models.users.findByPk(id,{attributes: ["id","name","email","role"]}))
    }else{
      res.status(401).send({message: "No autorizado",status:401})
    }
  } catch (error) {
    res.status(404).send({message: error.message,status:404})
  }
})


router.delete("/:id",authMiddleware,async(req,res) => {
  try {
    var {id} = req.params

    if(req.user.id === id){
      await sequelize.models.users.destroy({where: {id}})
      return res.send({message: "deleted"})
    }
    
    var userTokenID = await sequelize.models.users.findByPk(req.user.id)

    if(userTokenID.role === "admin"){
      await sequelize.models.users.destroy({where: {id}})
      return res.send({message: "deleted"})
    }

    res.status(401).send({message: "No autorizado",status:401})
  } catch (error) {
    res.status(404).send({message: error.message,status:404})
  }
})


// AUTENTICACION

router.post("/",async(req,res) => {
  try {
    var {name,email,password} = req.body

    if(await sequelize.models.users.findOne({where: {name}})){
      return res.status(400).send({message: "Nombre de user en uso",status: 400})
    }

    if(await sequelize.models.users.findOne({where: {email}})){
      return res.status(400).send({message: "Email en uso",status: 400})
    }

    password = await bcrypt.hash(password,9)
    var newUser = await sequelize.models.users.create({name,email,password})


    res.send(jwt.sign({id: newUser.id,name,email,role: newUser.role},process.env.SECRET))
  } catch (error) {
    res.status(404).send({message: error.message,status:404})
  }
})

router.post("/auth",async(req,res) => {
  try {
    var {email,password} = req.body

    var user = await sequelize.models.users.findOne({where: {email}})

    
    if(user){
      if(await bcrypt.compare(password,user.password)){
        var token = jwt.sign({id: user.id,name: user.name,email,role: user.role},process.env.SECRET)
        res.send(token)
      }else{
        res.status(401).send({message: "Email o password incorrectos",status: 401})
      }
    }else{
      res.status(401).send({message: "Email o password incorrectos",status: 401})
    }

  } catch (error) {
    res.status(404).send({message: error.message,status:404})
  }
})



module.exports = router