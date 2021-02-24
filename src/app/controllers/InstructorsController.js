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

        if(!instructor) {
            return res.send("Instructor not found!")
        }

        instructor.age = age(instructor.birth)
        instructor.services = instructor.services.split(",")
        instructor.created_at = date(instructor.created_at).format

        return res.render("instructors/show.html", { instructor })
    },
    async edit(req, res) {
        let results = await InstructorModel.find(req.params.id)
        const instructor = results.rows[0]

        instructor.birth = date(instructor.birth).iso

        return res.render(`instructors/edit.html`, { instructor })
    },
    async put(req, res) {
        const keys = Object.keys(req.body)

        for(let key of keys) {
            if(req.body[key] == "") {
                return res.send("Please, fill all fiels!")
            }
        }

        let results = await InstructorModel.update(req.body)
        const instructor = results.rows[0]

        return res.redirect(`/instructors/${req.body.id}`)
    },
    async delete(req, res) {
        let results = await InstructorModel.delete(req.body.id)

        return res.redirect("/instructors")
    }

}
