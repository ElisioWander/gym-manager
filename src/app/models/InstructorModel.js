const { date } = require('../../lib/utils')
const db = require('../../config/db')

module.exports = {
    create(data) {
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
            date(data.birth).iso,
            data.gender,
            data.services,
            data.monthly_fee,
            date(Date.now()).iso
        ]

        return db.query(query, values)
    },
    find(id) {
       return db.query(`SELECT * FROM instructors WHERE id = $1`, [id])
    }
}