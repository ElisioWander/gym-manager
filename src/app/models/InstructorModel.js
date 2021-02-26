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
    update(data) {
        const query = `
            UPDATE instructors SET
                avatar_url=($1),
                name=($2),
                birth=($3),
                gender=($4),
                services=($5),
                monthly_fee=($6)
            WHERE id = $7
        `

        const values = [
           data.avatar_url,
           data.name,
           date(data.birth).iso,
           data.gender,
           data.services,
           data.monthly_fee,
           data.id 
        ]

        return db.query(query, values)
    },
    delete(id) {
        return db.query(`DELETE FROM instructors WHERE id = $1`, [id])
    },
    find(id) {
       return db.query(`SELECT * FROM instructors WHERE id = $1`, [id])
    },
    paginate(params) {
        const { filter, limit, offset } = params

        let query = "",
            filterQuery = "",
            totalQuery = `(
                SELECT count(*) FROM instructors
            ) AS total`

        if(filter) {
            filterQuery = `
                WHERE instructors.name ILIKE '%${filter}%'
                OR instructors.services ILIKE '%${filter}%'
            `

            totalQuery = `(
                SELECT count(*) FROM instructors
                ${filterQuery}
            ) AS total`
        }

        query = `
            SELECT instructors.*, ${totalQuery}, count(members) AS total_students
            FROM instructors
            LEFT JOIN members ON (members.instructor_id = instructors.id)
            ${filterQuery}
            GROUP BY instructors.id LIMIT $1 OFFSET $2
        `

        return db.query(query, [limit, offset])
    }
}