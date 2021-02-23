const { age, date } = require('../../lib/utils')
const Intl = require('intl')

module.exports = {
    index(req, res) {
        return res.render("instructors/index.html")
    },
    create(req, res) {
        return res.render("instructors/create.html")
    },
    post(req, res) {
        return
    },
    show(req, res) {
        return res.render("instructors/show.html")
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
