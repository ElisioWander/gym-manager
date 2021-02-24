const { date } = require('../../lib/utils')
const db = require('../../config/db')

module.exports = {
    create(data) {
        const query = `
            INSERT INTO members (
                avatar_url,
                name,
                email,
                birth,
                gender,
                blood_type,
                weight,
                height,
                instructor_id,
                created_at
            ) VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10)
            RETURNING id
        `

        const values = [
            data.avatar_url,
            data.name,
            data.email,
            date(data.birth).iso,
            data.gender,
            data.blood_type,
            data.weight,
            data.height,
            data.instructor,
            date(Date.now()).iso
        ]

        return db.query(query, values)
    },
    find(id) {
        return db.query(`SELECT * FROM members WHERE id = $1`, [id])
    },
    instructorsSelectOptions() {
        return db.query(`SELECT name, id, monthly_fee FROM instructors`)
    }
}