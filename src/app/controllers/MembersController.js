const { date, bloodType } = require('../../lib/utils')
const MemberModel = require('../models/MemberModel')

module.exports = {
    async index(req, res) {
        let results = await MemberModel.all()
        const members = results.rows

        return res.render("members/index.html", { members })
    },
    async create(req, res) {
        let results = await MemberModel.instructorsSelectOptions()
        const options = results.rows

        return res.render("members/create.html", { instructorsOptions: options })
    },
    async post(req, res) {   
        const keys = Object.keys(req.body)

        for(let key of keys) {
            if(req.body[key] == "") {
                return res.send("Please, fill all fields!")
            }
        }
        
        let results = await MemberModel.create(req.body)
        const member = results.rows[0]

        return res.redirect(`/members/${member.id}`)

    },
    async edit(req, res) {
        let results = await MemberModel.find(req.params.id)
        const member = results.rows[0]

        results = await MemberModel.instructorsSelectOptions()
        instructorsOptions = results.rows

        member.birth = date(member.birth).iso

        return res.render("members/edit.html", { member, instructorsOptions })
    },
    async show(req, res) {
        let results = await MemberModel.find(req.params.id)
        const member = results.rows[0]

        if(!member) {
            res.send("Member not found!")
        }

        member.age = date(member.birth).birthDay
        member.blood_type = bloodType(member.blood_type)
        member.created_at = date(member.created_at).format


        return res.render("members/show.html", { member })
    },
    async put(req, res) {
        const keys = Object.keys(req.body)

        for(let key of keys) {
            if(req.body[key] == "") {
                return res.send("Please, fill all fields!")
            }
        }

        let results = await MemberModel.update(req.body)

        return res.redirect(`/members/${req.body.id}`)
    },
    async delete(req, res) {
        let results = await MemberModel.delete(req.body.id)

        return res.redirect("/members")
    }
}