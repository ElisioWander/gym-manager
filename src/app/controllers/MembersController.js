const { date } = require('../../lib/utils')
const InstructorModel = require('../models/InstructorModel')

module.exports = {
    index(req, res) {
        return res.render("members/index.html")
    },
    create(req, res) {
        return res.render("instructors/create.html", { instructor })
    },
    post(req, res) {   
    },
    edit(req, res) {
        res.render("instructos/edit.html")
    },
    async show(req, res) {
        let results = await InstructorModel.find(req.params.id)
        const instructor = results.rows[0]

        if(!instructor) {
            res.send("Instructor not found!")
        }

        return res.render("instructors/show.html", { instructor })
    },
    put(req, res) {
        return
    },
    delete(req, res) {
        return
    }
}