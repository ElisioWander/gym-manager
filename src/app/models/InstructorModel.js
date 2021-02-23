const { date } = require('../../lib/utils')
const db = require('../../config/db')

module.exports = {
    create(data, callback) {
        const query = `
            INSERT INTO instructors (
                avatar_url,
                name,
                birth,
                gender,
                services,
                monthly_fee,
                created_at
            ) VALUES ($1, $2, $3, $4, $5, $6, $7)
            RETURNING id
        `

        const values = [
            data.avatar_url,
            data.name,
            date(data.birth).birthDay,
            data.gender,
            data.services,
            data.monthly_fee,
            date(Date.now()).iso
        ]

        db.query(query, values, function(err, results) {
            if(err) throw `Database error! ${err}`

            callback(results.rows[0])
        })
    },
    find(id) {
       return db.query(`SELECT * FROM instructors WHERE id = $1`, [id])
    }
}