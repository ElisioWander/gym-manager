const { age, date } = require('../../lib/utils')
const Intl = require('intl')
const InstructorModel = require('../models/InstructorModel')

module.exports = {
    index(req, res) {
        return res.render("instructors/index.html")
    },
    create(req, res) {
        return res.render("instructors/create.html")
    },
    async post(req, res) {
        const keys = Object.keys(req.body)

        for(let key of keys) {
            if(req.body[key] == "") {
                return res.send("Please, fill all fields!")
            }
        }

        let results = await InstructorModel.create(req.body)
        const instructor = results.rows[0]

        return res.redirect(`/instructors/${instructor.id}`)
    },
    async show(req, res) {
        let results = await InstructorModel.find(req.params.id)
        const instructor = results.rows[0]

        instructor.age = age(instructor.birth)
        instructor.services = instructor.services.split(",")
        instructor.created_at = date(instructor.created_at).format

        return res.render("instructors/show.html", { instructor })
    },
    edit(req, res) {
        return res.render("instructors/edit.html")
    },
    put(req, res) {
        return
    },
    delete(req, res) {
        return
    }

}
