const queryDb = (db, query) => {
    console.log(query)
    return new Promise((resolve, reject) => {
        db.query(query, (err, result) => {
            if (err) {
                console.log(err)
                return reject(err)
            }

            return resolve(result)
        })
    })
}

module.exports = queryDb