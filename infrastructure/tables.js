class Tables {
    init(connection) {
        this.connection = connection

        this.createVideos()
    }

    createVideos() {
        const sql = `CREATE TABLE IF NOT EXISTS Videos (id INT PRIMARY KEY NOT NULL AUTO_INCREMENT, titulo VARCHAR(70) NOT NULL, descricao VARCHAR(3000) NOT NULL, url VARCHAR(255))`

        this.connection.query(sql, erro => {
            if(erro) {
                console.log(erro)
            } else {
                console.log("'Videos' table successfully created")
            }
        })
    }
}

module.exports = new Tables
