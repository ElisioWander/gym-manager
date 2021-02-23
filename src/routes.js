const express = require('express')
const InstructorsController = require('./app/controllers/InstructorsController')
const MembersController = require('./app/controllers/MembersController')

const routes = express.Router()

/*GET ROUTES*/
routes.get("/", (req, res) => {
    return res.redirect("/instructors")
})


routes.get("/instructors", InstructorsController.index)
routes.get("/instructors/create", InstructorsController.create)
routes.get("/instructors/:id", InstructorsController.show)
routes.get("/instructors/:id/edit", InstructorsController.edit)
routes.post("/instructors", InstructorsController.post)
routes.put("/instructors", InstructorsController.put)
routes.delete("/instructors", InstructorsController.delete)


routes.get("/members", MembersController.index)
routes.get("/members/create", MembersController.create)
routes.get("/members/:id", MembersController.show)
routes.get("/members/:id/edit", MembersController.edit)
routes.post("/members", MembersController.post)
routes.put("/members", MembersController.put)
routes.delete("/members", MembersController.delete)



module.exports = routes