module.exports = {
    age: function(timestamp) {
            const today = new Date()
            const birthDate = new Date(timestamp)
        
            let age = today.getFullYear() - birthDate.getFullYear()
        
            const month = today.getMonth() - birthDate.getMonth()
        
            if (month < 0 || month == 0 && today.getDate() - birthDate.getDate()) {
                age = age - 1
            }
        
            return age
    },
    date: function(timestamp) {
        const date = new Date(timestamp)

        const year = date.getUTCFullYear()
        const month = `0${date.getUTCMonth() + 1}`.slice(-2)
        const day = `0${date.getUTCDate()}`.slice(-2)

        return {
            day,
            month,
            year,
            iso: `${year}-${month}-${day}`,
            birthDay: `${day}/${month}`,
            format: `${day}/${month}/${year}`
        }
        
    },
    bloodType: function(blood_type) {
        let bloodType

        switch (blood_type) {
            case 'NOTKNOW':
                bloodType = "Não especificado"

                return bloodType
                break;
            case 'A1':
                bloodType = "A+"
                
                return bloodType
                break;
            case 'A0':
                bloodType = "A-"

                return bloodType
                break
            case 'B1':
                bloodType = "B+"

                return bloodType
                break
            case 'B0':
                bloodType = "B-"

                return bloodType
                break
            case 'AB1':
                bloodType = "AB+"

                return bloodType
                break
            case 'AB0':
                bloodType = "AB-"

                return bloodType
                break
            case 'O1':
                bloodType = "O+"

                return bloodType
                break
            case 'O0':
                bloodType = "O-"

                return bloodType
                break
            default:
                console.log("No option selected")
                break;
        }
    },
    formatPrice(monthly_fee) {
        return Intl.NumberFormat('pt-BR', {
            style: 'currency',
            currency: 'BRL'
        }).format(monthly_fee/100)
    }
}