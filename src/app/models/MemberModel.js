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
        return db.query(`
            SELECT members.*,
            instructors.name AS instructor_name,
            instructors.monthly_fee AS monthly_fee
            FROM members
            LEFT JOIN instructors ON (members.instructor_id = instructors.id)
            WHERE members.id = $1`, [id])
    },
    update(data) {
        const query = `
            UPDATE members SET
                avatar_url=($1),
                name=($2),
                email=($3),
                birth=($4),
                gender=($5),
                blood_type=($6),
                weight=($7),
                height=($8),
                instructor_id=($9)
            WHERE id = $10
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
            data.id
        ]

        return db.query(query, values)
    },
    delete(id) {
        return db.query(`DELETE FROM members WHERE id = $1`, [id])
    },
    instructorsSelectOptions() {
        return db.query(`SELECT name, id, monthly_fee FROM instructors`)
    },
    paginate(params) {
        const { filter, limit, offset } = params

        let query = "",
            filterQuery = "",
            totalQuery = `(
                SELECT count(*) FROM members 
            ) AS total`

        if(filter) {
            filterQuery = `
                WHERE members.name ILIKE '%${filter}%'
                OR members.email ILIKE '%${filter}%'
            `
            totalQuery = `(
                SELECT count(*) FROM members
                ${filterQuery}
            )`
        }

        query = `
            SELECT members.*, ${totalQuery}
            FROM members
            ${filterQuery}
            LIMIT $1 OFFSET $2
        `

        return db.query(query, [limit, offset])
    }
}